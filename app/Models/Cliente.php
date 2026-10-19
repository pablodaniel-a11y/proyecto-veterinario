<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    /** @use HasFactory<\Database\Factories\ClienteFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nombre',
        'email',
        'telefono',
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function citas()
    {
        return $this->hasMany(Cita::class);
    }
}
