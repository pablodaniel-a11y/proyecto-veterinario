<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cliente;
use App\Models\User;

class ClienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $usuario = User::first();

        Cliente::create([
            'user_id' => $usuario->id,
            'nombre' => 'Prueba',
            'email' => 'algo@algo.com',
            'telefono' => '123456789',
        ]);

        Cliente::create([
            'user_id' => null, // No tiene usuario registrado aún
            'nombre' => 'Pablo Visitante',
            'email' => 'Pablo@visitante.com',
            'telefono' => '987654321',
        ]);
    }
}
