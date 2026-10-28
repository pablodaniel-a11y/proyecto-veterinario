<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Producto;
use App\Http\Requests\StoreProductoRequest;
use App\Http\Requests\UpdateProductoRequest;
use Illuminate\Routing\Attributes\Controllers\Middleware;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productos=Producto::all();
        return Inertia::render('Productos/Index', [
            'productos' => $productos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    #[Middleware('permission:crear producto')]
    public function create()
    {
        $tiposProductosList=['Medicamento', 'Higiene', 'Accesorio', 'Servicio'];

        return Inertia::render('Productos/Create', [
            'tiposProductosList' => $tiposProductosList,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    #[Middleware('permission:crear producto')]
    public function store(StoreProductoRequest $request)
    {
        $validated= $request->validated();

        Producto::create($validated);

        return redirect()
            ->route('productos.index')
            ->with('success', 'Producto creado correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Producto $producto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    #[Middleware('permission:editar producto')]
    public function edit(Producto $producto)
    {
        $tiposProductosList=['Medicamento', 'Higiene', 'Accesorio', 'Servicio'];
        
        return Inertia::render('Productos/Edit', [
            'producto' => $producto,
            'tiposProductosList' => $tiposProductosList,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    #[Middleware('permission:editar producto')]
    public function update(UpdateProductoRequest $request, Producto $producto)
    {
        $validated= $request->validated();

        $producto->update($validated);


        return redirect()
            ->route('productos.index')
            ->with('success', 'Producto actualizado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    #[Middleware('permission:eliminar producto')]
    public function destroy(Producto $producto)
    {
        $producto->delete();

        return redirect()
            ->route('productos.index')
            ->with('success', 'Producto borrado correctamente');
    }
}
