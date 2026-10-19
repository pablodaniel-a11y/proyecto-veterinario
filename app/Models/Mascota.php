<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mascota extends Model
{
    /** @use HasFactory<\Database\Factories\MascotaFactory> */
    use HasFactory;

    protected $fillable = [
        'cliente_id',
        'raza_id',
        'nombre',
        'sexo',
        'edad',
        'foto',
    ];

    public function cliente()
    {
        return this->BelongsTo(Cliente::class);
    }

    public function raza()
    {
        return $this->belongsTo(Raza::class);
    }

    public function citas()
    {
        return $this->hasMany(Cita::class);
    }

    public function especie()
    {
        return $this->BelongsTo(Especie::class);
    }

    public function consultas()
    {
        return $this->hasMany(Consulta::class);
    }
}
