<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Detalle_Consulta;
use App\Models\Consulta;
use App\Models\Producto;
use App\Models\Cita;

class DetalleConsultaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $consultaOtitis = Consulta::where('estado', 'completado')->first() ?? Consulta::first();
        $productoGotas = Producto::where('tipo_producto', 'Medicamento')->first() ?? Producto::first();

        if ($consultaOtitis && $productoGotas) {
            Detalle_Consulta::create([
                'consulta_id'  => $consultaOtitis->id,
                'producto_id'  => $productoGotas->id,
                'nombre_medicamento' => null,
                'dosis'        => 2,
                'cantidad'     => 1,
                'indicaciones' => 'Aplicar 2 gotas en el oído afectado cada 12 horas.',
            ]);
            
            Detalle_Consulta::create([
                'consulta_id' => $consultaOtitis->id,
                'producto_id' => null,
                'nombre_medicamento' => 'Clorhexidina solución tópica 2% (Farmacia externa)',
                'dosis' => 1,
                'cantidad' => 1,
                'indicaciones' => 'Limpiar suavemente el pabellón auricular antes de colocar las gotas.',
            ]);
        }

        $otraConsulta = Consulta::inRandomOrder()->first();
        $productoServicio = Producto::where('tipo_producto', 'Servicio')->first() ?? Producto::first();

        if ($otraConsulta && $productoServicio) {
            Detalle_Consulta::create([
                'consulta_id'  => $otraConsulta->id,
                'producto_id'  => $productoServicio->id,
                'nombre_medicamento' => null,
                'dosis'        => 1.00,
                'cantidad'     => 1,
                'indicaciones' => 'Consulta clínica general realizada en consultorio.',
            ]);
        }
    }
}
