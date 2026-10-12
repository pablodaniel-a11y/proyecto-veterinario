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
            'name' => 'Prueba',
            'email' => 'algo@algo.com',
            'email_verified_at' => now(),
            'password' => bcrypt('1234'),
        ]);
    }
}
