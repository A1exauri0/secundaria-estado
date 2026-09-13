<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AlumnoRequest extends FormRequest
{
    /**
     * Determinar si el usuario está autorizado para hacer esta solicitud.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de validación para Alumnos.
     */
    public function rules(): array
    {
        $alumnoId = $this->route('alumno') ? $this->route('alumno')->id : null;

        return [
            'matricula' => [
                'required',
                'string',
                'max:50',
                Rule::unique('alumnos', 'matricula')->ignore($alumnoId),
            ],
            'nombre' => ['required', 'string', 'max:100'],
            'apellido_paterno' => ['required', 'string', 'max:100'],
            'apellido_materno' => ['nullable', 'string', 'max:100'],
            'curp' => [
                'required',
                'string',
                'size:18',
                'regex:/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/',
                Rule::unique('alumnos', 'curp')->ignore($alumnoId),
            ],
            'fecha_nacimiento' => ['required', 'date'],
            'sexo' => ['required', Rule::in(['M', 'F', 'Otro'])],
            'direccion' => ['required', 'string'],
            'telefono' => ['nullable', 'string', 'max:20'],
            'correo_institucional' => ['nullable', 'email', 'max:150'],
            'grado' => ['required', 'string', 'max:10'],
            'grupo' => ['required', 'string', 'max:5'],
            'estatus' => ['required', Rule::in(['activo', 'egresado', 'baja', 'suspendido'])],
            'tutores' => ['nullable', 'array'],
            'tutores.*.id' => ['required_with:tutores', 'exists:tutores,id'],
            'tutores.*.parentesco' => ['nullable', 'string', 'max:50'],
            'tutores.*.es_contacto_principal' => ['nullable', 'boolean'],
        ];
    }

    /**
     * Mensajes personalizados de error.
     */
    public function messages(): array
    {
        return [
            'matricula.required' => 'La matrícula o ID del alumno es obligatorio.',
            'matricula.unique' => 'Esta matrícula ya está registrada con otro alumno.',
            'nombre.required' => 'El nombre del alumno es obligatorio.',
            'apellido_paterno.required' => 'El apellido paterno es obligatorio.',
            'curp.required' => 'La CURP es obligatoria.',
            'curp.size' => 'La CURP debe tener exactamente 18 caracteres.',
            'curp.regex' => 'El formato de la CURP no es válido.',
            'curp.unique' => 'Esta CURP ya se encuentra registrada.',
            'fecha_nacimiento.required' => 'La fecha de nacimiento es requerida.',
            'grado.required' => 'El grado es obligatorio.',
            'grupo.required' => 'El grupo es obligatorio.',
            'direccion.required' => 'La dirección es obligatoria.',
        ];
    }
}
