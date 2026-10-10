<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EspecieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Especie::create(['nombre' => 'Perro']);
        Especie::create(['nombre' => 'Gato']);
        Especie::create(['nombre' => 'Ave']);
        Especie::create(['nombre' => 'Reptil']);
        Especie::create(['nombre' => 'Roedor']);
    }
}
