<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cita;
use App\Models\Cliente;
use App\Models\Consulta;
use App\Models\Mascota;
use App\Models\Veterinario;
use App\Models\Producto;
use App\Models\Agenda;
use App\Models\BloqueoAgenda;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user= auth()->user();

        if($user->hasRole(['admin', 'super-admin'])){
            $metrics= [
                'total_mascotas' => Mascota::count(),
                'total_clientes' => Cliente::count(),
                'total_veterinarios' => Veterinario::count(),
                'citas_hoy' => Cita::whereDate('fecha_hora', today())->count(),
                'total_productos' => Producto::count(),
            ];

            $mascotas_especies= Mascota::query()
                ->join('razas', 'mascotas.raza_id', '=', 'razas.id')
                ->join('especies', 'razas.especie_id', '=', 'especies.id')
                ->select('especies.nombre as especie', DB::raw('count(mascotas.id) as total'))
                ->groupBy('especies.nombre')
                ->get()
                ->map(fn ($item) => ['name' => $item->especie, 'value' => (int) $item->total]);

            $citas_estados= Cita::query()
                ->select('estado', DB::raw('count(*) as total'))
                ->groupBy('estado')
                ->get()
                ->map(fn ($item) => ['name' => ucfirst($item->estado), 'value' => (int) $item->total]);

            $consultas_veterinarios= Veterinario::with('user:id,name')
                ->withCount('consultas')
                ->get()
                ->map(fn ($v) => [
                    'name'  => "Dr./Dra. " . ($v->user->name ?? 'Veterinario #' . $v->id),
                    'total' => (int) $v->consultas_count,
                ]);

            $citasRecientes= Cita::with(['cliente', 'mascota', 'veterinario.user'])
                ->latest('fecha_hora')
                ->take(6)
                ->get();

            return Inertia::render('dashboard', [
                'role' => 'admin',
                'metrics' => $metrics,
                'mascotas_especies' => $mascotas_especies,
                'citas_estados' => $citas_estados,
                'consultas_veterinarios' => $consultas_veterinarios,
                'citasRecientes' => $citasRecientes,
            ]);
        }

        if($user->hasRole('veterinario')){
            $veterinario=Veterinario::where('user_id', $user->id)->first();
            $vetId= $veterinario?->id;

            $bloqueoHoy=BloqueoAgenda::where('user_id', $user->id)
                ->whereDate('fecha', today())
                ->first();

            $metrics= [
                'mis_citas_hoy' => Cita::where('veterinario_id', $vetId)->whereDate('fecha_hora', today())->count(),
                'mis_consultas' => Consulta::where('veterinario_id', $vetId)->count(),
                'pacientes_atendidos' => Consulta::where('veterinario_id', $vetId)->distinct('mascota_id')->count(),
                'esta_bloqueado_hoy' => $bloqueoHoy ? true : false,
                'motivo_bloqueo' => $bloqueoHoy?->motivo ?? null,
            ];

            $citasRecientes= Cita::with(['cliente', 'mascota'])
                ->where('veterinario_id', $vetId)
                ->latest('fecha_hora')
                ->take(6)
                ->get();

            return Inertia::render('dashboard', [
                'role' => 'veterinario',
                'metrics' => $metrics,
                'citasRecientes' => $citasRecientes,
            ]);
        }

        if($user->hasRole(['recepcionista'])){
            $metrics = [
                'citas_hoy' => Cita::whereDate('fecha_hora', today())->count(),
                'citas_pendientes' => Cita::where('estado', 'pendiente')->count(),
                'nuevos_clientes' => Cliente::whereDate('created_at', '>=', now()->subWeek())->count(),
            ];

            $citasRecientes = Cita::with(['cliente', 'mascota', 'veterinario.user'])
                ->latest('fecha_hora')
                ->take(8)
                ->get();

            return Inertia::render('dashboard', [
                'role' => 'recepcionista',
                'metrics' => $metrics,
                'citasRecientes' => $citasRecientes,
            ]);
        }
        
        if($user->hasRole(['inventario'])){
            $metrics= [
                'total_productos' => Producto::count(),
                'stock_bajo' => Producto::where('stock_actual', '<=', 5)->count(),
                'tipos_productos' => Producto::distinct('tipo_producto')->count(),
            ];

            $productosCriticos=Producto::where('stock_actual', '<=', 5)
                ->select('id', 'nombre_producto', 'tipo_producto', 'stock_actual', 'precio_venta')
                ->take(6)
                ->get();

            return Inertia::render('dashboard', [
                'role' => 'inventario',
                'metrics' => $metrics,
                'productosCriticos' => $productosCriticos,
            ]);
        }


        return Inertia::render('dashboard', ['role' => 'default', 'metrics' => []]);
    }
}
