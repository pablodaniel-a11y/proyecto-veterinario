<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Veterinario extends Model
{
    /** @use HasFactory<\Database\Factories\VeterinarioFactory> */
    use HasFactory;

    public function citas()
    {
        return $this->hasMany(Cita::class);
    }

    public function consultas()
    {
        return $this->hasMany(Consulta::class);
    }
}
