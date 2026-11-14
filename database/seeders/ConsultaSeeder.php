<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Consulta;
use App\Models\Mascota;
use App\Models\Veterinario;
use App\Models\Cita;


class ConsultaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $citas = Cita::all();

        foreach ($citas as $cita) {
            if ($cita->estado === 'confirmada' || $cita->estado === 'completado') {
                Consulta::create([
                    'cita_id'         => $cita->id,
                    'veterinario_id'  => $cita->veterinario_id,
                    'mascota_id'      => $cita->mascota_id,
                    'fecha_hora'      => $cita->fecha_hora,
                    'motivo_consulta' => $cita->motivo,
                    'diagnostico'     => $cita->estado === 'completado' ? 'Otitis leve debida a humedad.' : 'Pendiente de revisión en clínica.',
                    'peso'            => 8.50,
                    'estado'          => $cita->estado === 'completado' ? 'completado' : 'pendiente',
                    'observaciones'   => 'Se recetaron productos de prueba.',
                ]);
            }
        }
    }
}
