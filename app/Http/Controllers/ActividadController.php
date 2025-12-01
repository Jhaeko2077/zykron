<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Actividad;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Tarea;

class ActividadController extends Controller
{
    // ---- CARGAR VISTA PRINCIPAL ----
    public function index()
    {
        $actividads = Actividad::with(['user', 'tarea'])->latest()->get();
        return Inertia::render('Actividads/Index', [
            'actividads' => $actividads,
        ]);
    }

    // ---- LISTAR Y BUSCAR ACTIVIDADES (AJAX) ----
    public function ajaxList(Request $request)
    {
        $search = $request->search;

        $actividads = Actividad::with('user')
            ->when($search, function($query, $search) {
                $query->where('description', 'LIKE', "%{$search}%")
                      ->orWhereHas('user', function($q) use ($search) {
                          $q->where('name', 'LIKE', "%{$search}%");
                      });
            })
            ->latest()
            ->paginate(5);

        // Transformamos para frontend
        $actividads->getCollection()->transform(function ($actividad) {
            return [
                'id' => $actividad->id,
                'user_id' => $actividad->user_id,
                'user_name' => $actividad->user ? $actividad->user->name : 'Sin usuario',
                'tarea_id' => $actividad->tarea_id,
                'tarea_name' => $actividad->tarea ? $actividad->tarea->name : 'Sin tarea',
                'description' => $actividad->description,
                'due_date' => $actividad->due_date,
                'done' => $actividad->done,
            ];
        });
    

        return response()->json($actividads);
    }

    public function create()
    {
        return Inertia::render('Actividads/Create', [
            'users' => User::all(),
            'tareas' => Tarea::all(),
        ]);
    }


    // ---- CREAR ACTIVIDAD ----
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'tarea_id' => 'nullable|exists:tareas,id',
            'description' => 'required|string|max:255',
            'due_date' => 'nullable|date',
            'done' => 'boolean'
        ]);

        Actividad::create([
            'user_id' => $request->user_id,
            'tarea_id' => $request->tarea_id,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'done' => $request->done ?? false,
        ]);

        // 👇 Inertia redirect elegante
        return redirect()->route('actividads.index')->with('success', 'Actividad creada correctamente.');
    }


    // ---- EDITAR ACTIVIDAD ----

    // ---- ELIMINAR ACTIVIDAD ----
    public function destroy(Actividad $actividad)
    {
        $actividad->delete();
        return response()->json(null, 204);
    }

    public function edit($id)
{
    $actividad = Actividad::with(['user', 'tarea'])->findOrFail($id);

    return Inertia::render('Actividads/Edit', [
        'actividad' => $actividad,
        'users' => User::all(),
        'tareas' => Tarea::all(),
    ]);
}

    public function update(Request $request, $id)
{
    $request->validate([
        'user_id' => 'required|exists:users,id',
        'tarea_id' => 'required|exists:tareas,id',
        'description' => 'required|string|max:500',
        'due_date' => 'required|date',
        'done' => 'boolean'
    ]);

    $actividad = Actividad::findOrFail($id);

    $actividad->update([
        'user_id' => $request->user_id,
        'tarea_id' => $request->tarea_id,
        'description' => $request->description,
        'due_date' => $request->due_date,
        'done' => $request->done ?? false,
    ]);

    return redirect()->route('actividads.index');
}
}