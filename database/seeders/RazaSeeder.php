<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Raza;
use App\Models\Especie;

class RazaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $perro = Especie::where('nombre', 'Perro')->firstOrFail();
        $gato = Especie::where('nombre', 'Gato')->firstOrFail();
        $ave = Especie::where('nombre', 'Ave')->firstOrFail();
        $reptil = Especie::where('nombre', 'Reptil')->firstOrFail();
        $roedor = Especie::where('nombre', 'Roedor')->firstOrFail();

        Raza::create(['especie_id' => $perro->id, 'nombre' => 'Labrador']);
        Raza::create(['especie_id' => $perro->id, 'nombre' => 'Caniche']);
        Raza::create(['especie_id' => $perro->id, 'nombre' => 'Pastor Aleman']);
        Raza::create(['especie_id' => $perro->id, 'nombre' => 'Golden Retriever']);
        Raza::create(['especie_id' => $perro->id, 'nombre' => 'Bulldog Francés']);
        Raza::create(['especie_id' => $perro->id, 'nombre' => 'Teckel']);
        Raza::create(['especie_id' => $perro->id, 'nombre' => 'Pitbull Terrier']);
        Raza::create(['especie_id' => $perro->id, 'nombre' => 'Husky Siberiano']);
        Raza::create(['especie_id' => $perro->id, 'nombre' => 'Chihuahua']);

        Raza::create(['especie_id' => $gato->id, 'nombre' => 'Siames']);
        Raza::create(['especie_id' => $gato->id, 'nombre' => 'Persa']);
        Raza::create(['especie_id' => $gato->id, 'nombre' => 'Maine Coon']);
        Raza::create(['especie_id' => $gato->id, 'nombre' => 'British Shorthair']);
        Raza::create(['especie_id' => $gato->id, 'nombre' => 'Esfinge']);
        Raza::create(['especie_id' => $gato->id, 'nombre' => 'Angora Turco']);

        Raza::create(['especie_id' => $ave->id, 'nombre' => 'Canario']);
        Raza::create(['especie_id' => $ave->id, 'nombre' => 'Periquito']);
        Raza::create(['especie_id' => $ave->id, 'nombre' => 'Diamantes']);
        Raza::create(['especie_id' => $ave->id, 'nombre' => 'Agapornis (inseparables)']);
        Raza::create(['especie_id' => $ave->id, 'nombre' => 'Ninfas (carotas)']);
        Raza::create(['especie_id' => $ave->id, 'nombre' => 'Cotorras']);
        Raza::create(['especie_id' => $ave->id, 'nombre' => 'Loros']);
        Raza::create(['especie_id' => $ave->id, 'nombre' => 'Cacatuas']);

        Raza::create(['especie_id' => $reptil->id, 'nombre' => 'Dragón barbudo']);
        Raza::create(['especie_id' => $reptil->id, 'nombre' => 'Gecko leopardo']);
        Raza::create(['especie_id' => $reptil->id, 'nombre' => 'Camaleón']);
        Raza::create(['especie_id' => $reptil->id, 'nombre' => 'Iguana verde']);
        Raza::create(['especie_id' => $reptil->id, 'nombre' => 'Eslizón de lengua azul']);
        Raza::create(['especie_id' => $reptil->id, 'nombre' => 'Serpiente del maíz']);
        Raza::create(['especie_id' => $reptil->id, 'nombre' => 'Pitón bola']);
        Raza::create(['especie_id' => $reptil->id, 'nombre' => 'Tortuga de hermann']);
        Raza::create(['especie_id' => $reptil->id, 'nombre' => 'Tortugas acuáticas']);

        Raza::create(['especie_id' => $roedor->id, 'nombre' => 'Hámster Sirio']);
        Raza::create(['especie_id' => $roedor->id, 'nombre' => 'Hámster Ruso/Campbell']);
        Raza::create(['especie_id' => $roedor->id, 'nombre' => 'Hámster Roborowski']);
        Raza::create(['especie_id' => $roedor->id, 'nombre' => 'Hámster Chino']);
        Raza::create(['especie_id' => $roedor->id, 'nombre' => 'Cobaya Americana (Pelo corto)']);
        Raza::create(['especie_id' => $roedor->id, 'nombre' => 'Cobaya Abisinia']);
        Raza::create(['especie_id' => $roedor->id, 'nombre' => 'Cobaya Peruana']);
        Raza::create(['especie_id' => $roedor->id, 'nombre' => 'Rata común de laboratorio/Dumbo']);
        Raza::create(['especie_id' => $roedor->id, 'nombre' => 'Ratón doméstico']);
        Raza::create(['especie_id' => $roedor->id, 'nombre' => 'Jerbo de Mongolia']);


    }
}
