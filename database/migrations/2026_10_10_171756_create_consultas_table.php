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
        Schema::create('consultas', function (Blueprint $table) {
            $table->id();

            $table->foreignId('veterinario_id')
                ->constrained('veterinarios')
                ->cascadeOnDelete();
            
            $table->foreignId('mascota_id')
                ->constrained('mascotas')
                ->cascadeOnDelete();

            $table->dateTime('fecha_hora');
            $table->string('motivo_consulta')->nullable();
            $table->string('diagnostico');
            $table->decimal('peso', 5, 2)->nullable(); //esto es el limite 999.99 son 3 digitos para entero y 2 para decimales
            $table->string('estado')->default('pendiente');
            $table->string('observaciones')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultas');
    }
};
