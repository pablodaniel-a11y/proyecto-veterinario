<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

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
            'estado' => ['required', 'string', 'in:pendiente,completado,cancelado', 'max:20'],
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
}
