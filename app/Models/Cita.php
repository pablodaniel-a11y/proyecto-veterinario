<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cita extends Model
{
    /** @use HasFactory<\Database\Factories\CitaFactory> */
    use HasFactory;

    protected $fillable = [
        'cliente_id',
        'veterinario_id',
        'mascota_id',
        'fecha_hora',
        'motivo',
        'estado',
    ];

    public function cliente()
    {
        return $this->BelongsTo(Cliente::class);
    }


    public function mascota()
    {
        return $this->BelongsTo(Mascota::class);
    }

    public function veterinario()
    {
        return $this->BelongsTo(Veterinario::class);
    }
}
