<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tutor extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'tutores';

    // Campos asignables masivamente
    protected $fillable = [
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'parentesco_predeterminado',
        'telefono',
        'telefono_secundario',
        'correo',
        'direccion',
        'ocupacion',
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

    // Relación con Alumnos (Muchos a Muchos)
    public function alumnos(): BelongsToMany
    {
        return $this->belongsToMany(Alumno::class, 'alumno_tutor')
            ->withPivot('parentesco', 'es_contacto_principal')
            ->withTimestamps();
    }
}
