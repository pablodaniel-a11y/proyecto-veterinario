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
            
            $table->foreignId('cita_id')
                ->nullable()
                ->constrained('citas')
                ->cascadeOnDelete();

            $table->dateTime('fecha_hora');
            $table->string('motivo_consulta')->nullable();
            $table->string('diagnostico')->nullable();
            $table->string('tratamiento')->nullable();
            $table->decimal('peso', 5, 2)->nullable(); 
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
