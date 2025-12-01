<?php

namespace App\Http\Controllers;

use App\Models\Tarea;
use App\Models\User;
use App\Models\Proyecto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TareaController extends Controller
{
    // LISTAR
    public function index()
    {
        return Inertia::render('Tareas/Index', [
            'tareas' => Tarea::with(['proyecto', 'assignedUser'])->get(),
        ]);
    }

    // FORM CREAR
    public function create()
    {
        return Inertia::render('Tareas/Create', [
            'users' => User::all(),
            'proyectos' => Proyecto::all(),
        ]);
    }

    // GUARDAR
    public function store(Request $request)
    {
        $validated = $request->validate([
            'proyecto_id' => 'required|exists:proyectos,id',
            'assigned_to' => 'nullable|exists:users,id',
            'title' => 'required|string|max:150',
            'details' => 'nullable|string',
            'status' => 'required|in:pendiente,en_progreso,finalizado',
            'due_date' => 'nullable|date',
        ]);

        Tarea::create($validated);

        return redirect()->route('tareas.index')
            ->with('success', 'Tarea creada correctamente.');
    }

    // FORM EDITAR
    public function edit(Tarea $tarea)
    {
        return Inertia::render('Tareas/Edit', [
            'tarea' => $tarea,
            'users' => User::all(),
            'proyectos' => Proyecto::all(),
        ]);
    }

    // ACTUALIZAR
    public function update(Request $request, Tarea $tarea)
    {
        $validated = $request->validate([
            'proyecto_id' => 'required|exists:proyectos,id',
            'assigned_to' => 'nullable|exists:users,id',
            'title' => 'required|string|max:150',
            'details' => 'nullable|string',
            'status' => 'required|in:pendiente,en_progreso,finalizado',
            'due_date' => 'nullable|date',
        ]);

        $tarea->update($validated);

        return redirect()->route('tareas.index')
            ->with('success', 'Tarea actualizada.');
    }

    // ELIMINAR
    public function destroy(Tarea $tarea)
    {
        $tarea->delete();

        return redirect()->route('tareas.index')
            ->with('success', 'Tarea eliminada.');
    }
}