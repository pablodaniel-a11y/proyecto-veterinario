<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use App\Models\Veterinario;
use App\Http\Requests\StoreAgendaRequest;
use App\Http\Requests\UpdateAgendaRequest;
use Inertia\Inertia;
use Illuminate\Routing\Attributes\Controllers\Middleware;

class AgendaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    #[Middleware('permission:ver agendas')]
    public function index()
    {
        $agendas = Agenda::with('veterinario.user')
            ->orderBy('dia_semana')
            ->paginate(10);

        return Inertia::render('Agendas/Index', [
            'agendas' => $agendas,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    #[Middleware('permission:gestionar agendas')]
    public function create()
    {
        return Inertia::render('Agendas/Create', [
            'veterinarios' => Veterinario::with('user')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    #[Middleware('permission:gestionar agendas')]
    public function store(StoreAgendaRequest $request)
    {
        Agenda::create($request->validated());

        return redirect()
            ->route('agendas.index')
            ->with('success', 'Agenda creada correctamente.');
    }

    /**
     * Display the specified resource.
     */
    #[Middleware('permission:gestionar agendas')]
    public function show(Agenda $agenda)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    #[Middleware('permission:gestionar agendas')]
    public function edit(Agenda $agenda)
    {
        return Inertia::render('Agendas/Edit', [
            'agenda' => $agenda,
            'veterinarios' => Veterinario::with('user')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    #[Middleware('permission:gestionar agendas')]
    public function update(UpdateAgendaRequest $request, Agenda $agenda)
    {
        $agenda->update($request->validated());

        return redirect()
            ->route('agendas.index')
            ->with('success', 'Agenda actualizada correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    #[Middleware('permission:gestionar agendas')]
    public function destroy(Agenda $agenda)
    {
        $agenda->delete();

        return redirect()
            ->route('agendas.index')
            ->with('success', 'Agenda eliminada correctamente.');
    }
}
