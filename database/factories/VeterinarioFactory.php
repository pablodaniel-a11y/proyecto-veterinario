<?php

namespace Database\Factories;

use App\Models\Veterinario;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Veterinario>
 */
class VeterinarioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => fake()->firstname(),
            'apellido' => fake()->lastName(),
            'telefono' => fake()->unique()->phoneNumber(),
            'email' => fake()->unique()->safeEmail(),
        ];
    }
}
