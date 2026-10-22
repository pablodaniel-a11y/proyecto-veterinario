<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Veterinario;
use App\Models\User;

class VeterinarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $veterinarioPrueba = User::where('email', 'algo2@algo2.com')->firstOrFail();

        Veterinario::create([
            'user_id' => $veterinarioPrueba->id,
            'telefono' => '387123456',
            'matricula' => 1234,
            'especialidad' => 'Clínica General',
        ]);
    
        Veterinario::factory()->count(6)->create();
    }
}
