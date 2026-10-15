<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Producto;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Producto::create([
            'nombre_producto' => 'Consulta Veterinaria General',
            'tipo_producto' => 'Servicio',
            'precio_venta' => 20.00,
            'stock_actual' => 0,
        ]);

        Producto::create([
            'nombre_producto' => 'Vacuna Antirrábica',
            'tipo_producto' => 'Medicamento',
            'precio_venta' => 25.00,
            'stock_actual' => 30,
        ]);

        Producto::factory()->count(15)->create();
    }
}
