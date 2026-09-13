<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TutorRequest extends FormRequest
{
    /**
     * Determinar si el usuario está autorizado para hacer esta solicitud.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de validación para Tutores.
     */
    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:100'],
            'apellido_paterno' => ['required', 'string', 'max:100'],
            'apellido_materno' => ['nullable', 'string', 'max:100'],
            'parentesco_predeterminado' => ['required', 'string', 'max:50'],
            'telefono' => ['required', 'string', 'max:20'],
            'telefono_secundario' => ['nullable', 'string', 'max:20'],
            'correo' => ['nullable', 'email', 'max:150'],
            'direccion' => ['nullable', 'string'],
            'ocupacion' => ['nullable', 'string', 'max:100'],
            'alumnos_ids' => ['nullable', 'array'],
            'alumnos_ids.*' => ['exists:alumnos,id'],
        ];
    }

    /**
     * Mensajes personalizados de error.
     */
    public function messages(): array
    {
        return [
            'nombre.required' => 'El nombre del tutor es obligatorio.',
            'apellido_paterno.required' => 'El apellido paterno es obligatorio.',
            'parentesco_predeterminado.required' => 'El parentesco es obligatorio.',
            'telefono.required' => 'El teléfono principal de contacto es requerido.',
        ];
    }
}
