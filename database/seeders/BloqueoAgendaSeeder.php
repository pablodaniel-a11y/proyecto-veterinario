<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BloqueoAgenda;
use App\Models\User;

class BloqueoAgendaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $recepcionista = User::where('email', 'recepcion@recepcion.com')->first();

        if($recepcionista){
            BloqueoAgenda::create([
                'user_id'     => $recepcionista->id,
                'fecha'       => now()->addDays(10)->format('Y-m-d'),
                'hora_inicio' => null,
                'hora_fin'    => null,
                'motivo'      => 'Feriado Nacional / Inhábil',
            ]);

            BloqueoAgenda::create([
                'user_id'     => $recepcionista->id,
                'fecha'       => now()->addDays(15)->format('Y-m-d'),
                'hora_inicio' => '09:00:00',
                'hora_fin'    => '11:30:00',
                'motivo'      => 'Corte programado de suministro eléctrico',
            ]);
        }
    }
}
