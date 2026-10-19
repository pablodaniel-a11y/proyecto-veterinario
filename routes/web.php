<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MascotaController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth'/*, 'verified'*/])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource('mascotas', MascotaController::class);
});

require __DIR__.'/settings.php';
