<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MascotaController;
use App\Http\Controllers\VeterinarioController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ConsultaController;
use App\Http\Controllers\CitaController;

Route::inertia('/', 'welcome')->name('home');
Route::get('/citas/create', [CitaController::class, 'create'])->name('citas.create');
Route::post('/citas', [CitaController::class, 'store'])->name('citas.store');

Route::middleware(['auth'/*, 'verified'*/])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource('mascotas', MascotaController::class);
    Route::resource('veterinarios', VeterinarioController::class);
    Route::resource('productos', ProductoController::class);
    Route::resource('consultas', ConsultaController::class);
    
    Route::get('/citas', [CitaController::class, 'index'])->name('citas.index');
    Route::get('/citas/admin', [CitaController::class, 'indexcitas'])->name('citas.index.admin');
    Route::get('/citas/{cita}/edit', [CitaController::class, 'edit'])->name('citas.edit');
    Route::put('/citas/{cita}', [CitaController::class, 'update'])->name('citas.update');
    
    Route::get('/mascotas/{mascota}/consultas', [ConsultaController::class, 'indexpormascota'])->name('mascota.consultas');
    Route::get('/mascotas/{mascota}/consultas/create', [ConsultaController::class, 'createindividual'])->name('mascotas.consultas.create');
    Route::post('/mascotas/{mascota}/consultas', [ConsultaController::class, 'store'])->name('mascotas.consultas.store');
    Route::get('/veterinario/consultas', [ConsultaController::class, 'indexdelveterinario'])->name('veterinario.consultas.index');
    Route::get('/veterinario/consultas/{consulta}/edit', [ConsultaController::class, 'edit'])->name('veterinario.consultas.edit');
    Route::put('/veterinario/consultas/{consulta}', [ConsultaController::class, 'update'])->name('veterinario.consultas.update');
});

require __DIR__.'/settings.php';
