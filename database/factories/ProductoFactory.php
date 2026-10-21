<?php

namespace Database\Factories;

use App\Models\Producto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Producto>
 */
class ProductoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre_producto' => fake()->word() . ' ' . fake()->randomElement(['Antipulgas', 'Vitaminas', 'Shampoo', 'Gotas óticas']),
            'tipo_producto' => fake()->randomElement(['Medicamento', 'Higiene', 'Accesorio']), // 'Servicio'
            'precio_venta' => fake()->randomFloat(2, 10, 100),  // Precios aleatorios con 2 decimales (mínimo 10, máximo 100)
            'stock_actual' => fake()->numberBetween(10, 100),
        ];
    }
}
