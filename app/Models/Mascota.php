<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mascota extends Model
{
    /** @use HasFactory<\Database\Factories\MascotaFactory> */
    use HasFactory;

    public function user()
    {
        return this->BelongsTo(User::class);
    }

    public function citas()
    {
        return $this->hasMany(Cita::class);
    }
}
