<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('alumnos', function (Blueprint $table) {
            $table->id();
            $table->string('matricula')->unique();
            $table->string('nombre');
            $table->string('apellido_paterno');
            $table->string('apellido_materno')->nullable();
            $table->string('curp', 18)->unique();
            $table->date('fecha_nacimiento');
            $table->enum('sexo', ['M', 'F', 'Otro'])->default('M');
            $table->text('direccion');
            $table->string('telefono')->nullable();
            $table->string('correo_institucional')->nullable();
            $table->string('grado', 10); // 1°, 2°, 3°
            $table->string('grupo', 5);   // A, B, C, D...
            $table->enum('estatus', ['activo', 'egresado', 'baja', 'suspendido'])->default('activo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alumnos');
    }
};
