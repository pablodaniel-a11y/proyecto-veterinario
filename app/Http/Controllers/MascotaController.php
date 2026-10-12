<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Mascota;
use App\Http\Requests\StoreMascotaRequest;
use App\Http\Requests\UpdateMascotaRequest;

class MascotaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {      
        $mascotas = Mascota::with('raza.especie')->get();

        return Inertia::render('Mascotas/Index', [
            'mascotas' => $mascotas
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMascotaRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Mascota $mascota)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mascota $mascota)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMascotaRequest $request, Mascota $mascota)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mascota $mascota)
    {
        //
    }
}
