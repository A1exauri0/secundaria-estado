<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Alumno extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'alumnos';

    // Campos asignables masivamente
    protected $fillable = [
        'matricula',
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'curp',
        'fecha_nacimiento',
        'sexo',
        'direccion',
        'telefono',
        'correo_institucional',
        'grado',
        'grupo',
        'estatus',
    ];

    // Casteo de tipos
    protected $casts = [
        'fecha_nacimiento' => 'date:Y-m-d',
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

    // Relación con Tutores (Muchos a Muchos)
    public function tutores(): BelongsToMany
    {
        return $this->belongsToMany(Tutor::class, 'alumno_tutor')
            ->withPivot('parentesco', 'es_contacto_principal')
            ->withTimestamps();
    }
}
