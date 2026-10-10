<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detalle_Consulta extends Model
{
    /** @use HasFactory<\Database\Factories\DetalleConsultaFactory> */
    use HasFactory;


    public function consulta()
    {
        return $this->BelongsTo(Consulta::class);
    }

    public function producto()
    {
        return $this->BelongsTo(Producto::class);
    }
}
