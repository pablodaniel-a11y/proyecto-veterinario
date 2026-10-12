<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cita extends Model
{
    /** @use HasFactory<\Database\Factories\CitaFactory> */
    use HasFactory;

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
