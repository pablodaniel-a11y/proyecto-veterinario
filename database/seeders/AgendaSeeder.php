<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Veterinario;
use App\Models\Agenda;

class AgendaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $veterinarios = Veterinario::with('user')->get();

        foreach ($veterinarios as $index => $veterinario) {

            $horaInicio = ($index % 2 === 0) ? '09:00:00' : '14:00:00';
            $horaFin    = ($index % 2 === 0) ? '13:00:00' : '18:00:00';
            $diasAtencion = ($index % 2 === 0) ? [1, 3, 5] : [2, 4];

            foreach ($diasAtencion as $dia) {
                Agenda::create([
                    'veterinario_id' => $veterinario->id,
                    'dia_semana'     => $dia,
                    'hora_inicio'    => $horaInicio,
                    'hora_fin'       => $horaFin,
                    'duracion_turno_minutos' => 30,
                    'activo'         => true,
                ]);
            }
        }
    }
}
