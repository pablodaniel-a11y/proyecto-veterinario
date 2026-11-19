<?php

namespace Database\Factories;

use App\Models\Veterinario;
use App\Models\User;
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
            'user_id' => User::factory(),
            'telefono' => fake()->unique()->phoneNumber(),
            'matricula' => fake()->unique()->numberBetween(1000, 9999),
            'especialidad' => fake()->randomElement(['Cirugía', 'Clínica General', 'Felinos', 'Dermatología', 'Oftalmología', 'Etología (Comportamiento Animal)', 'Nutrición y Dietética']),
        ];
    }
}
