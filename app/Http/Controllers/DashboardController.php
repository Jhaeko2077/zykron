<?php

namespace App\Http\Controllers;

use Inertia\Inertia; // IMPORTANTE
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard');
    }
}