@component('mail::message')
Hola {{ $user->name }},

Tu código para restablecer contraseña es:

## {{ $code }}

Este código expira en 15 minutos.

Si no solicitaste este código, ignora este email.

Saludos,<br>
**ZYKRON**
@endcomponent