<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'PruebaAdmin',
            'email' => 'algo@algo.com',
            'email_verified_at' => now(),
            'password' => bcrypt('1234'),
        ]);

        User::create([
            'name' => 'veterinarioPrueba1',
            'email' => 'vp1@vp1.com',
            'email_verified_at' => now(),
            'password' => bcrypt('1234'),
        ]);

        User::create([
            'name' => 'veterinarioPrueba2',
            'email' => 'vp2@vp2.com',
            'email_verified_at' => now(),
            'password' => bcrypt('1234'),
        ]);

        User::create([
            'name' => 'veterinarioPrueba3',
            'email' => 'vp3@vp3.com',
            'email_verified_at' => now(),
            'password' => bcrypt('1234'),
        ]);

        User::create([
            'name' => 'veterinarioPrueba4',
            'email' => 'vp4@vp4.com',
            'email_verified_at' => now(),
            'password' => bcrypt('1234'),
        ]);

        User::create([
            'name' => 'María Recepción',
            'email' => 'recepcion@recepcion.com',
            'email_verified_at' => now(),
            'password' => bcrypt('1234'),
        ]);

        User::create([
            'name' => 'registrado',
            'email' => 'reg@reg.com',
            'email_verified_at' => now(),
            'password' => bcrypt('1234'),
        ]);
    }
}
