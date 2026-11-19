<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cita;
use App\Models\Mascota;
use App\Models\Veterinario;
use App\Models\Cliente;

class CitaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ciro = Mascota::where('nombre', 'Ciro')->first();
        $mini = Mascota::where('nombre', 'Mini')->first();
        $clienteCiro = $ciro ? $ciro->cliente_id : Cliente::first()->id;
        $clienteMini = $mini ? $mini->cliente_id : Cliente::first()->id;

        $veterinario = Veterinario::inRandomOrder()->first();
        $veterinarioPrueba = Veterinario::where('telefono', '387123456')->firstOrFail();

        $veterinariosPruebaIds = Veterinario::whereHas('user', function ($q) {
            $q->whereIn('email', [
                'vp1@vp1.com',
                'vp2@vp2.com',
                'vp3@vp3.com',
                'vp4@vp4.com',
            ]);
        })->pluck('id')->all();

        $clienteregistrado = Cliente::where('email', 'reg@reg.com')->firstOrFail();
        $mascotasDisponiblesIds = Mascota::where('cliente_id', $clienteregistrado->id)
            ->whereDoesntHave('citas', function ($q) {
                $q->whereIn('estado', ['pendiente', 'confirmada']);
            })
            ->pluck('id')
            ->all();

        Cita::create([
            'cliente_id'     => $clienteCiro,
            'veterinario_id' => $veterinario->id,
            'mascota_id'     => $ciro->id,
            'fecha_hora'     => now()->subDays(2),
            'motivo'         => 'Ciro tiene una molestia en las orejas y se rasca mucho.',
            'estado'         => 'confirmada',
        ]);

        Cita::create([
            'cliente_id'     => $clienteMini,
            'veterinario_id' => $veterinario->id,
            'mascota_id'     => $mini->id,
            'fecha_hora'     => now()->addDay(),
            'motivo'         => 'Control de rutina anual y vacunación.',
            'estado'         => 'pendiente',
        ]);

        Cita::create([
            'cliente_id'     => $clienteMini,
            'veterinario_id' => $veterinarioPrueba->id,
            'mascota_id'     => $mini->id,
            'fecha_hora'     => now(),
            'motivo'         => 'Control de rutina anual y vacunación.',
            'estado'         => 'confirmada',
        ]);

        $idsUsados = [];
        for ($i = 0; $i < 2; $i++) {
            $candidatos = array_values(array_diff($mascotasDisponiblesIds, $idsUsados));
            if(empty($candidatos)){
                break;
            }
            $mascotaId = fake()->randomElement($candidatos);
            $idsUsados[] = $mascotaId;
            Cita::factory()->create([
                'cliente_id'     => $clienteregistrado->id,
                'veterinario_id' => fake()->randomElement($veterinariosPruebaIds),
                'mascota_id'     => $mascotaId,
            ]);
        }
    }
}
