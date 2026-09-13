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
        Schema::create('maestros', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('apellido_paterno');
            $table->string('apellido_materno')->nullable();
            $table->string('curp', 18)->unique();
            $table->string('rfc', 13)->nullable();
            $table->string('telefono')->nullable();
            $table->string('correo')->unique();
            $table->string('puesto')->default('Docente frente a grupo');
            $table->enum('tipo_personal', ['docente', 'administrativo', 'directivo', 'apoyo'])->default('docente');
            $table->json('materias')->nullable(); // Lista de materias que imparte
            $table->json('grupos')->nullable();   // Lista de grupos asignados
            $table->enum('estatus', ['activo', 'inactivo', 'licencia'])->default('activo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maestros');
    }
};
