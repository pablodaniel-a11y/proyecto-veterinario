<?php

namespace Database\Factories;

use App\Models\Mascota;
use App\Models\Cliente;
use App\Models\Raza;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Mascota>
 */
class MascotaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'cliente_id' => Cliente::inRandomOrder()->value('id'),
            'raza_id' => Raza::inRandomOrder()->value('id'),
            'nombre' => fake()->firstName(),
            'sexo' => fake()->randomElement(['Macho','Hembra']),
            'edad' => fake()->numberBetween(0, 40),
        ];
    }
}
