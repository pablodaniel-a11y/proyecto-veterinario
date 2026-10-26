<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Detalle_Consulta;
use App\Models\Consulta;
use App\Models\Producto;

class DetalleConsultaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $consultaOtitis = Consulta::where('diagnostico', 'like', '%Otitis%')->first();
        $productoGotas = Producto::where('tipo_producto', 'Medicamento')->first();

        Detalle_Consulta::create([
            'consulta_id' => $consultaOtitis->id,
            'producto_id' => $productoGotas->id,
            'dosis' => 2.50,
            'cantidad' => 1,
            'indicaciones' => 'Aplicar 2 gotas en el oído afectado cada 12 horas.',
        ]);

        $otraConsulta = Consulta::inRandomOrder()->first();
        $productoServicio = Producto::where('tipo_producto', 'Servicio')->first();

        Detalle_Consulta::create([
            'consulta_id' => $otraConsulta->id,
            'producto_id' => $productoServicio->id,
            'dosis' => 1.00,
            'cantidad' => 1,
            'indicaciones' => 'Consulta clínica general realizada en consultorio.',
        ]);

    }
}
