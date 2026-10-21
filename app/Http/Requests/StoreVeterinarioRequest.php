<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreVeterinarioRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'string', 'unique:users,email'],
            'telefono' => ['required', 'string', 'max:20', 'unique:veterinarios,telefono'],
            'matricula' => ['required', 'string', 'max:100', 'unique:veterinarios,matricula'],
            'especialidad' => ['required', 'string', 'max:100'],
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'El campo :attribute es obligatorio.',
            'unique' => 'El :attribute ingresado ya se encuentra registrado.',
            'max' => 'El campo :attribute no debe superar los :max caracteres.',
            'integer' => 'El campo :attribute debe ser un número entero.',
            'image' => 'El archivo cargado debe ser una imagen.',
            'mimes' => 'La foto debe tener un formato válido (jpeg, png, jpg, webp).',
        ];
    }
}
