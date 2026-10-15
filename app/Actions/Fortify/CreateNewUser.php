<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use App\Models\Cliente;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
        ])->validate();

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
        ]);

        $cliente = Cliente::where('email', $user->email)->first();

        if ($cliente) {
            $cliente->update([
                'user_id' => $user->id,
                'nombre'  => $user->name,
            ]);
        } else {
            Cliente::create([
                'user_id'  => $user->id,
                'nombre'   => $user->name,
                'email'    => $user->email,
                'telefono' => 'Pendiente',
            ]);
        }

        return $user;
    }
}
