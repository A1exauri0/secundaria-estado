<?php

namespace Tests\Feature;

use App\Models\Alumno;
use App\Models\Maestro;
use App\Models\Tutor;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EscolarCrudTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
    }

    public function test_usuario_autenticado_puede_ver_alumnos(): void
    {
        $usuario = User::first() ?? User::factory()->create();

        $response = $this->actingAs($usuario)->get('/alumnos');
        $response->assertStatus(200);
    }

    public function test_usuario_autenticado_puede_crear_alumno(): void
    {
        $usuario = User::first() ?? User::factory()->create();

        $response = $this->actingAs($usuario)->post('/alumnos', [
            'matricula' => 'TEST-2026-999',
            'nombre' => 'Juan',
            'apellido_paterno' => 'Pérez',
            'apellido_materno' => 'López',
            'curp' => 'PELJ110101HMCNRN01',
            'fecha_nacimiento' => '2011-01-01',
            'sexo' => 'M',
            'direccion' => 'Calle Falsa 123',
            'telefono' => '5511223344',
            'correo_institucional' => 'juan.perez@secundaria.edu.mx',
            'grado' => '1°',
            'grupo' => 'A',
            'estatus' => 'activo',
        ]);

        $response->assertRedirect('/alumnos');
        $this->assertDatabaseHas('alumnos', [
            'matricula' => 'TEST-2026-999',
            'curp' => 'PELJ110101HMCNRN01',
        ]);
    }

    public function test_usuario_autenticado_puede_ver_maestros(): void
    {
        $usuario = User::first() ?? User::factory()->create();

        $response = $this->actingAs($usuario)->get('/maestros');
        $response->assertStatus(200);
    }

    public function test_usuario_autenticado_puede_crear_maestro(): void
    {
        $usuario = User::first() ?? User::factory()->create();

        $response = $this->actingAs($usuario)->post('/maestros', [
            'nombre' => 'Profesor',
            'apellido_paterno' => 'Prueba',
            'apellido_materno' => 'Test',
            'curp' => 'PUPT800101HMCNRN02',
            'rfc' => 'PUPT800101AA1',
            'telefono' => '5599887766',
            'correo' => 'profe.prueba@secundaria.edu.mx',
            'puesto' => 'Docente Titular',
            'tipo_personal' => 'docente',
            'materias' => ['Matemáticas I'],
            'grupos' => ['1°A'],
            'estatus' => 'activo',
        ]);

        $response->assertRedirect('/maestros');
        $this->assertDatabaseHas('maestros', [
            'correo' => 'profe.prueba@secundaria.edu.mx',
        ]);
    }

    public function test_usuario_autenticado_puede_ver_tutores(): void
    {
        $usuario = User::first() ?? User::factory()->create();

        $response = $this->actingAs($usuario)->get('/tutores');
        $response->assertStatus(200);
    }

    public function test_usuario_autenticado_puede_crear_tutor(): void
    {
        $usuario = User::first() ?? User::factory()->create();

        $response = $this->actingAs($usuario)->post('/tutores', [
            'nombre' => 'Tutor',
            'apellido_paterno' => 'Responsable',
            'apellido_materno' => 'Guardián',
            'parentesco_predeterminado' => 'Padre',
            'telefono' => '5577889900',
            'correo' => 'tutor.test@gmail.com',
            'direccion' => 'Calle Real #40',
            'ocupacion' => 'Comerciante',
        ]);

        $response->assertRedirect('/tutores');
        $this->assertDatabaseHas('tutores', [
            'telefono' => '5577889900',
        ]);
    }
}
