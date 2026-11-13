<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreAgendaRequest extends FormRequest
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
            'dia_semana' => ['required', 'integer', 'between:1,7'],
            'hora_inicio' => ['required', 'date_format:H:i', 'before:hora_fin'],
            'hora_fin' => ['required', 'date_format:H:i', 'after:hora_inicio'],
            'duracion_turno_minutos' => ['required', 'integer', 'min:5', 'max:120'],
            'activo' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'El campo :attribute es obligatorio.',
            'exists' => 'El veterinario seleccionado no es válido.',
            'between' => 'El día de la semana debe ser un valor entre 1 y 7.',
            'before' => 'La hora de inicio debe ser anterior a la hora de fin.',
            'after' => 'La hora de fin debe ser posterior a la hora de inicio.',
        ];
    }
}
