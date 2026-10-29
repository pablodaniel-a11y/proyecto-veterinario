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
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        Permission::create(['name' => 'listar usuarios']);
        Permission::create(['name' => 'listar roles']);
        Permission::create(['name' => 'listar permisos']);

        Permission::create(['name' => 'crear veterinario']);  
        Permission::create(['name' => 'editar veterinario']); 
        Permission::create(['name' => 'eliminar veterinario']);

        Permission::create(['name' => 'ver mascotas']);
        Permission::create(['name' => 'crear mascota']);
        Permission::create(['name' => 'editar mascota']);
        Permission::create(['name' => 'eliminar mascota']);

        Permission::create(['name' => 'ver consultas mascota']);
        Permission::create(['name' => 'ver consultas asignadas']);
        Permission::create(['name' => 'gestionar consultas']);
        Permission::create(['name' => 'crear consulta']);
        Permission::create(['name' => 'editar consulta']);
        Permission::create(['name' => 'eliminar consulta']);

        Permission::create(['name' => 'ver citas']);
        Permission::create(['name' => 'gestionar citas']);
        Permission::create(['name' => 'editar cita']);
        Permission::create(['name' => 'eliminar cita']); 

        Permission::create(['name' => 'crear producto']);
        Permission::create(['name' => 'eliminar producto']);
        Permission::create(['name' => 'editar producto']);

        $roleSuperAdmin = Role::create(['name' => 'super-admin']); 
        $roleAdmin      = Role::create(['name' => 'admin']); 
        $roleVeterinario= Role::create(['name' => 'veterinario']);
        $roleRecepcionista = Role::create(['name' => 'recepcionista']);
        $roleRegistrado = Role::create(['name' => 'registrado']);

        $roleSuperAdmin->givePermissionTo(Permission::all());

        $roleAdmin->givePermissionTo([
            'crear veterinario',
            'editar veterinario',
            'eliminar veterinario',
            'ver mascotas',
            'crear mascota',
            'editar mascota',
            'eliminar mascota',
            'ver consultas mascota',
            'crear consulta',
            'editar consulta',
            'eliminar consulta',
            'ver citas',
            'editar cita',
            'eliminar cita',
            'gestionar citas',
            'crear producto',
            'editar producto',
            'eliminar producto'
        ]);
        
        $roleVeterinario->givePermissionTo([
            'ver mascotas',
            'crear mascota',
            'editar mascota',
            'eliminar mascota',
            'ver consultas mascota',
            'ver consultas asignadas',
            'crear consulta',
            'editar consulta',
            'eliminar consulta',
            'gestionar consultas',
            'editar veterinario',
            'ver citas',
        ]);

        $roleRecepcionista->givePermissionTo([
            'ver mascotas',
            'crear mascota',
            'editar mascota',
            'eliminar mascota',
            'ver consultas mascota',
            'crear consulta',
            'ver citas',
            'gestionar citas',
            'editar cita',
            'eliminar cita'
        ]);

        $roleRegistrado->givePermissionTo([
            'ver mascotas',
            'crear mascota',
            'editar mascota',
            'eliminar mascota',
            'ver consultas mascota',
            'crear consulta',
            'ver citas'
        ]);

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

        $registradoUser = User::firstOrCreate(
            ['email' => 'reg@reg.com'],
            [
                'name' => 'registrado',
                'email_verified_at' => now(),
                'password' => bcrypt('1234'),
            ]
        );
        $registradoUser->assignRole($roleRegistrado);

    }
}
