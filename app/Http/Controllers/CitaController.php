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

class CitaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cliente = Cliente::where('user_id', auth()->id())->first();

        if($cliente){
            $citas = Cita::where('cliente_id', $cliente->id)->with(['cliente', 'mascota.raza.especie', 'veterinario.user'])->get();
        }else{
            $citas = [];
        }

        return Inertia::render('Citas/Index', [
            'citas' => $citas,
        ]);
    }

    public function indexcitas()
    {
        $citas = Cita::with(['cliente', 'mascota.raza.especie', 'veterinario.user'])->get();

        return Inertia::render('Citas/Indexcitas', [
            'citas' => $citas,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $cliente = Cliente::where('user_id', auth()->id())->first();

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
                'teflono' => 'Pendiente',
            ]
        );
        
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
    public function destroy(Cita $cita)
    {
        $cita->delete();

        return redirect()
            ->route('citas.index.admin')
            ->with('success', 'Cita borrada correctamente');
    }
}
