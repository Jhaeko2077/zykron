<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

class ClienteController extends Controller
{
    public function ajaxList(Request $request)
    {
        $search = $request->search ?? '';

        $clientes = Cliente::where('company_name', 'LIKE', "%{$search}%")
            ->orWhere('contact_name', 'LIKE', "%{$search}%")
            ->orWhere('email', 'LIKE', "%{$search}%")
            ->orWhere('phone', 'LIKE', "%{$search}%")
            ->orWhere('address', 'LIKE', "%{$search}%")
            ->get();

        return response()->json([
            "data" => $clientes,
            "current_page" => 1,
            "last_page" => 1,
        ]);
    }

    public function index(Request $request): Response
    {
        // Obtener todos los clientes como array, no paginado
        $clientes = Cliente::all();

        // Formatear datos para gráficos
        $empresas = [];
        foreach ($clientes as $cliente) {
            $empresa = $cliente->company_name ?? 'Sin empresa';
            if (!isset($empresas[$empresa])) {
                $empresas[$empresa] = 0;
            }
            $empresas[$empresa]++;
        }

        return Inertia::render('Clientes/Index', [
            'clientes' => $clientes,
            'meses' => [],
            'cantidadClientes' => [],
            'empresas' => $empresas,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Clientes/Create');
    }

    public function store(Request $request)
    {
        Cliente::create($request->only([
            'company_name',
            'contact_name',
            'email',
            'phone',
            'address',
        ]));

        return Redirect::route('clientes.index');
    }

    public function edit($id): Response
    {
        $cliente = Cliente::findOrFail($id);
        return Inertia::render('Clientes/Edit', [
            'cliente' => $cliente
        ]);
    }

    public function update(Request $request, $id)
    {
        $cliente = Cliente::findOrFail($id);
        $cliente->update($request->all());

        return Redirect::route('clientes.index');
    }

    public function destroy($id)
    {
        Cliente::destroy($id);
        return Redirect::route('clientes.index');
    }
}