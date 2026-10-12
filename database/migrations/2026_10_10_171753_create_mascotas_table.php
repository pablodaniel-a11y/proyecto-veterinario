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
        Schema::create('mascotas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
              ->constrained('users')
              ->cascadeOnDelete();
            $table->foreignId('raza_id')
              ->nullable()
              ->constrained('razas')
              ->nullOnDelete();
            $table->string('nombre');
            $table->string('sexo'); //Macho | Hembra
            $table->integer('edad')->default(0);
            $table->string('foto')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mascotas');
    }
};
