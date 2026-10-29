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
        $usuariorecepcion = User::where('email', 'recepcion@recepcion.com')->firstOrFail();
        $usuarioreg = User::where('email', 'reg@reg.com')->firstOrFail();

        Cliente::create([
            'user_id' => $usuario->id,
            'nombre' => 'Prueba',
            'email' => 'algo@algo.com',
            'telefono' => '123456789',
        ]);

        Cliente::create([
            'user_id' => null,
            'nombre' => 'Pablo Visitante',
            'email' => 'Pablo@visitante.com',
            'telefono' => '987654321',
        ]);

        Cliente::create([
            'user_id' => $usuariorecepcion->id,
            'nombre' => 'María Recepción',
            'email' => 'recepcion@recepcion.com',
            'telefono' => '987654321',
        ]);

        Cliente::create([
            'user_id' => $usuarioreg->id,
            'nombre' => 'registrado',
            'email' => 'reg@reg.com',
            'telefono' => '987654321',
        ]);
    }
}
