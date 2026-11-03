<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MascotaController;
use App\Http\Controllers\VeterinarioController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ConsultaController;
use App\Http\Controllers\CitaController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;

Route::inertia('/', 'welcome')->name('home');

Route::get('/veterinarios', [VeterinarioController::class, 'index'])->name('veterinarios.index');
Route::get('/productos', [ProductoController::class, 'index'])->name('productos.index');

Route::get('/citas/create', [CitaController::class, 'create'])->name('citas.create');
Route::post('/citas', [CitaController::class, 'store'])->name('citas.store');

Route::middleware(['auth'/*, 'verified'*/])->group(function () {
    //Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    Route::resource('mascotas', MascotaController::class);
    Route::resource('veterinarios', VeterinarioController::class)->except(['index']);;
    Route::resource('productos', ProductoController::class)->except(['index']);
    Route::resource('consultas', ConsultaController::class);
    
    Route::get('/citas', [CitaController::class, 'index'])->name('citas.index');
    Route::get('/citas/admin', [CitaController::class, 'indexcitas'])->name('citas.index.admin');
    Route::get('/citas/admin/list', [CitaController::class, 'list_citas'])->name('citas.list');
    Route::get('/citas/{cita}/edit', [CitaController::class, 'edit'])->name('citas.edit');
    Route::put('/citas/{cita}', [CitaController::class, 'update'])->name('citas.update');
    
    Route::get('/mascotas/{mascota}/consultas', [ConsultaController::class, 'indexpormascota'])->name('mascota.consultas');
    Route::get('/mascotas/{mascota}/consultas/create', [ConsultaController::class, 'createindividual'])->name('mascotas.consultas.create');
    Route::post('/mascotas/{mascota}/consultas', [ConsultaController::class, 'store'])->name('mascotas.consultas.store');
    Route::get('/veterinario/consultas', [ConsultaController::class, 'indexdelveterinario'])->name('veterinario.consultas.index');
    Route::get('/veterinario/consultas/exportar-excel', [ConsultaController::class, 'export'])->name('veterinario.consultas.excel');
    Route::get('/veterinario/consultas/{consulta}/edit', [ConsultaController::class, 'edit'])->name('veterinario.consultas.edit');
    Route::put('/veterinario/consultas/{consulta}', [ConsultaController::class, 'update'])->name('veterinario.consultas.update');

    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class); 
    Route::resource('permissions', PermissionController::class)->except(['show', 'edit', 'create']);
});

require __DIR__.'/settings.php';
