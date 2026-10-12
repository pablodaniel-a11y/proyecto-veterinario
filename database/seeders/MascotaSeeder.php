<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Mascota;
use App\Models\User;
use App\Models\Raza;

class MascotaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $usuario = User::first();

        $caniche = Raza::where('nombre', 'Caniche')->firstOrFail();
        $siames = Raza::where('nombre', 'Siames')->firstOrFail();

        Mascota::create([
            'user_id' => $usuario->id,
            'raza_id' => $caniche->id,
            'nombre' => 'Ciro',
            'sexo' => 'Macho',
            'edad' => 20,
        ]);

        Mascota::create([
            'user_id' => $usuario->id,
            'raza_id' => $siames->id,
            'nombre' => 'Mini',
            'sexo' => 'Hembra',
            'edad' => 18,
        ]);
    }
}
