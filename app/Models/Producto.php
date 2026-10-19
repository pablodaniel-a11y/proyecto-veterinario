<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    /** @use HasFactory<\Database\Factories\ProductoFactory> */
    use HasFactory;

    protected $fillable = [
        'nombre_producto',
        'tipo_producto',
        'precio_venta',
        'stock_actual',
    ];

    public function detalles_consultas()
    {
        return $this->HasMany(Especie::class);
    }
}
