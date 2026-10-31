<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Veterinario;
use App\Models\User;
use App\Models\Cliente;
use App\Http\Requests\StoreVeterinarioRequest;
use App\Http\Requests\UpdateVeterinarioRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Illuminate\Http\Request;

class VeterinarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $buscarname = trim($request->input('buscarname', ''));
        $especialidadbus = trim($request->input('especialidadbus', ''));


        $veterinarios= Veterinario::with('user')
            ->when($buscarname !== '', function ($query) use ($buscarname){
                $query->whereHas('user', function ($q) use ($buscarname){
                    $q->where('name', 'like', "%{$buscarname}%");
                });
            })
            ->when($especialidadbus !== '', function ($query) use ($especialidadbus) {
                $query->where('especialidad', $especialidadbus); 
            })
            ->paginate(10)
            ->withQueryString();

        $especialidades= Veterinario::select('especialidad')
            ->distinct()
            ->pluck('especialidad');

        return Inertia::render('Veterinarios/Index', [
            'veterinarios' => $veterinarios,
            'especialidades' => $especialidades,
            'filtros' => [
                'buscarname' => $buscarname, 
                'especialidadbus' => $especialidadbus,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    #[Middleware('permission:crear veterinario')]
    public function create()
    {
        return Inertia::render('Veterinarios/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    #[Middleware('permission:crear veterinario')]
    public function store(StoreVeterinarioRequest $request)
    {
        $validated= $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make(Str::random(10)),
        ]);

        $user->assignRole('veterinario');

        Veterinario::create([
            'user_id' => $user->id,
            'telefono' => $validated['telefono'],
            'matricula' => $validated['matricula'],
            'especialidad' => $validated['especialidad'],
        ]);

        $cliente = Cliente::where('user_id', $user->id)
            ->orWhere('email', $user->email)
            ->first();

        if($cliente){
            $cliente->update([
                'user_id' => $user->id,
                'nombre' => $user->name,
                'email' => $user->email,
                'telefono' => $validated['telefono'],
            ]);
        }else{
            Cliente::create([
                'user_id'  => $user->id,
                'nombre'   => $user->name,
                'email'    => $user->email,
                'telefono' => $validated['telefono'], 
            ]);
        }

        return redirect()
            ->route('veterinarios.index')
            ->with('success', 'Perfil creado correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Veterinario $veterinario)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    #[Middleware('permission:editar veterinario')]
    public function edit(Veterinario $veterinario)
    {
        $veterinario->load('user');
        return Inertia::render('Veterinarios/Edit', [
            'veterinario' => $veterinario,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    #[Middleware('permission:editar veterinario')]
    public function update(UpdateVeterinarioRequest $request, Veterinario $veterinario)
    {
        $validated = $request->validated();

        $veterinario->user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        $datos = [
            'telefono' => $validated['telefono'],
            'especialidad' => $validated['especialidad'],
        ];

        if (auth()->user()->hasAnyRole(['admin', 'super-admin'])) {
            $datos['matricula'] = $validated['matricula'];
        }

        $veterinario->update($datos);

        $cliente = Cliente::where('user_id', $veterinario->user->id)
            ->orWhere('email', $veterinario->user->email)
            ->first();

        if($cliente){
            $cliente->update([
                'user_id' => $veterinario->user->id,
                'nombre'  => $veterinario->user->name,
                'email'   => $veterinario->user->email,
                'telefono' => $validated['telefono'],
            ]);
        }else{
            Cliente::create([
                'user_id'  => $veterinario->user->id,
                'nombre'   => $veterinario->user->name,
                'email'    => $veterinario->user->email,
                'telefono' => $validated['telefono'],
            ]);
        }

        return redirect()
            ->route('veterinarios.index')
            ->with('success', 'Perfil actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    #[Middleware('permission:eliminar veterinario')]
    public function destroy(Veterinario $veterinario)
    {
        $veterinario->delete();

        return redirect()
            ->route('veterinarios.index')
            ->with('success', 'Perfil borrado correctamente.');
    }
}
