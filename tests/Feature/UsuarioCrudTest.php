<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UsuarioCrudTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create([
            'name' => 'Administrador Test',
            'email' => 'admin.test@secundaria.edu.mx',
            'rol' => 'admin',
            'estatus' => 'activo',
        ]);
    }

    public function test_usuario_no_autenticado_es_redirigido_al_login(): void
    {
        $respuesta = $this->get('/usuarios');

        $respuesta->assertRedirect('/login');
    }

    public function test_usuario_autenticado_puede_ver_listado_de_usuarios(): void
    {
        $respuesta = $this->actingAs($this->admin)->get('/usuarios');

        $respuesta->assertOk();
        $respuesta->assertInertia(fn ($page) => $page
            ->component('usuarios/index')
            ->has('usuarios.data')
            ->has('filtros')
            ->has('estadisticas')
        );
    }

    public function test_usuario_autenticado_puede_crear_nuevo_usuario(): void
    {
        $datos = [
            'name' => 'Prof. Juan Pérez López',
            'email' => 'juan.perez@secundaria.edu.mx',
            'password' => 'password123',
            'rol' => 'docente',
            'telefono' => '9611112233',
            'estatus' => 'activo',
        ];

        $respuesta = $this->actingAs($this->admin)->post('/usuarios', $datos);

        $respuesta->assertRedirect('/usuarios');
        $this->assertDatabaseHas('users', [
            'name' => 'Prof. Juan Pérez López',
            'email' => 'juan.perez@secundaria.edu.mx',
            'rol' => 'docente',
            'estatus' => 'activo',
        ]);

        $usuarioCreado = User::where('email', 'juan.perez@secundaria.edu.mx')->first();
        $this->assertTrue(Hash::check('password123', $usuarioCreado->password));
    }

    public function test_usuario_autenticado_puede_actualizar_usuario(): void
    {
        $usuario = User::factory()->create([
            'name' => 'Usuario Original',
            'email' => 'usuario.original@secundaria.edu.mx',
            'rol' => 'control_escolar',
            'estatus' => 'activo',
        ]);

        $datosActualizados = [
            'name' => 'Usuario Modificado',
            'email' => 'usuario.modificado@secundaria.edu.mx',
            'password' => '', // Mantener contraseña existente
            'rol' => 'directivo',
            'telefono' => '9619998877',
            'estatus' => 'inactivo',
        ];

        $respuesta = $this->actingAs($this->admin)->put("/usuarios/{$usuario->id}", $datosActualizados);

        $respuesta->assertRedirect('/usuarios');
        $this->assertDatabaseHas('users', [
            'id' => $usuario->id,
            'name' => 'Usuario Modificado',
            'email' => 'usuario.modificado@secundaria.edu.mx',
            'rol' => 'directivo',
            'estatus' => 'inactivo',
        ]);
    }

    public function test_usuario_autenticado_puede_eliminar_otro_usuario(): void
    {
        $usuarioParaEliminar = User::factory()->create([
            'name' => 'Para Eliminar',
            'email' => 'eliminar@secundaria.edu.mx',
        ]);

        $respuesta = $this->actingAs($this->admin)->delete("/usuarios/{$usuarioParaEliminar->id}");

        $respuesta->assertRedirect('/usuarios');
        $this->assertDatabaseMissing('users', [
            'id' => $usuarioParaEliminar->id,
        ]);
    }

    public function test_usuario_no_puede_eliminar_su_propia_cuenta(): void
    {
        $respuesta = $this->actingAs($this->admin)->delete("/usuarios/{$this->admin->id}");

        $respuesta->assertRedirect('/usuarios');
        $this->assertDatabaseHas('users', [
            'id' => $this->admin->id,
        ]);
    }

    public function test_validacion_de_correo_duplicado(): void
    {
        User::factory()->create([
            'email' => 'duplicado@secundaria.edu.mx',
        ]);

        $datos = [
            'name' => 'Otro Usuario',
            'email' => 'duplicado@secundaria.edu.mx',
            'password' => 'password123',
            'rol' => 'consulta',
            'estatus' => 'activo',
        ];

        $respuesta = $this->actingAs($this->admin)->post('/usuarios', $datos);

        $respuesta->assertSessionHasErrors('email');
    }
}
