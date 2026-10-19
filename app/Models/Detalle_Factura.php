<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detalle_Factura extends Model
{
    /** @use HasFactory<\Database\Factories\DetalleFacturaFactory> */
    use HasFactory;

    protected $fillable = [
        'factura_id',
        'producto_id',
        'consulta_id',
        'cantidad',
        'precio_unitario',
    ];
}
