<?php

namespace App\Http\Controllers;

use App\Models\Proyecto;
use App\Models\Cliente;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProyectoController extends Controller
{
    // LISTAR
    public function index()
    {
        return Inertia::render('Proyectos/Index', [
            'proyectos' => Proyecto::with('cliente')->get(),
        ]);
    }

    // FORM CREAR
    public function create()
    {
        return Inertia::render('Proyectos/Create', [
            'clientes' => Cliente::all(),
        ]);
    }

    // GUARDAR
    public function store(Request $request)
{
    $validated = $request->validate([
        'cliente_id' => 'required|exists:clientes,id',
        'name' => 'required|string|max:150',
        'description' => 'nullable|string',
        'status' => 'required|in:pendiente,en_progreso,completado,cancelado',
        'start_date' => 'nullable|date',
        'end_date' => 'nullable|date|after_or_equal:start_date',
    ]);

    $proyecto = Proyecto::create($validated);

    return redirect()->route('proyectos.index')
                     ->with('success', 'Proyecto creado correctamente.');
}

    // FORM EDITAR
    public function edit(Proyecto $proyecto)
    {
        return Inertia::render('Proyectos/Edit', [
            'proyecto' => $proyecto,
            'clientes' => Cliente::all(),
        ]);
    }

    // ACTUALIZAR
    public function update(Request $request, Proyecto $proyecto)
    {
        $validated = $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'status' => 'required|in:pendiente,en_progreso,completado,cancelado',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $proyecto->update($validated);

        // Solo redirigir a Inertia, sin JSON
        return redirect()->route('proyectos.index')
            ->with('success', 'Proyecto actualizado correctamente.');
    }


    // ELIMINAR
    public function destroy(Proyecto $proyecto)
    {
        $proyecto->delete();

        // Redirige a la lista de proyectos con un flash message
        return redirect()->route('proyectos.index')
            ->with('success', 'Proyecto eliminado correctamente.');
    }

}