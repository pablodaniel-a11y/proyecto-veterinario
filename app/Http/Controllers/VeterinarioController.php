<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Veterinario;
use App\Models\User;
use App\Http\Requests\StoreVeterinarioRequest;
use App\Http\Requests\UpdateVeterinarioRequest;

class VeterinarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $veterinarios= Veterinario::with('user')->get();

        return Inertia::render('Veterinarios/Index', [
            'veterinarios' => $veterinarios,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Veterinarios/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVeterinarioRequest $request)
    {
        $validated= $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make(Str::random(10)),
        ]);

        Veterinario::create([
            'user_id' => $user->id,
            'telefono' => $validated['telefono'],
            'matricula' => $validated['matricula'],
            'especialidad' => $validated['especialidad'],
        ]);

        return redirect()
            ->route('veterinarios.index')
            ->with('success', 'Perfil creado Correctamente');
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
    public function update(UpdateVeterinarioRequest $request, Veterinario $veterinario)
    {
        $validated = $request->validated();

        $veterinario->user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        $veterinario->update([
            'telefono' => $validated['telefono'],
            'matricula' => $validated['matricula'],
            'especialidad' => $validated['especialidad'],
        ]);

        return redirect()
            ->route('veterinarios.index')
            ->with('success', 'Perfil actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Veterinario $veterinario)
    {
        $veterinario->delete();

        return redirect()
            ->route('veterinarios.index')
            ->with('success', 'Perfil borrado correctamente.');
    }
}
