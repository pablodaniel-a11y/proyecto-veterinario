<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MascotaController;
use App\Http\Controllers\VeterinarioController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ConsultaController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth'/*, 'verified'*/])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource('mascotas', MascotaController::class);
    Route::resource('veterinarios', VeterinarioController::class);
    Route::resource('productos', ProductoController::class);
    Route::resource('consultas', ConsultaController::class);
    Route::get('/mascotas/{mascota}/consultas', [ConsultaController::class, 'indexpormascota'])->name('mascota.consultas');
    Route::get('/mascotas/{mascota}/consultas/create', [ConsultaController::class, 'createindividual'])->name('mascotas.consultas.create');
    Route::post('/mascotas/{mascota}/consultas', [ConsultaController::class, 'store'])->name('mascotas.consultas.store');
    Route::get('/veterinario/consultas', [ConsultaController::class, 'indexdelveterinario'])->name('veterinario.consultas.index');
    Route::get('/veterinario/consultas/{consulta}/edit', [ConsultaController::class, 'edit'])->name('veterinario.consultas.edit');
    Route::put('/veterinario/consultas/{consulta}', [ConsultaController::class, 'update'])->name('veterinario.consultas.update');
});

require __DIR__.'/settings.php';
