<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Proyecto;
use Illuminate\Http\Request;

class ProyectoController extends Controller
{
    public function store(Request $request)
    {
        $proyecto = Proyecto::create([
            'name' => $request->name,
            'description' => $request->description,
            'cliente_id' => $request->cliente_id,
            'status' => $request->status ?? 'pendiente',
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);
        
        return response()->json($proyecto->load('cliente'), 201);
    }

    public function update(Request $request, Proyecto $proyecto)
    {
        $proyecto->update($request->all());
        return response()->json($proyecto->load('cliente'));
    }

    public function destroy(Proyecto $proyecto)
    {
        $proyecto->delete();
        return response()->json(null, 204);
    }
}