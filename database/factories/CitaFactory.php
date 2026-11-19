<?php

namespace Database\Factories;

use App\Models\Cita;
use App\Models\Mascota;
use App\Models\Cliente;
use App\Models\Veterinario;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Cita>
 */
class CitaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'cliente_id'     => Cliente::inRandomOrder()->value('id'),
            'veterinario_id' => Veterinario::inRandomOrder()->value('id'),
            'mascota_id'     => Mascota::inRandomOrder()->value('id'),
            'fecha_hora'     => fake()->dateTimeBetween('-1 week', '+1 week'),
            'motivo'         => fake()->sentence(8),
            'estado'         => fake()->randomElement(['pendiente', 'confirmada']),
        ];
    }
}
