<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Consulta;
use App\Models\Mascota;
use App\Models\Cliente;
use App\Models\Veterinario;
use App\Models\Producto;
use App\Models\Detalle_Consulta;
use App\Http\Requests\StoreConsultaRequest;
use App\Http\Requests\UpdateConsultaRequest;

class ConsultaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    public function indexpormascota(Mascota $mascota)
    {
        $mascota->load(['raza.especie']);
        $consultas = $mascota->consultas()
            ->with(['veterinario', 'detalles_consultas.producto'])
            ->get();

        return Inertia::render('Consultas/Indexcliente', [
            'mascota' => $mascota,
            'consultas' => $consultas,
        ]);
    }

    public function indexdelveterinario()
    {
        $veterinario = Veterinario::where('user_id', auth()->id())->first();

        $consultas = Consulta::where('veterinario_id', $veterinario->id)
            ->with(['mascota.cliente', 'mascota.raza.especie', 'detalles_consultas.producto'])
            ->orderBy('fecha_hora', 'desc')
            ->get();

        return Inertia::render('Consultas/Indexveterinario', [
            'consultas' => $consultas,
        ]);   
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $cliente = Cliente::where('user_id', auth()->id())->first();

        $mascotas = Mascota::where('cliente_id', $cliente->id)->with(['raza.especie'])->get();
        $veterinarios = Veterinario::with('user')->get();
        $estados= ['pendiente','completado','cancelado'];

        return Inertia::render('Consultas/Create', [
            'estados' => $estados,
            'mascotas' => $mascotas,
            'veterinarios' => $veterinarios,
        ]);
    }

    public function createindividual(Mascota $mascota)
    {
        $mascota->load(['raza.especie']);
        $veterinarios = Veterinario::with('user')->get();
        $estados= ['pendiente','completado','cancelado'];

        return Inertia::render('Consultas/Create', [
            'estados' => $estados,
            'mascota' => $mascota,
            'veterinarios' => $veterinarios,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreConsultaRequest $request)
    {
        $validated= $request->validated();
        
        Consulta::create([
            ...$validated,
            'fecha_hora' => now(),
            'estado' => 'pendiente',
            'diagnostico' => '',
            'observaciones' => '',
        ]);

        return redirect()
            ->route('mascota.consultas', $validated['mascota_id'])
            ->with('success', 'Se creo correctamente la Consulta');

    }

    /**
     * Display the specified resource.
     */
    public function show(Consulta $consulta)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Consulta $consulta)
    {
        $consulta->load(['mascota.cliente', 'mascota.raza.especie']);
        $estados= ['pendiente','completado','cancelado'];
        $productos = Producto::all();

        return Inertia::render('Consultas/Edit', [
            'estados' => $estados,
            'consulta' => $consulta,
            'productos' => $productos,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConsultaRequest $request, Consulta $consulta)
    {
        $validated = $request->validated();

        $consulta->update([
            'diagnostico'   => $validated['diagnostico'],
            'peso'          => $validated['peso'] ?? $consulta->peso,
            'estado'        => $validated['estado'],
            'observaciones' => $validated['observaciones'],
        ]);

        $consulta->detalles_consultas()->delete();

        if ($request->has('detalles')) {
            foreach ($request->detalles as $detalle) {
                Detalle_Consulta::create([
                    'consulta_id'  => $consulta->id,
                    'producto_id'  => $detalle['producto_id'],
                    'dosis'        => $detalle['dosis'],
                    'cantidad'     => $detalle['cantidad'],
                    'indicaciones' => $detalle['indicaciones'] ?? null,
                ]);
            }
        }

        return redirect()
            ->route('veterinario.consultas.index')
            ->with('success', 'La consulta se ha actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Consulta $consulta)
    {
        $consulta->delete();

        return redirect()
            ->route('mascota.consultas')
            ->with('success', 'Consulta borrado correctamente');
    }
}
