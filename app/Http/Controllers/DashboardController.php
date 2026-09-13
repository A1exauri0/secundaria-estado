<?php

namespace App\Http\Controllers;

// Importaciones de Modelos
use App\Models\Alumno;
use App\Models\Maestro;
use App\Models\Tutor;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Muestra el panel principal del sistema escolar con estadísticas y resúmenes.
     */
    public function index(): Response
    {
        // Métricas generales
        $totalAlumnos = Alumno::count();
        $alumnosActivos = Alumno::where('estatus', 'activo')->count();
        $totalMaestros = Maestro::count();
        $totalDocentes = Maestro::where('tipo_personal', 'docente')->count();
        $totalTutores = Tutor::count();

        // Distribución de alumnos por grado
        $alumnosPorGrado = [
            'primer_grado' => Alumno::where('grado', '1°')->where('estatus', 'activo')->count(),
            'segundo_grado' => Alumno::where('grado', '2°')->where('estatus', 'activo')->count(),
            'tercer_grado' => Alumno::where('grado', '3°')->where('estatus', 'activo')->count(),
        ];

        // Distribución por sexo
        $alumnosPorSexo = [
            'hombres' => Alumno::where('sexo', 'M')->where('estatus', 'activo')->count(),
            'mujeres' => Alumno::where('sexo', 'F')->where('estatus', 'activo')->count(),
        ];

        // Últimos alumnos registrados
        $ultimosAlumnos = Alumno::with('tutores')
            ->latest()
            ->take(5)
            ->get();

        // Últimos maestros registrados
        $ultimosMaestros = Maestro::latest()
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'estadisticas' => [
                'totalAlumnos' => $totalAlumnos,
                'alumnosActivos' => $alumnosActivos,
                'totalMaestros' => $totalMaestros,
                'totalDocentes' => $totalDocentes,
                'totalTutores' => $totalTutores,
                'alumnosPorGrado' => $alumnosPorGrado,
                'alumnosPorSexo' => $alumnosPorSexo,
            ],
            'ultimosAlumnos' => $ultimosAlumnos,
            'ultimosMaestros' => $ultimosMaestros,
        ]);
    }
}
