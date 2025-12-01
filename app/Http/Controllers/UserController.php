<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

class UserController extends Controller
{
    public function ajaxList(Request $request)
    {
        $search = $request->search ?? '';

        $users = User::where('name', 'LIKE', "%{$search}%")
            ->orWhere('last_name', 'LIKE', "%{$search}%")
            ->orWhere('username', 'LIKE', "%{$search}%")
            ->orWhere('email', 'LIKE', "%{$search}%")
            ->orWhere('phone', 'LIKE', "%{$search}%")
            ->orWhere('address', 'LIKE', "%{$search}%")
            ->orWhere('area', 'LIKE', "%{$search}%")
            ->get();

        return response()->json([
            "data" => $users,
            "current_page" => 1,
            "last_page" => 1,
        ]);
    }

    public function index(): Response
    {
        $users = User::all();

        // Formatear datos para gráficos
        $areas = [];
        foreach ($users as $user) {
            $area = $user->area ?? 'Sin área';
            if (!isset($areas[$area])) {
                $areas[$area] = 0;
            }
            $areas[$area]++;
        }

        return Inertia::render('Users/Index', [
            'users' => $users,
            'meses' => [],
            'cantidadUsers' => [],
            'areas' => $areas,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Users/Create');
    }

    public function store(Request $request)
    {
        User::create([
            'name'      => $request->name,
            'last_name' => $request->last_name,
            'username'  => $request->username,
            'email'     => $request->email,
            'phone'     => $request->phone,
            'password'  => Hash::make($request->password),
            'address'   => $request->address,
            'area'      => $request->area,
        ]);

        return Redirect::route('users.index');
    }

    public function edit($id): Response
    {
        $user = User::findOrFail($id);
        return Inertia::render('Users/Edit', [
            'user' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return Redirect::route('users.index');
    }

    public function destroy($id)
    {
        User::destroy($id);
        return Redirect::route('users.index');
    }
}