<?php

namespace App\Http\Requests;

// Importaciones de Laravel
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Validación de Formulario para Usuarios del Sistema
 */
class UserRequest extends FormRequest
{
    /**
     * Determinar si el usuario está autorizado a realizar esta solicitud.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de validación para el usuario.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $usuarioId = $this->route('usuario') ? $this->route('usuario')->id : null;

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($usuarioId),
            ],
            'password' => $usuarioId
                ? ['nullable', 'string', 'min:8']
                : ['required', 'string', 'min:8'],
            'rol' => ['required', 'string', Rule::in(['admin', 'directivo', 'control_escolar', 'docente', 'consulta'])],
            'telefono' => ['nullable', 'string', 'max:20'],
            'estatus' => ['required', 'string', Rule::in(['activo', 'inactivo'])],
        ];
    }

    /**
     * Nombres de atributos personalizados.
     */
    public function attributes(): array
    {
        return [
            'name' => 'nombre completo',
            'email' => 'correo electrónico',
            'password' => 'contraseña',
            'rol' => 'rol de usuario',
            'telefono' => 'teléfono',
            'estatus' => 'estatus de acceso',
        ];
    }

    /**
     * Mensajes de validación personalizados en español.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'El nombre completo es obligatorio.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'Ingresa un formato de correo electrónico válido.',
            'email.unique' => 'Este correo electrónico ya está registrado en el sistema.',
            'password.required' => 'La contraseña es obligatoria para nuevos usuarios.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'rol.required' => 'Debes seleccionar un rol para el usuario.',
            'rol.in' => 'El rol seleccionado no es válido.',
            'estatus.required' => 'El estatus del usuario es obligatorio.',
            'estatus.in' => 'El estatus seleccionado no es válido.',
        ];
    }
}
