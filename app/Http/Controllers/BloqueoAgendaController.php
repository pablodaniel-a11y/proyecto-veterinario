<?php

namespace App\Http\Controllers;

use App\Models\BloqueoAgenda;
use App\Http\Requests\StoreBloqueoAgendaRequest;
use App\Http\Requests\UpdateBloqueoAgendaRequest;
use Inertia\Inertia;
use Illuminate\Routing\Attributes\Controllers\Middleware;

class BloqueoAgendaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    #[Middleware('permission:gestionar citas')]
    public function index()
    {
        $bloqueos = BloqueoAgenda::with('user')
            ->orderBy('fecha', 'desc')
            ->paginate(10);

        return Inertia::render('Bloqueos/Index', [
            'bloqueos' => $bloqueos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    #[Middleware('permission:gestionar citas')]
    public function create()
    {
        return Inertia::render('Bloqueos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    #[Middleware('permission:gestionar citas')]
    public function store(StoreBloqueoAgendaRequest $request)
    {
        BloqueoAgenda::create([
            'user_id'     => auth()->id(),
            'fecha'       => $request->fecha,
            'hora_inicio' => $request->hora_inicio,
            'hora_fin'    => $request->hora_fin,
            'motivo'      => $request->motivo,
        ]);

        return redirect()
            ->route('bloqueos.index')
            ->with('success', 'Bloqueo o feriado registrado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BloqueoAgenda $bloqueoAgenda)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    
    public function edit(BloqueoAgenda $bloqueoAgenda)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBloqueoAgendaRequest $request, BloqueoAgenda $bloqueoAgenda)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    #[Middleware('permission:gestionar citas')]
    public function destroy(BloqueoAgenda $bloqueo)
    {
        $bloqueo->delete();

        return redirect()
            ->route('bloqueos.index')
            ->with('success', 'Bloqueo eliminado correctamente.');
    }
}
