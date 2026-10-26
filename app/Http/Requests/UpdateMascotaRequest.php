<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateMascotaRequest extends FormRequest
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
            //'cliente_id' => ['required', 'exists:clientes,id'],
            'raza_id'    => ['nullable', 'exists:razas,id'],
            'nombre'   => ['required', 'string', 'max:100'],
            'sexo' => ['required', 'string', 'in:Macho,Hembra', 'max:20'],
            'edad' => ['required', 'integer', 'min:0', 'max:40'],
            'foto'     => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'], // máx 2MB
        ];
    }

    public function attributes(): array
    {
        return [
            'cliente_id' => 'cliente',
            'raza_id'    => 'raza',
            'nombre'     => 'nombre de la mascota',
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'El campo :attribute es obligatorio.',
            'exists' => 'El :attribute seleccionado no es válido.',
            'max' => 'El campo :attribute no debe superar los :max caracteres.',
            'in' => 'El campo :attribute debe ser Macho o Hembra.',
            'integer' => 'El campo :attribute debe ser un número entero.',
            'image' => 'El archivo cargado debe ser una imagen.',
            'mimes' => 'La foto debe tener un formato válido (jpeg, png, jpg, webp).',
        ];
    }
}
