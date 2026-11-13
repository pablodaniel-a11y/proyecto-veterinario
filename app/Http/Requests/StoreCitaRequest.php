<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use App\Models\Agenda;
use App\Models\BloqueoAgenda;
use App\Models\Cita;
use Carbon\Carbon;

class StoreCitaRequest extends FormRequest
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
        $rules = [
            'fecha_hora' => ['required', 'date', 'after_or_equal:now'],
            'motivo' => ['required', 'string', 'max:500'],
            'veterinario_id' => ['required', 'integer', 'exists:veterinarios,id'],
            'estado' => ['required', 'string', 'in:pendiente,completado,cancelado,confirmada', 'max:20'],
        ];

        if (!auth()->check()) {
            $rules['nombreingresado'] = ['required', 'string', 'max:255'];
            $rules['emailingresado'] = ['required', 'email', 'max:255'];
            $rules['nombre_mascota'] = ['required', 'string', 'max:255'];
            $rules['sexo_mascota'] = ['required', 'string', 'in:Macho,Hembra'];
            $rules['edad_mascota'] = ['required', 'integer', 'min:0', 'max:30'];
            $rules['raza_id'] = ['required', 'integer', 'exists:razas,id'];
        } else {
            $rules['mascota_id'] = ['required', 'integer', 'exists:mascotas,id'];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'required' => 'El campo :attribute es obligatorio.',
            'exists' => 'El :attribute seleccionado no es válido.',
            'max' => 'El campo :attribute no debe superar los :max caracteres.',
            'date' => 'El campo :attribute debe tener un formato de fecha y hora válido.',
            'in' => 'El campo :attribute seleccionado no es válido.',
            'after_or_equal:now' => 'El campo :attribute tiene una fecha no valida'
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
