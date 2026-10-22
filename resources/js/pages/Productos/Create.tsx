import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

type tipoproductos = 'Medicamento' | 'Higiene' | 'Accesorio' | 'Servicio';

interface createProps{
    tiposProductosList: tipoproductos[];
    
}

export default function Create({tiposProductosList}: createProps){
    const {data,setData,post,processing,errors} = useForm({
        nombre_producto: '',
        tipo_producto: '' as tipoproductos,
        precio_venta: 0,
        stock_actual: 0,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(`/productos`);
    }

    return(
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Crear un Producto para la Tienda: </span></h1>
            </div>
            <div>

            </div>
            <div className="min-h-screen flex bg-gray-100">
                <form className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4" onSubmit={submit}>
                    <div>
                        <label> Nombre del Producto </label>
                        <input
                            type='text'
                            value={data.nombre_producto}
                            onChange={(e) => setData('nombre_producto', e.target.value)}
                        />
                        {errors.nombre_producto && <span className="text-red-500 text-sm">{errors.nombre_producto}</span>}
                    </div>
                    <div>
                        <label> Tipo Producto </label>
                        <select
                            value={data.tipo_producto}
                            onChange={(e) => setData('tipo_producto', e.target.value as tipoproductos)}
                        >
                            <option value="" disabled>Seleccione un tipo</option>
                            {tiposProductosList.map((tipo) => (
                                <option key={tipo} value={tipo}>
                                    {tipo}
                                </option>
                            ))}
                        </select>
                        {errors.tipo_producto && <span className="text-red-500 text-sm">{errors.tipo_producto}</span>}
                    </div>
                    <div>
                        <label> Precio Venta </label>
                        <input
                            type='number'
                            value={data.precio_venta}
                            onChange={(e) => setData('precio_venta', Number(e.target.value))}
                        />
                        {errors.precio_venta && <span className="text-red-500 text-sm">{errors.precio_venta}</span>}
                    </div>
                    <div>
                        <label> Stock Actual </label>
                        <input
                            type='number'
                            value={data.stock_actual}
                            onChange={(e) => setData('stock_actual', Number(e.target.value))}
                        />
                        {errors.stock_actual && <span className="text-red-500 text-sm">{errors.stock_actual}</span>}
                    </div>
                    <div className="flex gap-4 mt-4">
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {processing ? 'Guardando...' : 'Crear Producto'}
                        </Button>
                        
                        <Link href="/productos" className="px-4 py-2 bg-gray-300 rounded-md text-gray-700">
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}