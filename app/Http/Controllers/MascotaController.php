<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Mascota;
use App\Models\Raza;
use App\Models\Especie;
use App\Http\Requests\StoreMascotaRequest;
use App\Http\Requests\UpdateMascotaRequest;

class MascotaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {      
        
        $cliente = Cliente::where('user_id', auth()->id())->first();

        if (!$cliente) {
            $cliente = Cliente::create([
                'user_id' => auth()->id(),
                'nombre'  => auth()->user()->name,
                'email'   => auth()->user()->email,
                'telefono' => 'Sin registrar',
            ]);
        }

        $mascotas = Mascota::where('cliente_id', $cliente->id)->with(['raza.especie'])->get();

        return Inertia::render('Mascotas/Index', [
            'mascotas' => $mascotas
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Mascotas/Create', [
            'razas' => Raza::all(),
            'especies' => Especie::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMascotaRequest $request)
    {   
        $cliente = Cliente::firstOrCreate(
            ['user_id' => auth()->id()],
            [
                'nombre' => auth()->user()->name,
                'email' => auth()->user()->email,
                'telefono' => 'Pendiente'
            ]
        );

        $mascota= $request->validated();

        $mascota['cliente_id'] = $cliente->id;

        if ($request->hasFile('foto')) {
            $mascota['foto'] = $request->file('foto')->store('mascotas', 'public');
        }

        Mascota::create($mascota);

        return redirect()
            ->route('Mascotas.index');
            //->with('success', 'Mascota creado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Mascota $mascota)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mascota $mascota)
    {
        $mascota->load('raza.especie');

        return Inertia::render('Mascotas/Edit', [
            'mascota' => $mascota,
            'especies' => Especie::all(),
            'razas' => Raza::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMascotaRequest $request, Mascota $mascota)
    {

        $validated = $request->validated();

        if ($request->hasFile('foto')) {
            if ($mascota->foto && Storage::disk('public')->exists($mascota->foto)) {
                Storage::disk('public')->delete($mascota->foto);
            }
            $validated['foto'] = $request->file('foto')->store('mascotas', 'public');
        } else {
            unset($validated['foto']);
        }

        $mascota->update($validated);

        return redirect()
            ->route('mascotas.index');
            //->with('success', 'Profesor actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mascota $mascota)
    {
        if ($mascota->foto && Storage::disk('public')->exists($mascota->foto)) {
            Storage::disk('public')->delete($mascota->foto);
        }

        $mascota->delete();

        return redirect()
            ->route('mascotas.index');
            //->with('success', 'Profesor eliminado correctamente.');
    }
}
