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
        $clienteregistrado = Cliente::where('email', 'reg@reg.com')->firstOrFail();

        $caniche = Raza::where('nombre', 'Caniche')->firstOrFail();
        $siames = Raza::where('nombre', 'Siames')->firstOrFail();
        $razaIds = Raza::pluck('id')->all();

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

        Mascota::factory()
            ->count(4)
            ->state(fn () => [
                'cliente_id' => $clienteregistrado->id,
                'raza_id' => fake()->randomElement($razaIds),
            ])
            ->create();

        Mascota::factory()
            ->count(4)
            ->state(fn () => [
                'cliente_id' => $cliente->id,
                'raza_id' => fake()->randomElement($razaIds),
            ])
            ->create();
    }
}
