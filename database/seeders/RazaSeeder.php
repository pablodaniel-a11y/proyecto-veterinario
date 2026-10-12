<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Raza;
use App\Models\Especie;

class RazaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $perro = Especie::where('nombre', 'Perro')->firstOrFail();
        $gato = Especie::where('nombre', 'Gato')->firstOrFail();

        Raza::create(['especie_id' => $perro->id, 'nombre' => 'Labrador']);
        Raza::create(['especie_id' => $perro->id, 'nombre' => 'Caniche']);

        Raza::create(['especie_id' => $gato->id, 'nombre' => 'Siames']);
        Raza::create(['especie_id' => $gato->id, 'nombre' => 'Persa']);
    }
}
