<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consulta extends Model
{
    /** @use HasFactory<\Database\Factories\ConsultaFactory> */
    use HasFactory;

    protected $fillable = [
        'veterinario_id',
        'mascota_id',
        'fecha_hora',
        'motivo_consulta',
        'diagnostico',
        'peso',
        'estado',
    ];


    public function mascota()
    {
        return $this->BelongsTo(Mascota::class);
    }

    public function veterinario()
    {
        return $this->BelongsTo(Veterinario::class);
    }

    public function detalles_consultas()
    {
        return $this->HasMany(Especie::class);
    }
}
