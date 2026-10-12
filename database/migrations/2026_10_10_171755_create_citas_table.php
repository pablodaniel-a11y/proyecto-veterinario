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
        Schema::create('citas', function (Blueprint $table) {
            $table->id();

            $table->foreignId('cliente_id')
                ->constrainde('clientes')
                ->cascadeOnDelete();

            $table->foreignId('veterinario_id')
                ->constrained('veterinarios')
                ->cascadeOnDelete();
            
            $table->foreignId('mascota_id')
                ->constrained('mascotas')
                ->cascadeOnDelete();
            
            $table->dateTime('fecha_hora');
            $table->string('motivo');
            $table->string('estado')->default('pendiente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('citas');
    }
};
