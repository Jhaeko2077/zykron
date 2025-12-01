<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProyectoController;
use App\Http\Controllers\TareaController;
use App\Http\Controllers\ActividadController;

Route::middleware('auth')->group(function () {
    // Proyectos
    Route::post('/proyectos', [ProyectoController::class, 'store']);
    Route::put('/proyectos/{proyecto}', [ProyectoController::class, 'update']);
    Route::delete('/proyectos/{proyecto}', [ProyectoController::class, 'destroy']);

    // Tareas
    Route::post('/tareas', [TareaController::class, 'store']);
    Route::put('/tareas/{tarea}', [TareaController::class, 'update']);
    Route::delete('/tareas/{tarea}', [TareaController::class, 'destroy']);

    // Actividades
    Route::post('/actividads', [ActividadController::class, 'store']);
    Route::put('/actividads/{actividad}', [ActividadController::class, 'update']);
    Route::delete('/actividads/{actividad}', [ActividadController::class, 'destroy']);
});