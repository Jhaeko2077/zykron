<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class PasswordResetController extends Controller
{
    // Enviar código de reset por email
    public function sendCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $request->email)->first();
        
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Generar código de 6 dígitos
        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        
        // Guardar código con expiración de 15 minutos
        $user->update([
            'reset_code' => $code,
            'reset_code_expires_at' => now()->addMinutes(15),
        ]);

        // Enviar email
        Mail::send('emails.reset-code', ['code' => $code, 'user' => $user], function ($message) use ($user) {
            $message->to($user->email)
                    ->subject('Código de Restablecimiento de Contraseña - ZYKRON');
        });

        return response()->json(['message' => 'Código enviado al email']);
    }

    // Verificar código y restablecer contraseña
    public function resetWithCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'code' => 'required|string|size:6',
            'password' => 'required|confirmed|min:8',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || $user->reset_code !== $request->code) {
            return response()->json(['message' => 'Código inválido'], 422);
        }

        if ($user->reset_code_expires_at < now()) {
            return response()->json(['message' => 'Código expirado'], 422);
        }

        // Actualizar contraseña
        $user->update([
            'password' => Hash::make($request->password),
            'reset_code' => null,
            'reset_code_expires_at' => null,
        ]);

        return response()->json(['message' => 'Contraseña restablecida correctamente']);
    }
}