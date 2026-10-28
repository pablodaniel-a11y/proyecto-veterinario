<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; 
use Inertia\Response; 
use App\Models\User; 
use App\Models\Cliente;
use Illuminate\Http\RedirectResponse; 
use Illuminate\Support\Facades\Hash; 
use Illuminate\Validation\Rules\Password; 
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('users/index', [
            'users' => User::with('roles:id,name')->get(['id', 'name', 'email'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('users/create', [ 
            'roles' => Role::get(['id', 'name']) 
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Password::defaults()],
            'roles' => 'array'
        ]);

        $validated['password'] = Hash::make($validated['password']);
        

        $user = User::create($validated); 

        if ($request->has('roles')) { 
            $user->syncRoles($request->roles); 
        } 

        $cliente = Cliente::where('email', $user->email)->first();

        if($cliente){
            $cliente->update([
                'user_id' => $user->id,
                'nombre'  => $user->name,
            ]);
        }else{
            Cliente::create([
                'user_id'  => $user->id,
                'nombre'   => $user->name,
                'email'    => $user->email,
                'telefono' => 'Pendiente', 
            ]);
        }

        return redirect()
            ->route('users.index')
            ->with('success', 'Usuario y Cliente creado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): Response
    {
        return Inertia::render('users/show', [ 
            'user' => $user->load('roles:id,name'),  
            'permissions' => $user->getAllPermissions()->map(fn($perm) => [ 
                'id' => $perm->id, 
                'name' => $perm->name, 
            ]) 
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): Response
    {
        return Inertia::render('users/edit', [ 
            'user' => $user->only(['id', 'name', 'email']), 
            'roles' => Role::get(['id', 'name']), 
            'userRoles' => $user->roles->pluck('name') // Array de strings para los checkboxes de React 
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        Gate::authorize('update', $user);

        $validated = $request->validate([ 
            'name' => 'required|string|max:255', 
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id, 
            'password' => ['nullable', Password::defaults()], 
            'roles' => 'array' 
        ]);

        if ($request->user()->id === $user->id && $user->hasRole('super-admin')) {
            if (!in_array('super-admin', $request->input('roles', []))) { 
                return redirect()->back()->withErrors([ 
                    'roles' => 'No puedes quitarte a ti mismo el rol de Super Admin.' 
                ])->withInput(); 
            } 
        }

        if (!empty($validated['password'])) { 
            $validated['password'] = Hash::make($validated['password']); 
        } else { 
            unset($validated['password']); 
        } 

        $user->update($validated); 
        $user->syncRoles($request->input('roles', []));

        if($user->cliente){
            $user->cliente->update([
                'nombre' => $user->name,
                'email'  => $user->email,
            ]);
        }

        return redirect()
            ->route('users.index')
            ->with('success', 'Usuario actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        Gate::authorize('delete', $user);
        
        $user->delete(); 
        
        return redirect()
            ->route('users.index')
            ->with('success', 'Usuario eliminado correctamente.');
    }
}
