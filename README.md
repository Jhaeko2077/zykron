# Zykron · Gestión de clientes, proyectos y tareas

Aplicación web para administrar la cartera de **clientes**, sus **proyectos**, las **tareas** asignadas a cada miembro del equipo y las **actividades** registradas sobre cada tarea.

![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Inertia](https://img.shields.io/badge/Inertia.js-2-9553E9)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-8.2-777BB4?logo=php&logoColor=white)

## Funcionalidades

- **Autenticación completa** (Laravel Breeze): registro, login, verificación de email, recuperación de contraseña y perfil.
- **Dashboard** con resumen general.
- **CRUD de clientes**: empresa, contacto y email.
- **CRUD de proyectos** vinculados a un cliente.
- **CRUD de tareas** vinculadas a un proyecto y asignadas a un usuario.
- **Registro de actividades** por tarea y usuario.
- **Gestión de usuarios**.
- Listados con carga asíncrona (endpoints `ajax/list`).

## Modelo de datos

```
Cliente 1 ── * Proyecto 1 ── * Tarea 1 ── * Actividad
                                 │               │
                                 └── asignada a ─┴── User
```

## Stack

| Capa | Tecnología |
|---|---|
| Backend | Laravel 12 · PHP 8.2 · Eloquent ORM |
| Frontend | React 18 · Inertia.js · Tailwind CSS · Vite |
| Base de datos | SQLite (por defecto) / MySQL |
| Tests | PHPUnit |

## Instalación

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm run dev        # en una terminal
php artisan serve  # en otra → http://localhost:8000
```

## Estructura

```
app/Http/Controllers/   Controladores (Cliente, Proyecto, Tarea, Actividad, User, Dashboard)
app/Models/             Modelos Eloquent
database/migrations/    Esquema de la base de datos
resources/js/Pages/     Vistas React (Index / Create / Edit / Destroy por módulo)
routes/web.php          Rutas protegidas por autenticación
```
