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
            // Genera una palabra aleatoria combinada con un tipo común en veterinaria
            'nombre_producto' => fake()->word() . ' ' . fake()->randomElement(['Antipulgas', 'Vitaminas', 'Shampoo', 'Gotas óticas']),
            
            // Elige un texto aleatorio de los que le pasemos en el array
            'tipo_producto' => fake()->randomElement(['Medicamento', 'Higiene', 'Accesorio']),
            
            // Precios aleatorios con 2 decimales (mínimo 10, máximo 100)
            'precio_venta' => fake()->randomFloat(2, 10, 100),
            
            // Números enteros aleatorios para el inventario
            'stock_actual' => fake()->numberBetween(10, 100),
        ];
    }
}
