<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TareaController;
use App\Http\Controllers\ProyectoController;
use App\Http\Controllers\ActividadController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Clientes
    Route::resource('clientes', ClienteController::class);
    Route::get('/clientes/ajax/list', [ClienteController::class, 'ajaxList'])->name('clientes.ajax.list');

    // Users
    Route::resource('users', UserController::class);
    Route::get('/users/ajax/list', [UserController::class, 'ajaxList'])->name('users.ajax.list');

    // API para Dashboard modal

    // Vistas de Tareas & Proyectos
    Route::resource('tareas', TareaController::class);

    Route::get('/proyectos', [ProyectoController::class, 'index'])->name('proyectos.index');
    Route::resource('proyectos', ProyectoController::class);
    // Actividads
    Route::resource('actividads', ActividadController::class);
    Route::get('actividads/ajax/list', [ActividadController::class, 'ajaxList'])->name('actividads.ajaxList');

});

Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('login', [LoginController::class, 'login']);
require __DIR__.'/auth.php';