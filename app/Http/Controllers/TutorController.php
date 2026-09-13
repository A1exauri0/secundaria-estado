<?php

namespace App\Http\Controllers;

// Importaciones de Modelos y Requests
use App\Http\Requests\TutorRequest;
use App\Models\Alumno;
use App\Models\Tutor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TutorController extends Controller
{
    /**
     * Muestra la lista de tutores con sus alumnos vinculados.
     */
    public function index(Request $request): Response
    {
        // Parámetros de filtrado
        $busqueda = $request->input('busqueda');
        $parentesco = $request->input('parentesco');

        $query = Tutor::with(['alumnos'])->latest();

        // Filtro por búsqueda de texto
        if (!empty($busqueda)) {
            $query->where(function ($q) use ($busqueda) {
                $q->where('nombre', 'like', "%{$busqueda}%")
                    ->orWhere('apellido_paterno', 'like', "%{$busqueda}%")
                    ->orWhere('apellido_materno', 'like', "%{$busqueda}%")
                    ->orWhere('telefono', 'like', "%{$busqueda}%")
                    ->orWhere('correo', 'like', "%{$busqueda}%")
                    ->orWhere('ocupacion', 'like', "%{$busqueda}%");
            });
        }

        // Filtro por parentesco
        if (!empty($parentesco)) {
            $query->where('parentesco_predeterminado', $parentesco);
        }

        $tutores = $query->paginate(10)->withQueryString();

        // Catálogo de alumnos para vinculación
        $listaAlumnos = Alumno::select('id', 'matricula', 'nombre', 'apellido_paterno', 'apellido_materno', 'grado', 'grupo')
            ->orderBy('apellido_paterno')
            ->get();

        // Estadísticas de tutores
        $estadisticas = [
            'total' => Tutor::count(),
            'con_alumnos' => Tutor::has('alumnos')->count(),
            'sin_alumnos' => Tutor::doesntHave('alumnos')->count(),
        ];

        return Inertia::render('tutores/index', [
            'tutores' => $tutores,
            'listaAlumnos' => $listaAlumnos,
            'filtros' => [
                'busqueda' => $busqueda,
                'parentesco' => $parentesco,
            ],
            'estadisticas' => $estadisticas,
        ]);
    }

    /**
     * Almacena un nuevo tutor en la base de datos.
     */
    public function store(TutorRequest $request): RedirectResponse
    {
        $datosValidados = $request->validated();
        $alumnosIds = $datosValidados['alumnos_ids'] ?? [];
        unset($datosValidados['alumnos_ids']);

        $tutor = Tutor::create($datosValidados);

        if (!empty($alumnosIds)) {
            $tutor->alumnos()->sync($alumnosIds);
        }

        return redirect()->route('tutores.index')->with('success', 'Tutor registrado exitosamente.');
    }

    /**
     * Actualiza la información del tutor especificado.
     */
    public function update(TutorRequest $request, Tutor $tutor): RedirectResponse
    {
        $datosValidados = $request->validated();
        $alumnosIds = $datosValidados['alumnos_ids'] ?? [];
        unset($datosValidados['alumnos_ids']);

        $tutor->update($datosValidados);

        if (isset($request->alumnos_ids)) {
            $tutor->alumnos()->sync($alumnosIds);
        }

        return redirect()->route('tutores.index')->with('success', 'Información del tutor actualizada correctamente.');
    }

    /**
     * Elimina el tutor de la base de datos.
     */
    public function destroy(Tutor $tutor): RedirectResponse
    {
        $tutor->alumnos()->detach();
        $tutor->delete();

        return redirect()->route('tutores.index')->with('success', 'Tutor eliminado correctamente.');
    }
}
