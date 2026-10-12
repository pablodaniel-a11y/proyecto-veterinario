<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Raza extends Model
{
    /** @use HasFactory<\Database\Factories\RazaFactory> */
    use HasFactory;

    public function mascotas()
    {
        return $this->hasMany(Mascota::class);
    }

    public function especie()
    {
        return $this->belongsTo(Especie::class);
    }
}
