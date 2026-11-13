<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use App\Models\Agenda;
use App\Models\BloqueoAgenda;
use App\Models\Cita;
use Carbon\Carbon;

class UpdateCitaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'veterinario_id' => ['required', 'integer', 'exists:veterinarios,id'],
            'fecha_hora' => ['required', 'date'],
            'motivo' => ['required', 'string', 'max:500'],
            'estado' => ['required', 'string', 'in:pendiente,completado,cancelado,confirmada', 'max:20'],
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'El campo :attribute es obligatorio.',
            'exists' => 'El :attribute seleccionado no es válido.',
            'max' => 'El campo :attribute no debe superar los :max caracteres.',
            'date' => 'El campo :attribute debe tener un formato de fecha y hora válido.',
            'in' => 'El campo :attribute seleccionado no es válido.',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $fechaHora = Carbon::parse($this->fecha_hora);
            $fecha = $fechaHora->format('Y-m-d');
            $hora = $fechaHora->format('H:i:s');
            $diaSemana = $fechaHora->dayOfWeekIso;
            $mascotaId = $this->mascota_id; 
        
            if($mascotaId){
                $citaActiva = Cita::where('mascota_id', $mascotaId)
                    ->whereIn('estado', ['pendiente', 'confirmada'])
                    ->exists();

                if($citaActiva){
                    $validator->errors()->add('mascota_id', 'Esta mascota ya tiene una cita activa pendiente o confirmada. Debe completarla o cancelarla antes de pedir otra.');
                }
            }

            $bloqueoTotal = BloqueoAgenda::where('fecha', $fecha)
                ->whereNull('hora_inicio')
                ->exists();

            if($bloqueoTotal){
                $validator->errors()->add('fecha_hora', 'La clínica se encuentra cerrada en esta fecha por feriado o anulación.');
            }

            $atiende = Agenda::where('veterinario_id', $this->veterinario_id)
                ->where('dia_semana', $diaSemana)
                ->where('activo', true)
                ->where('hora_inicio', '<=', $hora)
                ->where('hora_fin', '>=', $hora)
                ->exists();

            if (!$atiende) {
                $validator->errors()->add('fecha_hora', 'El veterinario seleccionado no atiende en este día u horario.');
            }
        });
    }
}
