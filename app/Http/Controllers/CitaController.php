<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Cita;
use App\Models\Mascota;
use App\Models\Cliente;
use App\Models\Veterinario;
use App\Models\Raza;
use App\Models\Especie;
use App\Http\Requests\StoreCitaRequest;
use App\Http\Requests\UpdateCitaRequest;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Mail\SendMail;
use Illuminate\Support\Facades\Mail;

class CitaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    #[Middleware('permission:ver citas')]
    public function index(Request $request)
    {
        $mascotabus = trim($request->input('mascotabus') ?? '');
        $fechabus = trim($request->input('fechabus') ?? '');
        $estadobus = trim($request->input('estadobus') ?? '');
        $vetbus = trim($request->input('vetbus') ?? '');

        $cliente = Cliente::where('user_id', auth()->id())->first();

        if (!$cliente) {
            return Inertia::render('Citas/Index', [
                'citas' => [
                    'data' => [],
                    'current_page' => 1,
                    'last_page' => 1,
                    'total' => 0,
                ],
                'estados' => ['pendiente', 'completado', 'cancelado'],
                'fechasdisponibles' => [],
                'veterinariolist' => [],
                'mascotalist' => [],
                'filtros' => [
                    'mascotabus' => $mascotabus,
                    'fechabus' => $fechabus,
                    'estadobus' => $estadobus,
                    'vetbus' => $vetbus,
                ], 
            ]);
        }

        $citas = Cita::where('cliente_id', $cliente->id)
            ->with(['cliente', 'mascota.raza.especie', 'veterinario.user'])
            ->when($mascotabus !== '', function ($query) use ($mascotabus) {
                $query->where('mascota_id', $mascotabus);
            })
            ->when($fechabus !== '', function ($query) use ($fechabus){
                $query->whereDate('fecha_hora', $fechabus);
            })
            ->when($estadobus !== '', function ($query) use ($estadobus){
                $query->where('estado', $estadobus);
            })
            ->when($vetbus !== '', function ($query) use ($vetbus) {
                $query->where('veterinario_id', $vetbus);
            })
            ->orderBy('fecha_hora', 'asc')
            ->paginate(10)
            ->withQueryString();

        $mascotalist= Cita::where('cliente_id', $cliente->id)
            ->with('mascota')
            ->get()
            ->pluck('mascota')
            ->filter()
            ->unique('id')
            ->values();

        $veterinariolist= Cita::where('cliente_id', $cliente->id)
            ->with('veterinario.user')
            ->get()
            ->pluck('veterinario')
            ->filter()
            ->unique('id')
            ->values();

        $fechasdisponibles= Cita::where('cliente_id', $cliente->id)
            ->select('fecha_hora')
            ->distinct()
            ->get()
            ->map(function ($consulta) {
                return Carbon::parse($consulta->fecha_hora)->format('Y-m-d');
            })
            ->unique()
            ->values();

        $estados= ['pendiente','completado','cancelado'];

        return Inertia::render('Citas/Index', [
            'citas' => $citas,
            'estados' => $estados,
            'fechasdisponibles' => $fechasdisponibles,
            'veterinariolist' => $veterinariolist,
            'mascotalist' => $mascotalist,
            'filtros' => [
                'mascotabus' => $mascotabus,
                'fechabus' => $fechabus,
                'estadobus' => $estadobus,
                'vetbus' => $vetbus,
            ], 
        ]);
    }

    #[Middleware('permission:gestionar citas')]
    public function indexcitas(Request $request)
    {
        $buscarname = trim($request->input('buscarname') ?? '');
        $especiebus = $request->input('especiebus', '');
        $fechabus = trim($request->input('fechabus') ?? '');
        $estadobus = trim($request->input('estadobus') ?? '');
        $vetbus = trim($request->input('vetbus') ?? '');
        $porPagina = (int) $request->input('por_pagina', 10);

        if (!in_array($porPagina, [10, 20, 50, 100], true)) { 
            $porPagina = 10; 
        }

        $citas = Cita::with(['cliente', 'mascota.raza.especie', 'veterinario.user'])
            ->when($buscarname !== '', function ($query) use ($buscarname){
                $query->whereHas('cliente', function ($q) use ($buscarname){
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
            ->when($vetbus !== '', function ($query) use ($vetbus) {
                $query->where('veterinario_id', $vetbus);
            })
            ->orderBy('fecha_hora', 'asc')
            ->paginate($porPagina)
            ->withQueryString();

        $veterinariolist= Cita::with(['cliente', 'mascota.raza.especie', 'veterinario.user'])
            ->get()
            ->pluck('veterinario')
            ->filter()
            ->unique('id')
            ->values();

        $fechasdisponibles= Cita::with(['cliente', 'mascota.raza.especie', 'veterinario.user'])
            ->select('fecha_hora')
            ->distinct()
            ->get()
            ->map(function ($consulta) {
                return Carbon::parse($consulta->fecha_hora)->format('Y-m-d');
            })
            ->unique()
            ->values();

        $estados= ['pendiente','completado','cancelado'];

        return Inertia::render('Citas/Indexcitas', [
            'citas' => $citas,
            'especies' => Especie::all(),
            'estados' => $estados,
            'fechasdisponibles' => $fechasdisponibles,
            'veterinariolist' => $veterinariolist,
            'filtros' => [
                'buscarname' => $buscarname,
                'fechabus' => $fechabus,
                'estadobus' => $estadobus,
                'especiebus' => $especiebus,
                'vetbus' => $vetbus,
                'por_pagina' => $porPagina,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $cliente = Cliente::where('user_id', auth()->id())->first();

        if (auth()->check()) {
            if (!$cliente || Mascota::where('cliente_id', $cliente->id)->count() === 0) {
                return redirect()
                    ->route('mascotas.index')
                    ->with('error', 'Debes registrar al menos una mascota antes de poder solicitar una cita.');
            }
        }

        if($cliente){
            $mascotas = Mascota::where('cliente_id', $cliente->id)->with(['raza.especie'])->get();
        }else{
            $mascotas = [];
        }

        $veterinarios = Veterinario::with('user')->get();
        
        return Inertia::render('Citas/Create', [
            'mascotas' => $mascotas,
            'veterinarios' => $veterinarios,
            'razas' => Raza::all(),
            'especies' => Especie::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCitaRequest $request)
    {

        if (auth()->check()) {
            $email = auth()->user()->email;
            $nombre = auth()->user()->name;
            $userId = auth()->id();
        }else{
            $email = $request->input('emailingresado');
            $nombre = $request->input('nombreingresado');
            $userId = null;
        }

        $cliente = Cliente::firstOrCreate(
            ['email' => $email],
            [
                'user_id' => $userId,
                'nombre' => $nombre,
                'telefono' => 'Pendiente',
            ]
        );

        if (auth()->check() && !$cliente->user_id) {
            $cliente->update(['user_id' => auth()->id()]);
        }
        
        $mascotaId = $request->input('mascota_id');

        if (!auth()->check() || !$mascotaId) {
            $mascota = Mascota::create([
                'cliente_id' => $cliente->id,
                'raza_id' => $request->input('raza_id', 1),
                'nombre' => $request->input('nombre_mascota', 'Sin nombre'),
                'sexo' => $request->input('sexo_mascota', 'Macho'),
                'edad' => $request->input('edad_mascota', 0),
            ]);
            $mascotaId = $mascota->id;
        }

        Cita::create([
            'cliente_id' => $cliente->id,
            'veterinario_id' => $request->input('veterinario_id'),
            'mascota_id' => $mascotaId,
            'fecha_hora' => $request->input('fecha_hora'),
            'motivo' => $request->input('motivo'),
            'estado' => 'pendiente',
        ]);

        $ultimaCita= Cita::where('cliente_id', $cliente->id)
            ->where('mascota_id', $mascotaId)
            ->latest('id')
            ->with(['cliente', 'mascota.raza.especie', 'veterinario.user'])
            ->first();

        if($ultimaCita){
            $data = [
                'cliente_nombre' => $cliente->nombre,
                'mascota_nombre' => $ultimaCita->mascota->nombre ?? 'Tu mascota',
                'veterinario_nombre' => $ultimaCita->veterinario->user->name ?? 'Personal médico',
                'fecha_hora' => $ultimaCita->fecha_hora,
                'motivo' => $ultimaCita->motivo ?? 'Consulta general',
            ];

            Mail::to($email->email ?? $cliente->email)
                ->send(new SendMail($data, 'Confirmación de Cita - Veterinaria', 'emails.cita_confirmada'));
        }

        if(!auth()->check()){
            return redirect()
                ->route('home')
                ->with('success', 'Cita creada correctamente');
        }else{
            return redirect()
                ->route('citas.index')
                ->with('success', 'Cita creada correctamente');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Cita $cita)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    #[Middleware('permission:editar cita')]
    public function edit(Cita $cita)
    {
        $veterinarios = Veterinario::with('user')->get();
        $cita->load(['cliente', 'mascota', 'veterinario']);
        $estados= ['pendiente','completado','cancelado'];

        return Inertia::render('Citas/Edit', [
            'cita' => $cita,
            'veterinarios' => $veterinarios,
            'estados' => $estados,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    #[Middleware('permission:editar cita')]
    public function update(UpdateCitaRequest $request, Cita $cita)
    {
        $validated = $request->validated();

        $cita->update($validated);

        return redirect()
            ->route('citas.index.admin')
            ->with('success', 'Cita actualizada correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    #[Middleware('permission:eliminar cita')]
    public function destroy(Cita $cita)
    {
        $cita->delete();

        return redirect()
            ->route('citas.index.admin')
            ->with('success', 'Cita borrada correctamente');
    }

    #[Middleware('permission:gestionar citas')]
    public function list_citas(Request $request)
    {
        $buscarname = trim($request->input('buscarname') ?? '');
        $especiebus = $request->input('especiebus', '');
        $fechabus = trim($request->input('fechabus') ?? '');
        $estadobus = trim($request->input('estadobus') ?? '');
        $vetbus = trim($request->input('vetbus') ?? '');

        $citas = Cita::with(['cliente', 'mascota.raza.especie', 'veterinario.user'])
            ->when($buscarname !== '', function ($query) use ($buscarname){
                $query->whereHas('cliente', function ($q) use ($buscarname){
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
            ->when($vetbus !== '', function ($query) use ($vetbus) {
                $query->where('veterinario_id', $vetbus);
            })
            ->orderBy('fecha_hora', 'asc')
            ->get();

        $pdf = Pdf::loadView('citas.list', [
            'citas' => $citas,
            'filtros' => [
                'fecha' => $fechabus,
                'estado' => $estadobus,
            ],
        ]);
        
        return $pdf->stream('citas_programadas.pdf');
        //return $pdf->download('citas_programadas.pdf');
    }
}
