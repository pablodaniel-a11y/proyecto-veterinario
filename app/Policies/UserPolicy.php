<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    /** 
    * Determina si el usuario puede actualizar a otro usuario (o a sí mismo). 
    */ 
    public function update(User $currentUser): bool 
    { 
         
        if (!$currentUser->hasRole('super-admin')) { 
            return false; 
        } 
        return true; 
    } 

    /** 
    * Determina si el usuario puede eliminar a otro usuario. 
    */ 

    public function delete(User $currentUser, User $targetUser): bool 
    {  
        if ($currentUser->id === $targetUser->id) { 
            return false; 
        } 

        return $currentUser->hasRole('super-admin');
    }
}
