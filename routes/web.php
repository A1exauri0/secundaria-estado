<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MaestroController;
use App\Http\Controllers\TutorController;

Route::get('/', function () {
    return redirect()->route('dashboard');
})->name('home');

Route::middleware(['auth'])->group(function () {
    // Panel Principal (Dashboard)
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Módulos CRUD Escolares
    Route::resource('alumnos', AlumnoController::class)->except(['create', 'edit', 'show']);
    Route::resource('maestros', MaestroController::class)->except(['create', 'edit', 'show']);
    Route::resource('tutores', TutorController::class)->except(['create', 'edit', 'show']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
