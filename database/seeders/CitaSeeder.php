<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cita;
use App\Models\Mascota;
use App\Models\Veterinario;
use App\Models\Cliente;

class CitaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ciro = Mascota::where('nombre', 'Ciro')->first();
        $mini = Mascota::where('nombre', 'Mini')->first();
        $veterinario = Veterinario::inRandomOrder()->first();
        $veterinarioPrueba = Veterinario::where('telefono', '387123456')->firstOrFail();
        $clienteCiro = $ciro ? $ciro->cliente_id : Cliente::first()->id;
        $clienteMini = $mini ? $mini->cliente_id : Cliente::first()->id;

        Cita::create([
            'cliente_id'     => $clienteCiro,
            'veterinario_id' => $veterinario->id,
            'mascota_id'     => $ciro->id,
            'fecha_hora'     => now()->subDays(2),
            'motivo'         => 'Ciro tiene una molestia en las orejas y se rasca mucho.',
            'estado'         => 'confirmada',
        ]);

        Cita::create([
            'cliente_id'     => $clienteMini,
            'veterinario_id' => $veterinario->id,
            'mascota_id'     => $mini->id,
            'fecha_hora'     => now()->addDay(),
            'motivo'         => 'Control de rutina anual y vacunación.',
            'estado'         => 'pendiente',
        ]);

        Cita::create([
            'cliente_id'     => $clienteMini,
            'veterinario_id' => $veterinarioPrueba->id,
            'mascota_id'     => $mini->id,
            'fecha_hora'     => now(),
            'motivo'         => 'Control de rutina anual y vacunación.',
            'estado'         => 'confirmada',
        ]);
    }
}
