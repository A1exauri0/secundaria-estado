<?php

namespace Database\Seeders;

use App\Models\Alumno;
use App\Models\Maestro;
use App\Models\Tutor;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EscolarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Crear usuario administrador de prueba si no existe
        User::firstOrCreate(
            ['email' => 'admin@secundaria.edu.mx'],
            [
                'name' => 'Director Escolar',
                'password' => Hash::make('password'),
            ]
        );

        // 2. Crear Tutores
        $tutor1 = Tutor::create([
            'nombre' => 'Carlos',
            'apellido_paterno' => 'Ramírez',
            'apellido_materno' => 'Hernández',
            'parentesco_predeterminado' => 'Padre',
            'telefono' => '5512345678',
            'telefono_secundario' => '5587654321',
            'correo' => 'carlos.ramirez@gmail.com',
            'direccion' => 'Av. Independencia #123, Col. Centro',
            'ocupacion' => 'Ingeniero Civil',
        ]);

        $tutor2 = Tutor::create([
            'nombre' => 'María Elena',
            'apellido_paterno' => 'Gómez',
            'apellido_materno' => 'Vázquez',
            'parentesco_predeterminado' => 'Madre',
            'telefono' => '5598765432',
            'telefono_secundario' => null,
            'correo' => 'elena.gomez@hotmail.com',
            'direccion' => 'Calle Benito Juárez #45, Col. Reforma',
            'ocupacion' => 'Contadora',
        ]);

        $tutor3 = Tutor::create([
            'nombre' => 'Roberto',
            'apellido_paterno' => 'López',
            'apellido_materno' => 'Castillo',
            'parentesco_predeterminado' => 'Tutor Legal',
            'telefono' => '5544332211',
            'telefono_secundario' => '5533221100',
            'correo' => 'roberto.lopez@outlook.com',
            'direccion' => 'Cda. de los Pinos #12, Col. Arboledas',
            'ocupacion' => 'Comerciante',
        ]);

        $tutor4 = Tutor::create([
            'nombre' => 'Patricia',
            'apellido_paterno' => 'Flores',
            'apellido_materno' => 'Morales',
            'parentesco_predeterminado' => 'Madre',
            'telefono' => '5566778899',
            'telefono_secundario' => null,
            'correo' => 'patricia.flores@yahoo.com',
            'direccion' => 'Calle 5 de Mayo #88, Col. San Juan',
            'ocupacion' => 'Docente Primaria',
        ]);

        // 3. Crear Alumnos y vincular con Tutores
        $alumno1 = Alumno::create([
            'matricula' => 'SEC2026-001',
            'nombre' => 'Alejandro',
            'apellido_paterno' => 'Ramírez',
            'apellido_materno' => 'Gómez',
            'curp' => 'RAGA120515HMCNRN01',
            'fecha_nacimiento' => '2012-05-15',
            'sexo' => 'M',
            'direccion' => 'Av. Independencia #123, Col. Centro',
            'telefono' => '5512345678',
            'correo_institucional' => 'alejandro.ramirez@secundaria.edu.mx',
            'grado' => '1°',
            'grupo' => 'A',
            'estatus' => 'activo',
        ]);
        $alumno1->tutores()->attach([
            $tutor1->id => ['parentesco' => 'Padre', 'es_contacto_principal' => true],
            $tutor2->id => ['parentesco' => 'Madre', 'es_contacto_principal' => false],
        ]);

        $alumno2 = Alumno::create([
            'matricula' => 'SEC2026-002',
            'nombre' => 'Sofía',
            'apellido_paterno' => 'Ramírez',
            'apellido_materno' => 'Gómez',
            'curp' => 'RAGS100820MMCNRN02',
            'fecha_nacimiento' => '2010-08-20',
            'sexo' => 'F',
            'direccion' => 'Av. Independencia #123, Col. Centro',
            'telefono' => '5512345678',
            'correo_institucional' => 'sofia.ramirez@secundaria.edu.mx',
            'grado' => '3°',
            'grupo' => 'B',
            'estatus' => 'activo',
        ]);
        // Demostración de hermanos con los mismos tutores
        $alumno2->tutores()->attach([
            $tutor1->id => ['parentesco' => 'Padre', 'es_contacto_principal' => true],
            $tutor2->id => ['parentesco' => 'Madre', 'es_contacto_principal' => false],
        ]);

        $alumno3 = Alumno::create([
            'matricula' => 'SEC2026-003',
            'nombre' => 'Mateo',
            'apellido_paterno' => 'López',
            'apellido_materno' => 'Ortiz',
            'curp' => 'LOOM110310HMCNRN03',
            'fecha_nacimiento' => '2011-03-10',
            'sexo' => 'M',
            'direccion' => 'Cda. de los Pinos #12, Col. Arboledas',
            'telefono' => '5544332211',
            'correo_institucional' => 'mateo.lopez@secundaria.edu.mx',
            'grado' => '2°',
            'grupo' => 'A',
            'estatus' => 'activo',
        ]);
        $alumno3->tutores()->attach([
            $tutor3->id => ['parentesco' => 'Tutor Legal', 'es_contacto_principal' => true],
        ]);

        $alumno4 = Alumno::create([
            'matricula' => 'SEC2026-004',
            'nombre' => 'Valentina',
            'apellido_paterno' => 'Sánchez',
            'apellido_materno' => 'Flores',
            'curp' => 'SAFV111125MMCNRN04',
            'fecha_nacimiento' => '2011-11-25',
            'sexo' => 'F',
            'direccion' => 'Calle 5 de Mayo #88, Col. San Juan',
            'telefono' => '5566778899',
            'correo_institucional' => 'valentina.sanchez@secundaria.edu.mx',
            'grado' => '2°',
            'grupo' => 'B',
            'estatus' => 'activo',
        ]);
        $alumno4->tutores()->attach([
            $tutor4->id => ['parentesco' => 'Madre', 'es_contacto_principal' => true],
        ]);

        $alumno5 = Alumno::create([
            'matricula' => 'SEC2026-005',
            'nombre' => 'Emiliano',
            'apellido_paterno' => 'Torres',
            'apellido_materno' => 'Mendoza',
            'curp' => 'TOME090214HMCNRN05',
            'fecha_nacimiento' => '2009-02-14',
            'sexo' => 'M',
            'direccion' => 'Av. Universidad #450, Col. San Ángel',
            'telefono' => '5522334455',
            'correo_institucional' => 'emiliano.torres@secundaria.edu.mx',
            'grado' => '3°',
            'grupo' => 'A',
            'estatus' => 'egresado',
        ]);

        // 4. Crear Maestros y Personal
        Maestro::create([
            'nombre' => 'Guillermo',
            'apellido_paterno' => 'Martínez',
            'apellido_materno' => 'Salazar',
            'curp' => 'MASG780412HMCNRN01',
            'rfc' => 'MASG7804128A1',
            'telefono' => '5588990011',
            'correo' => 'guillermo.martinez@secundaria.edu.mx',
            'puesto' => 'Docente Titular de Matemáticas',
            'tipo_personal' => 'docente',
            'materias' => ['Matemáticas I', 'Matemáticas II', 'Matemáticas III'],
            'grupos' => ['1°A', '1°B', '2°A', '3°A'],
            'estatus' => 'activo',
        ]);

        Maestro::create([
            'nombre' => 'Ana Laura',
            'apellido_paterno' => 'Castillo',
            'apellido_materno' => 'Ríos',
            'curp' => 'CARA820919MMCNRN02',
            'rfc' => 'CARA8209199B2',
            'telefono' => '5577665544',
            'correo' => 'ana.castillo@secundaria.edu.mx',
            'puesto' => 'Docente de Ciencias y Biología',
            'tipo_personal' => 'docente',
            'materias' => ['Ciencias I (Biología)', 'Química', 'Física'],
            'grupos' => ['1°A', '2°B', '3°B'],
            'estatus' => 'activo',
        ]);

        Maestro::create([
            'nombre' => 'Fernando',
            'apellido_paterno' => 'Álvarez',
            'apellido_materno' => 'Paredes',
            'curp' => 'AAPF750630HMCNRN03',
            'rfc' => 'AAPF7506307C3',
            'telefono' => '5533445566',
            'correo' => 'fernando.alvarez@secundaria.edu.mx',
            'puesto' => 'Docente de Historia y Formación Cívica',
            'tipo_personal' => 'docente',
            'materias' => ['Historia de México', 'Formación Cívica y Ética'],
            'grupos' => ['2°A', '2°B', '3°A', '3°B'],
            'estatus' => 'activo',
        ]);

        Maestro::create([
            'nombre' => 'Laura Elena',
            'apellido_paterno' => 'Mendoza',
            'apellido_materno' => 'Cervantes',
            'curp' => 'MECL801105MMCNRN04',
            'rfc' => 'MECL8011054D4',
            'telefono' => '5544556677',
            'correo' => 'laura.mendoza@secundaria.edu.mx',
            'puesto' => 'Directora del Plantel',
            'tipo_personal' => 'directivo',
            'materias' => [],
            'grupos' => [],
            'estatus' => 'activo',
        ]);

        Maestro::create([
            'nombre' => 'Jorge',
            'apellido_paterno' => 'Estrada',
            'apellido_materno' => 'Nuñez',
            'curp' => 'EANJ850322HMCNRN05',
            'rfc' => 'EANJ8503226E5',
            'telefono' => '5522114433',
            'correo' => 'jorge.estrada@secundaria.edu.mx',
            'puesto' => 'Coordinador de Servicios Escolares',
            'tipo_personal' => 'administrativo',
            'materias' => [],
            'grupos' => [],
            'estatus' => 'activo',
        ]);
    }
}
