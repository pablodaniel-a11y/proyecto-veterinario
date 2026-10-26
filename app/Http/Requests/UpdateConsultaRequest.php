<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateConsultaRequest extends FormRequest
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
            'diagnostico' => ['required', 'string', 'max:500'],
            'peso' => ['nullable', 'decimal:0,2', 'min:0', 'max:999.99'],
            'estado' => ['required', 'string', 'in:pendiente,completado,cancelado', 'max:20'],
            'observaciones' => ['nullable', 'string', 'max:1000'],

            //me di cuenta que no puedo usar el updatedatelle_consultarequest.php
            'detalles' => ['nullable', 'array'],
            'detalles.*.producto_id' => ['required', 'exists:productos,id'],
            'detalles.*.dosis' => ['required', 'numeric', 'min:0', 'max:999.99'],
            'detalles.*.cantidad' => ['required', 'integer', 'min:1'],
            'detalles.*.indicaciones' => ['nullable', 'string', 'max:500'],
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
