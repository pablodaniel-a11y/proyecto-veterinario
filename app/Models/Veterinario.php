<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Veterinario extends Model
{
    /** @use HasFactory<\Database\Factories\VeterinarioFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nombre',
        'apellido',
        'telefono',
        'email',
    ];

    public function citas()
    {
        return $this->hasMany(Cita::class);
    }

    public function consultas()
    {
        return $this->hasMany(Consulta::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
