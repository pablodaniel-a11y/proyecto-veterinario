<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductoRequest extends FormRequest
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
            'nombre_producto' => ['required', 'string', 'max:100'],
            'tipo_producto' => ['required', 'string', 'in:Medicamento,Higiene,Accesorio,Servicio', 'max:20'],
            'precio_venta' => ['required', 'decimal', 'min:0'],
            'stock_actual' => ['required', 'integer', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'El campo :attribute es obligatorio.',
            'exists' => 'El :attribute seleccionado no es válido.',
            'max' => 'El campo :attribute no debe superar los :max caracteres.',
            'in' => 'El campo :attribute debe ser Medicamento, Higiene, Accesorio, Servicio.',
            'integer' => 'El campo :attribute debe ser un número entero.',
            'image' => 'El archivo cargado debe ser una imagen.',
            'mimes' => 'La foto debe tener un formato válido (jpeg, png, jpg, webp).',
        ];
    }
}
