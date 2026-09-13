<?php

namespace App\Http\Controllers;

// Importaciones de Modelos y Requests
use App\Http\Requests\MaestroRequest;
use App\Models\Maestro;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MaestroController extends Controller
{
    /**
     * Muestra la lista de maestros y personal escolar.
     */
    public function index(Request $request): Response
    {
        // Parámetros de filtrado
        $busqueda = $request->input('busqueda');
        $tipoPersonal = $request->input('tipo_personal');
        $estatus = $request->input('estatus');

        $query = Maestro::latest();

        // Filtro por búsqueda de texto
        if (!empty($busqueda)) {
            $query->where(function ($q) use ($busqueda) {
                $q->where('nombre', 'like', "%{$busqueda}%")
                    ->orWhere('apellido_paterno', 'like', "%{$busqueda}%")
                    ->orWhere('apellido_materno', 'like', "%{$busqueda}%")
                    ->orWhere('curp', 'like', "%{$busqueda}%")
                    ->orWhere('rfc', 'like', "%{$busqueda}%")
                    ->orWhere('correo', 'like', "%{$busqueda}%")
                    ->orWhere('puesto', 'like', "%{$busqueda}%");
            });
        }

        // Filtro por tipo de personal
        if (!empty($tipoPersonal)) {
            $query->where('tipo_personal', $tipoPersonal);
        }

        // Filtro por estatus
        if (!empty($estatus)) {
            $query->where('estatus', $estatus);
        }

        $maestros = $query->paginate(10)->withQueryString();

        // Estadísticas de personal
        $estadisticas = [
            'total' => Maestro::count(),
            'docentes' => Maestro::where('tipo_personal', 'docente')->count(),
            'administrativos' => Maestro::where('tipo_personal', 'administrativo')->count(),
            'directivos' => Maestro::where('tipo_personal', 'directivo')->count(),
        ];

        return Inertia::render('maestros/index', [
            'maestros' => $maestros,
            'filtros' => [
                'busqueda' => $busqueda,
                'tipo_personal' => $tipoPersonal,
                'estatus' => $estatus,
            ],
            'estadisticas' => $estadisticas,
        ]);
    }

    /**
     * Almacena un nuevo maestro o miembro del personal.
     */
    public function store(MaestroRequest $request): RedirectResponse
    {
        Maestro::create($request->validated());

        return redirect()->route('maestros.index')->with('success', 'Personal docente/administrativo registrado con éxito.');
    }

    /**
     * Actualiza la información del maestro.
     */
    public function update(MaestroRequest $request, Maestro $maestro): RedirectResponse
    {
        $maestro->update($request->validated());

        return redirect()->route('maestros.index')->with('success', 'Información del docente/personal actualizada.');
    }

    /**
     * Elimina el registro del maestro.
     */
    public function destroy(Maestro $maestro): RedirectResponse
    {
        $maestro->delete();

        return redirect()->route('maestros.index')->with('success', 'Registro del docente/personal eliminado.');
    }
}
