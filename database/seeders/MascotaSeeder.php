<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Mascota;
use App\Models\Cliente;
use App\Models\Raza;

class MascotaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cliente = Cliente::firstOrFail();

        $caniche = Raza::where('nombre', 'Caniche')->firstOrFail();
        $siames = Raza::where('nombre', 'Siames')->firstOrFail();

        Mascota::create([
            'cliente_id' => $cliente->id,
            'raza_id' => $caniche->id,
            'nombre' => 'Ciro',
            'sexo' => 'Macho',
            'edad' => 20,
        ]);

        Mascota::create([
            'cliente_id' => $cliente->id,
            'raza_id' => $siames->id,
            'nombre' => 'Mini',
            'sexo' => 'Hembra',
            'edad' => 18,
        ]);
    }
}
