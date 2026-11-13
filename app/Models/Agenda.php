<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    /** @use HasFactory<\Database\Factories\AgendaFactory> */
    use HasFactory;

    protected $fillable = [
        'veterinario_id',
        'dia_semana',
        'hora_inicio',
        'hora_fin',
        'duracion_turno_minutos',
        'activo',
    ];

    public function veterinario()
    {
        return $this->belongsTo(Veterinario::class);
    }
    
}
