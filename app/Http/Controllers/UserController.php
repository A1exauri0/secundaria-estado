<?php

namespace App\Http\Controllers;

// Importaciones de Modelos y Requests
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Controlador para la Gestión de Usuarios del Sistema
 * Escuela Secundaria del Estado — Turno Matutino
 */
class UserController extends Controller
{
    /**
     * Listado paginado de usuarios con filtros de búsqueda
     */
    public function index(Request $solicitud): Response
    {
        $consulta = User::query();

        // Filtro por término de búsqueda (Nombre, Correo, Teléfono)
        if ($solicitud->filled('busqueda')) {
            $termino = trim($solicitud->input('busqueda'));
            $consulta->where(function ($q) use ($termino) {
                $q->where('name', 'like', "%{$termino}%")
                    ->orWhere('email', 'like', "%{$termino}%")
                    ->orWhere('telefono', 'like', "%{$termino}%");
            });
        }

        // Filtro por Rol
        if ($solicitud->filled('rol')) {
            $consulta->where('rol', $solicitud->input('rol'));
        }

        // Filtro por Estatus
        if ($solicitud->filled('estatus')) {
            $consulta->where('estatus', $solicitud->input('estatus'));
        }

        // Paginación de resultados ordenados por fecha de creación
        $usuarios = $consulta->latest()
            ->paginate(10)
            ->withQueryString();

        // Estadísticas rápidas para métricas
        $estadisticas = [
            'total' => User::count(),
            'activos' => User::where('estatus', 'activo')->count(),
            'inactivos' => User::where('estatus', 'inactivo')->count(),
            'administradores' => User::where('rol', 'admin')->count(),
        ];

        return Inertia::render('usuarios/index', [
            'usuarios' => $usuarios,
            'filtros' => $solicitud->only(['busqueda', 'rol', 'estatus']),
            'estadisticas' => $estadisticas,
        ]);
    }

    /**
     * Registrar un nuevo usuario en la plataforma
     */
    public function store(UserRequest $solicitud): RedirectResponse
    {
        $datosValidados = $solicitud->validated();
        $datosValidados['password'] = Hash::make($datosValidados['password']);

        User::create($datosValidados);

        return redirect()->route('usuarios.index')->with('success', 'Usuario registrado exitosamente.');
    }

    /**
     * Actualizar la información de un usuario
     */
    public function update(UserRequest $solicitud, User $usuario): RedirectResponse
    {
        $datosValidados = $solicitud->validated();

        // Si no se proporcionó nueva contraseña, no sobreescribir la existente
        if (empty($datosValidados['password'])) {
            unset($datosValidados['password']);
        } else {
            $datosValidados['password'] = Hash::make($datosValidados['password']);
        }

        $usuario->update($datosValidados);

        return redirect()->route('usuarios.index')->with('success', 'Usuario actualizado exitosamente.');
    }

    /**
     * Eliminar un usuario del sistema (con protección de auto-eliminación)
     */
    public function destroy(User $usuario): RedirectResponse
    {
        // Evitar que el usuario en sesión se elimine a sí mismo
        if (Auth::id() === $usuario->id) {
            return redirect()->route('usuarios.index')->with('error', 'No puedes eliminar tu propia cuenta en sesión activa.');
        }

        $usuario->delete();

        return redirect()->route('usuarios.index')->with('success', 'Usuario eliminado exitosamente.');
    }
}
