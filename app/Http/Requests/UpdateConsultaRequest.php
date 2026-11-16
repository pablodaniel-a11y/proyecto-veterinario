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
            'diagnostico' => ['nullable', 'required_if:estado,completado', 'string', 'max:2000'],
            'tratamiento' => ['nullable', 'string', 'max:2000'],
            'peso' => ['nullable', 'decimal:0,2', 'min:0', 'max:999.99'],
            'estado' => ['required', 'string', 'in:pendiente,completado,cancelado', 'max:20'],
            'observaciones' => ['nullable', 'string', 'max:1000'],

            'detalles' => ['nullable', 'array'],
            'detalles.*.producto_id' => ['nullable', 'required_without:detalles.*.nombre_medicamento', 'exists:productos,id'],
            'detalles.*.nombre_medicamento' => ['nullable', 'required_without:detalles.*.producto_id', 'string', 'max:255'],
            'detalles.*.dosis' => ['required', 'numeric', 'min:0', 'max:999.99'],
            'detalles.*.cantidad' => ['required', 'integer', 'min:1'],
            'detalles.*.indicaciones' => ['nullable', 'string', 'max:500'],
        ];
    }

    public function attributes(): array
    {
        return [
            'diagnostico' => 'diagnóstico',
            'tratamiento' => 'tratamiento',
            'detalles.*.producto_id'        => 'producto del catálogo',
            'detalles.*.nombre_medicamento' => 'nombre del medicamento externo',
            'detalles.*.dosis'              => 'dosis',
            'detalles.*.cantidad'           => 'cantidad',
            'detalles.*.indicaciones'       => 'indicaciones',
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'El campo :attribute es obligatorio.',
            'required_if' => 'El campo :attribute es obligatorio al completar la consulta.',
            'required_without' => 'Debes seleccionar un producto del catálogo o escribir el nombre del medicamento.',
            'exists' => 'El :attribute seleccionado no es válido.',
            'max' => 'El campo :attribute no debe superar los :max caracteres.',
            'in' => 'El campo :attribute seleccionado no es válido.',
        ];
    }
}
