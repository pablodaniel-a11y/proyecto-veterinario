<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use App\Models\Veterinario;
use App\Http\Requests\StoreAgendaRequest;
use App\Http\Requests\UpdateAgendaRequest;
use Inertia\Inertia;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Illuminate\Http\Request;

class AgendaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    #[Middleware('permission:ver agendas')]
    public function index(Request $request)
    {
        $buscarname = trim($request->input('buscarname', ''));
        $especialidadbus = trim($request->input('especialidadbus', ''));

        $user= auth()->user();
        $query= Agenda::with('veterinario.user')
            ->orderBy('dia_semana');

        if($user->hasRole('veterinario') && !$user->hasAnyRole(['admin', 'super-admin', 'recepcionista'])){
            $query->whereHas('veterinario', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            });
        }

        $query->when($buscarname != '', function ($query) use ($buscarname) {
            $query->whereHas('veterinario.user', function ($q) use ($buscarname) {
                $q->where('name', 'like', "%{$buscarname}%");
            });
        });
        
        $query->when($especialidadbus !== '', function ($query) use ($especialidadbus) {
            $query->whereHas('veterinario', function ($q) use ($especialidadbus) {
                $q->where('especialidad', $especialidadbus);
            });
        });

        $especialidades= Veterinario::select('especialidad')
            ->distinct()
            ->pluck('especialidad');

        $agendas= $query->paginate(10)->withQueryString();

        return Inertia::render('Agendas/Index', [
            'agendas' => $agendas,
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
    #[Middleware('permission:gestionar agendas')]
    public function create()
    {
        $user= auth()->user();
        
        if($user->hasRole('veterinario') && !$user->hasAnyRole(['admin','super-admin', 'recepcionista'])){
            $veterinarios = Veterinario::where('user_id', $user->id)->with('user')->get();
        }else{
            $veterinarios = Veterinario::with('user')->get();
        }

        return Inertia::render('Agendas/Create', [
            'veterinarios' => $veterinarios,
            'esVeterinarioRestringido' => $user->hasRole('veterinario') && !$user->hasAnyRole(['admin', 'super-admin', 'recepcionista']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    #[Middleware('permission:gestionar agendas')]
    public function store(StoreAgendaRequest $request)
    {
        $user = auth()->user();
        $data = $request->validated();
        if($user->hasRole('veterinario') && !$user->hasAnyRole(['admin','super-admin','recepcionista'])) {
            $veterinario = Veterinario::where('user_id', $user->id)->firstOrFail();
            $data['veterinario_id'] = $veterinario->id;
        }

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
    #[Middleware('permission:editar agenda')]
    public function edit(Agenda $agenda)
    {
        $user = auth()->user();

        if ($user->hasRole('veterinario') && !$user->hasAnyRole(['admin', 'super-admin', 'recepcionista'])) {
            if ($agenda->veterinario->user_id !== $user->id) {
                abort(403, 'No tienes permiso para editar esta agenda.');
            }
        }


        return Inertia::render('Agendas/Edit', [
            'agenda' => $agenda,
            'veterinarios' => Veterinario::with('user')->get(),
            'esVeterinarioRestringido' => $user->hasRole('veterinario') && !$user->hasAnyRole(['admin', 'super-admin', 'recepcionista']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    #[Middleware('permission:editar agenda')]
    public function update(UpdateAgendaRequest $request, Agenda $agenda)
    {
        $user = auth()->user();

        if ($user->hasRole('veterinario') && !$user->hasAnyRole(['admin', 'super-admin', 'recepcionista'])) {
            if ($agenda->veterinario->user_id !== $user->id) {
                abort(403, 'No tienes permiso para actualizar esta agenda.');
            }
        }

        $agenda->update($request->validated());

        return redirect()
            ->route('agendas.index')
            ->with('success', 'Agenda actualizada correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    #[Middleware('permission:eliminar agenda')]
    public function destroy(Agenda $agenda)
    {
        $agenda->delete();

        return redirect()
            ->route('agendas.index')
            ->with('success', 'Agenda eliminada correctamente.');
    }
}
