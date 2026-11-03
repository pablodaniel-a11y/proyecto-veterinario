<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cita;
use App\Models\Cliente;
use App\Models\Consulta;
use App\Models\Mascota;
use App\Models\Veterinario;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $metrics = [
            'total_mascotas'   => Mascota::count(),
            'total_clientes'   => Cliente::count(),
            'total_veterinarios' => Veterinario::count(),
            'citas_hoy'        => Cita::whereDate('fecha_hora', today())->count(),
        ];

        $mascotas_especies= Mascota::query()
            ->join('razas', 'mascotas.raza_id', '=', 'razas.id')
            ->join('especies', 'razas.especie_id', '=', 'especies.id')
            ->select('especies.nombre as especie', DB::raw('count(mascotas.id) as total'))
            ->groupBy('especies.nombre')
            ->get()
            ->map(fn ($item) => [
                'name'  => $item->especie,
                'value' => (int) $item->total,
            ]);

        $citas_estados = Cita::query()
            ->select('estado', DB::raw('count(*) as total'))
            ->groupBy('estado')
            ->get()
            ->map(fn ($item) => [
                'name'  => ucfirst($item->estado),
                'value' => (int) $item->total,
            ]);

        $consultas_veterinarios = Veterinario::with('user:id,name')
            ->withCount('consultas')
            ->get()
            ->map(fn ($v) => [
                'name'  => "Dr./Dra. " . ($v->user->name ?? 'Veterinario #' . $v->id),
                'total' => (int) $v->consultas_count,
            ]);

        $citasRecientes = Cita::with(['cliente', 'mascota', 'veterinario.user'])
            ->latest('fecha_hora')
            ->take(6)
            ->get();

        return Inertia::render('dashboard', [
            'metrics'                 => $metrics,
            'mascotas_especies'      => $mascotas_especies,
            'citas_estados'          => $citas_estados,
            'consultas_veterinarios' => $consultas_veterinarios,
            'citasRecientes'          => $citasRecientes,
        ]);
    }
}
