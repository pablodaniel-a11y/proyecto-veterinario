<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Consulta;
use App\Models\Mascota;
use App\Models\Veterinario;


class ConsultaSeeder extends Seeder
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

        Consulta::create([
            'veterinario_id'  => $veterinario->id,
            'mascota_id'      => $ciro->id,
            'fecha_hora'      => now()->subDays(2),
            'motivo_consulta' => 'Ciro tiene una molestia en las orejas y se rasca mucho.',
            'diagnostico'     => 'Otitis leve leve debida a humedad.',
            'peso'            => 8.50,
            'estado'          => 'completado',
            'observaciones'   => 'Se recetaron gotas oticas por 5 días.',
        ]);

        Consulta::create([
            'veterinario_id'  => $veterinario->id,
            'mascota_id'      => $mini->id,
            'fecha_hora'      => now(),
            'motivo_consulta' => 'Control de rutina anual y vacunación.',
            'diagnostico'     => 'Pendiente de revisión en clínica.',
            'peso'            => 4.20,
            'estado'          => 'pendiente',
            'observaciones'   => null,
        ]);

        Consulta::create([
            'veterinario_id'  => $veterinarioPrueba->id,
            'mascota_id'      => $mini->id,
            'fecha_hora'      => now(),
            'motivo_consulta' => 'Control de rutina anual y vacunación.',
            'diagnostico'     => 'Pendiente de revisión en clínica.',
            'peso'            => 4.20,
            'estado'          => 'pendiente',
            'observaciones'   => null,
        ]);
    }
}
