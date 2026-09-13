<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MaestroRequest extends FormRequest
{
    /**
     * Determinar si el usuario está autorizado para hacer esta solicitud.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de validación para Maestros y Personal.
     */
    public function rules(): array
    {
        $maestroId = $this->route('maestro') ? $this->route('maestro')->id : null;

        return [
            'nombre' => ['required', 'string', 'max:100'],
            'apellido_paterno' => ['required', 'string', 'max:100'],
            'apellido_materno' => ['nullable', 'string', 'max:100'],
            'curp' => [
                'required',
                'string',
                'size:18',
                'regex:/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/',
                Rule::unique('maestros', 'curp')->ignore($maestroId),
            ],
            'rfc' => ['nullable', 'string', 'max:13'],
            'telefono' => ['nullable', 'string', 'max:20'],
            'correo' => [
                'required',
                'email',
                'max:150',
                Rule::unique('maestros', 'correo')->ignore($maestroId),
            ],
            'puesto' => ['required', 'string', 'max:100'],
            'tipo_personal' => ['required', Rule::in(['docente', 'administrativo', 'directivo', 'apoyo'])],
            'materias' => ['nullable', 'array'],
            'materias.*' => ['string'],
            'grupos' => ['nullable', 'array'],
            'grupos.*' => ['string'],
            'estatus' => ['required', Rule::in(['activo', 'inactivo', 'licencia'])],
        ];
    }

    /**
     * Mensajes personalizados de validación.
     */
    public function messages(): array
    {
        return [
            'nombre.required' => 'El nombre del maestro/personal es obligatorio.',
            'apellido_paterno.required' => 'El apellido paterno es obligatorio.',
            'curp.required' => 'La CURP es requerida.',
            'curp.unique' => 'Esta CURP ya se encuentra registrada con otro docente.',
            'correo.required' => 'El correo electrónico es obligatorio.',
            'correo.unique' => 'Este correo ya pertenece a otro registro.',
            'puesto.required' => 'El puesto o cargo es obligatorio.',
            'tipo_personal.required' => 'El tipo de personal es obligatorio.',
        ];
    }
}
