<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BloqueoAgenda extends Model
{
    /** @use HasFactory<\Database\Factories\BloqueoAgendaFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'fecha',
        'hora_inicio',
        'hora_fin',
        'motivo',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
