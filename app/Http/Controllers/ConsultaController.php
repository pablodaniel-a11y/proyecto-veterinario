<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Consulta;
use App\Models\Mascota;
use App\Models\Cliente;
use App\Models\Especie;
use App\Models\Veterinario;
use App\Models\Producto;
use App\Models\Detalle_Consulta;
use App\Http\Requests\StoreConsultaRequest;
use App\Http\Requests\UpdateConsultaRequest;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Exports\ConsultasExport; 
use Maatwebsite\Excel\Facades\Excel;

class ConsultaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    #[Middleware('permission:ver consultas mascota')]
    public function indexpormascota(Mascota $mascota, Request $request)
    {
        $fechabus = trim($request->input('fechabus') ?? '');
        $estadobus = trim($request->input('estadobus') ?? '');
        $vetbus = trim($request->input('vetbus') ?? '');


        $mascota->load(['raza.especie']);
        $consultas = $mascota->consultas()
            ->with(['veterinario.user', 'detalles_consultas.producto'])
            ->when($fechabus !== '', function ($query) use ($fechabus){
                $query->whereDate('fecha_hora', $fechabus);
            })
            ->when($estadobus !== '', function ($query) use ($estadobus){
                $query->where('estado', $estadobus);
            })
            ->when($vetbus !== '', function ($query) use ($vetbus) {
                $query->where('veterinario_id', $vetbus);
            })
            ->paginate(5)
            ->withQueryString();

        $veterinarioconsultados= $mascota->consultas()
            ->with('veterinario.user')
            ->get()
            ->pluck('veterinario')
            ->filter()
            ->unique('id')
            ->values();

        $fechasdisponibles= $mascota->consultas()
            ->select('fecha_hora')
            ->distinct()
            ->get()
            ->map(function ($consulta) {
                return Carbon::parse($consulta->fecha_hora)->format('Y-m-d');
            })
            ->unique()
            ->values();

        $estados= ['pendiente','completado','cancelado'];

        return Inertia::render('Consultas/Indexcliente', [
            'mascota' => $mascota,
            'consultas' => $consultas,
            'estados' => $estados,
            'fechasdisponibles' => $fechasdisponibles,
            'veterinarioconsultados' => $veterinarioconsultados,
            'filtros' => [
                'fechabus' => $fechabus,
                'estadobus' => $estadobus,
                'vetbus' => $vetbus,
            ],
        ]);
    }

    #[Middleware('permission:ver consultas asignadas')]
    public function indexdelveterinario(Request $request)
    {
        $buscarname = trim($request->input('buscarname') ?? '');
        $especiebus = $request->input('especiebus', '');
        $fechabus = trim($request->input('fechabus') ?? '');
        $estadobus = trim($request->input('estadobus') ?? '');
        $porPagina = (int) $request->input('por_pagina', 10);

        if (!in_array($porPagina, [10, 20, 50, 100], true)) { 
            $porPagina = 10; 
        }

        $veterinario = Veterinario::where('user_id', auth()->id())->first();

        if (auth()->user()->hasAnyRole(['admin', 'super-admin'])) {
            $consultas = Consulta::with(['mascota.cliente', 'mascota.raza.especie', 'detalles_consultas.producto'])
                ->orderBy('fecha_hora', 'asc')
                ->when($buscarname !== '', function ($query) use ($buscarname){
                    $query->whereHas('mascota.cliente', function ($q) use ($buscarname){
                        $q->where('nombre', 'like', "%{$buscarname}%");
                    });
                })
                ->when($request->filled('especiebus'), function ($query) use ($especiebus){
                    $query->whereHas('mascota.raza.especie', function ($q) use ($especiebus){
                        $q->where('id', $especiebus);
                    });
                })
                ->when($fechabus !== '', function ($query) use ($fechabus){
                    $query->whereDate('fecha_hora', $fechabus);
                })
                ->when($estadobus !== '', function ($query) use ($estadobus){
                    $query->where('estado', $estadobus);
                })
                ->paginate($porPagina)
                ->withQueryString();

            $fechasdisponibles= Consulta::select('fecha_hora')
                ->distinct()
                ->get()
                ->map(function ($consulta) {
                    return Carbon::parse($consulta->fecha_hora)->format('Y-m-d');
                })
                ->unique()
                ->values();

            
        }else{
            $consultas = Consulta::where('veterinario_id', $veterinario->id)
                ->with(['mascota.cliente', 'mascota.raza.especie', 'detalles_consultas.producto'])
                ->orderBy('fecha_hora', 'asc')
                ->when($buscarname !== '', function ($query) use ($buscarname){
                    $query->whereHas('mascota.cliente', function ($q) use ($buscarname){
                        $q->where('nombre', 'like', "%{$buscarname}%");
                    });
                })
                ->when($request->filled('especiebus'), function ($query) use ($especiebus){
                    $query->whereHas('mascota.raza.especie', function ($q) use ($especiebus){
                        $q->where('id', $especiebus);
                    });
                })
                ->when($fechabus !== '', function ($query) use ($fechabus){
                    $query->whereDate('fecha_hora', $fechabus);
                })
                ->when($estadobus !== '', function ($query) use ($estadobus){
                    $query->where('estado', $estadobus);
                })
                ->paginate($porPagina)
                ->withQueryString();

            $fechasdisponibles= Consulta::where('veterinario_id', $veterinario->id)
                ->select('fecha_hora')
                ->distinct()
                ->get()
                ->map(function ($consulta) {
                    return Carbon::parse($consulta->fecha_hora)->format('Y-m-d');
                })
                ->unique()
                ->values();
        }

        $estados= ['pendiente','completado','cancelado'];

        return Inertia::render('Consultas/Indexveterinario', [
            'consultas' => $consultas,
            'especies' => Especie::all(),
            'estados' => $estados,
            'fechasdisponibles' => $fechasdisponibles,
            'filtros' => [
                'buscarname' => $buscarname,
                'fechabus' => $fechabus,
                'estadobus' => $estadobus,
                'especiebus' => $especiebus,
                'por_pagina' => $porPagina,
            ],
        ]);   
    }

    /**
     * Show the form for creating a new resource.
     */
    #[Middleware('permission:crear consulta')]
    public function create()
    {
        $cliente = Cliente::where('user_id', auth()->id())->first();

        if (auth()->check()) {
            if (!$cliente || Mascota::where('cliente_id', $cliente->id)->count() === 0) {
                return redirect()
                    ->route('mascotas.index')
                    ->with('error', 'No puedes realizar una consulta sin antes tener una mascota registrada.');
            }
        }

        $mascotas = Mascota::where('cliente_id', $cliente->id)->with(['raza.especie'])->get();
        $veterinarios = Veterinario::with('user')->get();
        $estados= ['pendiente','completado','cancelado'];

        return Inertia::render('Consultas/Create', [
            'estados' => $estados,
            'mascotas' => $mascotas,
            'veterinarios' => $veterinarios,
        ]);
    }

    #[Middleware('permission:crear consulta')]
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
    #[Middleware('permission:crear consulta')]
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
            ->with('success', 'Consulta Realizada Correctamente');

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
    #[Middleware('permission:editar consulta')]
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
    #[Middleware('permission:editar consulta')]
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
            ->with('success', 'Consulta Atendida Correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    #[Middleware('permission:eliminar consulta')]
    public function destroy(Consulta $consulta)
    {
        $mascotaId = $consulta->mascota_id;

        $consulta->delete();

        return redirect()
            ->route('mascota.consultas', $mascotaId)
            ->with('success', 'Consulta borrado correctamente');
    }

    #[Middleware('permission:ver consultas asignadas')]
    public function export(Request $request)
    {
        $veterinario = Veterinario::where('user_id', auth()->id())->first();

        return Excel::download(
            new ConsultasExport($request, $veterinario->id), 
            'mis_consultas.xlsx'
        );
    }
}
