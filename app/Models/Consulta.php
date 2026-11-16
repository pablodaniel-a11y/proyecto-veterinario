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
        'cita_id',
        'fecha_hora',
        'motivo_consulta',
        'diagnostico',
        'tratamiento',
        'peso',
        'estado',
        'observaciones'
    ];


    public function mascota()
    {
        return $this->belongsTo(Mascota::class);
    }

    public function veterinario()
    {
        return $this->belongsTo(Veterinario::class);
    }

    public function detalles_consultas()
    {
        return $this->hasMany(Detalle_Consulta::class);
    }

    public function cita()
    {
        return $this->belongsTo(Cita::class);
    }
}
