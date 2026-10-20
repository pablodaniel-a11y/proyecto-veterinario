<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MascotaController;
use App\Http\Controllers\VeterinarioController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth'/*, 'verified'*/])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource('mascotas', MascotaController::class);
    Route::resource('veterinarios', VeterinarioController::class);
});

require __DIR__.'/settings.php';
