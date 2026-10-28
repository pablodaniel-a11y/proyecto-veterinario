<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User; 
use Spatie\Permission\Models\Permission; 
use Spatie\Permission\Models\Role; 

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Limpiar la caché de los permisos de Spatie
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        Permission::create(['name' => 'crear veterinario']);  
        Permission::create(['name' => 'editar veterinario']); 
        Permission::create(['name' => 'eliminar veterinario']);

        Permission::create(['name' => 'ver mascotas']);

        Permission::create(['name' => 'ver consultas']);
        Permission::create(['name' => 'gestionar consultas']);

        Permission::create(['name' => 'ver citas']);
        Permission::create(['name' => 'gestionar citas']); 

        Permission::create(['name' => 'crear producto']);
        Permission::create(['name' => 'eliminar producto']);
        Permission::create(['name' => 'editar producto']);

        $roleSuperAdmin = Role::create(['name' => 'super-admin']); 
        $roleAdmin      = Role::create(['name' => 'admin']); 
        $roleVeterinario= Role::create(['name' => 'veterinario']);
        $roleRecepcionista = Role::create(['name' => 'recepcionista']);
        $roleVisitante = Role::create(['name' => 'visitante']);
        $roleRegistrado = Role::create(['name' => 'registrado']);

        $roleSuperAdmin->givePermissionTo(Permission::all()); 
        $roleAdmin->givePermissionTo(['crear veterinario', 'editar veterinario', 'eliminar veterinario', 'gestionar consultas', 'gestionar citas', 'crear producto', 'editar producto', 'eliminar producto']); 
        $roleVeterinario->givePermissionTo(['editar veterinario', 'gestionar consultas']); 
        $roleRecepcionista->givePermissionTo(['gestionar citas']);

        $superAdminUser = User::firstOrCreate( 
            ['email' => 'superadmin@superadmin.com'],
            [ 
                'name' => 'Tu Nombre',
                'email_verified_at' => now(),
                'password' => bcrypt('1234'),
            ] 
        );
        $superAdminUser->assignRole($roleSuperAdmin);

        $adminUser = User::firstOrCreate( 
            ['email' => 'algo@algo.com'], 
            [
                'name' => 'Prueba',
                'email_verified_at' => now(),
                'password' => bcrypt('1234'),
            ]
        ); 
        $adminUser->assignRole($roleAdmin);

        $veterinarioUser = User::firstOrCreate( 
            ['email' => 'algo2@algo2.com'], 
            [
                'name' => 'veterinarioPrueba',
                'email_verified_at' => now(),
                'password' => bcrypt('1234'),
            ] 
        ); 
        $veterinarioUser->assignRole($roleVeterinario);

        $recepcionUser = User::firstOrCreate( 
            ['email' => 'recepcion@recepcion.com'], 
            [ 
                'name' => 'María Recepción',
                'email_verified_at' => now(),
                'password' => bcrypt('1234'), 
            ] 
        ); 
        $recepcionUser->assignRole($roleRecepcionista);

    }
}
