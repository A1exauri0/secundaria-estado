<?php

namespace App\Http\Controllers;

// Importaciones de Modelos y Requests
use App\Http\Requests\AlumnoRequest;
use App\Models\Alumno;
use App\Models\Tutor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AlumnoController extends Controller
{
    /**
     * Muestra la lista de alumnos con filtros y paginación.
     */
    public function index(Request $request): Response
    {
        // Parámetros de filtrado
        $busqueda = $request->input('busqueda');
        $grado = $request->input('grado');
        $grupo = $request->input('grupo');
        $estatus = $request->input('estatus');

        $query = Alumno::with(['tutores'])->latest();

        // Filtro por búsqueda de texto
        if (!empty($busqueda)) {
            $query->where(function ($q) use ($busqueda) {
                $q->where('nombre', 'like', "%{$busqueda}%")
                    ->orWhere('apellido_paterno', 'like', "%{$busqueda}%")
                    ->orWhere('apellido_materno', 'like', "%{$busqueda}%")
                    ->orWhere('matricula', 'like', "%{$busqueda}%")
                    ->orWhere('curp', 'like', "%{$busqueda}%");
            });
        }

        // Filtro por grado
        if (!empty($grado)) {
            $query->where('grado', $grado);
        }

        // Filtro por grupo
        if (!empty($grupo)) {
            $query->where('grupo', $grupo);
        }

        // Filtro por estatus
        if (!empty($estatus)) {
            $query->where('estatus', $estatus);
        }

        $alumnos = $query->paginate(10)->withQueryString();

        // Catálogo de tutores para asignación rápida en modal
        $listaTutores = Tutor::select('id', 'nombre', 'apellido_paterno', 'apellido_materno', 'telefono', 'parentesco_predeterminado')
            ->orderBy('apellido_paterno')
            ->get();

        // Estadísticas rápidas
        $estadisticas = [
            'total' => Alumno::count(),
            'activos' => Alumno::where('estatus', 'activo')->count(),
            'bajas' => Alumno::where('estatus', 'baja')->count(),
            'egresados' => Alumno::where('estatus', 'egresado')->count(),
        ];

        return Inertia::render('alumnos/index', [
            'alumnos' => $alumnos,
            'listaTutores' => $listaTutores,
            'filtros' => [
                'busqueda' => $busqueda,
                'grado' => $grado,
                'grupo' => $grupo,
                'estatus' => $estatus,
            ],
            'estadisticas' => $estadisticas,
        ]);
    }

    /**
     * Almacena un nuevo alumno en la base de datos.
     */
    public function store(AlumnoRequest $request): RedirectResponse
    {
        $datosValidados = $request->validated();
        $tutores = $datosValidados['tutores'] ?? [];
        unset($datosValidados['tutores']);

        $alumno = Alumno::create($datosValidados);

        // Asociar tutores si fueron seleccionados
        if (!empty($tutores)) {
            $sincronizacion = [];
            foreach ($tutores as $tutor) {
                $sincronizacion[$tutor['id']] = [
                    'parentesco' => $tutor['parentesco'] ?? 'Tutor',
                    'es_contacto_principal' => $tutor['es_contacto_principal'] ?? false,
                ];
            }
            $alumno->tutores()->sync($sincronizacion);
        }

        return redirect()->route('alumnos.index')->with('success', 'Alumno registrado exitosamente.');
    }

    /**
     * Actualiza la información del alumno especificado.
     */
    public function update(AlumnoRequest $request, Alumno $alumno): RedirectResponse
    {
        $datosValidados = $request->validated();
        $tutores = $datosValidados['tutores'] ?? [];
        unset($datosValidados['tutores']);

        $alumno->update($datosValidados);

        // Sincronizar tutores
        $sincronizacion = [];
        if (!empty($tutores)) {
            foreach ($tutores as $tutor) {
                $sincronizacion[$tutor['id']] = [
                    'parentesco' => $tutor['parentesco'] ?? 'Tutor',
                    'es_contacto_principal' => $tutor['es_contacto_principal'] ?? false,
                ];
            }
        }
        $alumno->tutores()->sync($sincronizacion);

        return redirect()->route('alumnos.index')->with('success', 'Información del alumno actualizada con éxito.');
    }

    /**
     * Elimina el alumno de la base de datos.
     */
    public function destroy(Alumno $alumno): RedirectResponse
    {
        $alumno->tutores()->detach();
        $alumno->delete();

        return redirect()->route('alumnos.index')->with('success', 'Alumno eliminado correctamente.');
    }
}
