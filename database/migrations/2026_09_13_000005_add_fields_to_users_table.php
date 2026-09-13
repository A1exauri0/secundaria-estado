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
        Schema::table('users', function (Blueprint $table) {
            $table->string('rol', 50)->default('control_escolar')->after('email');
            $table->string('telefono', 20)->nullable()->after('rol');
            $table->string('estatus', 30)->default('activo')->after('telefono');
            $table->string('avatar')->nullable()->after('estatus');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['rol', 'telefono', 'estatus', 'avatar']);
        });
    }
};
