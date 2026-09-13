<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Maestro extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'maestros';

    // Campos asignables masivamente
    protected $fillable = [
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'curp',
        'rfc',
        'telefono',
        'correo',
        'puesto',
        'tipo_personal',
        'materias',
        'grupos',
        'estatus',
    ];

    // Casteo de tipos
    protected $casts = [
        'materias' => 'array',
        'grupos' => 'array',
    ];

    // Atributos calculados agregados al JSON
    protected $appends = [
        'nombre_completo',
    ];

    // Accessor para obtener el nombre completo
    public function getNombreCompletoAttribute(): string
    {
        return trim("{$this->nombre} {$this->apellido_paterno} {$this->apellido_materno}");
    }
}
