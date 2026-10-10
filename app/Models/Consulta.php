<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consulta extends Model
{
    /** @use HasFactory<\Database\Factories\ConsultaFactory> */
    use HasFactory;

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
