<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        /*
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        */

        $this->call([
            EspecieSeeder::class,
            RazaSeeder::class,
            UserSeeder::class,
            ClienteSeeder::class,
            MascotaSeeder::class,
            VeterinarioSeeder::class,
            ProductoSeeder::class, //aca van los seeder en orden
        ]);
    }
}
