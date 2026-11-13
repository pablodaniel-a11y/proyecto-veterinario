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
        $veterinarioPrueba1 = User::where('email', 'vp1@vp1.com')->firstOrFail();
        $veterinarioPrueba2 = User::where('email', 'vp2@vp2.com')->firstOrFail();
        $veterinarioPrueba3 = User::where('email', 'vp3@vp3.com')->firstOrFail();
        $veterinarioPrueba4 = User::where('email', 'vp4@vp4.com')->firstOrFail();

        Veterinario::create([
            'user_id' => $veterinarioPrueba1->id,
            'telefono' => '387123456',
            'matricula' => 1234,
            'especialidad' => 'Clínica General',
        ]);

        Veterinario::create([
            'user_id' => $veterinarioPrueba2->id,
            'telefono' => '387123466',
            'matricula' => 2341,
            'especialidad' => 'Dermatología',
        ]);

        Veterinario::create([
            'user_id' => $veterinarioPrueba3->id,
            'telefono' => '387123777',
            'matricula' => 2233,
            'especialidad' => 'Cirugía',
        ]);

        Veterinario::create([
            'user_id' => $veterinarioPrueba4->id,
            'telefono' => '387123778',
            'matricula' => 2443,
            'especialidad' => 'Cirugía',
        ]);
    
        Veterinario::factory()->count(6)->create();
    }
}
