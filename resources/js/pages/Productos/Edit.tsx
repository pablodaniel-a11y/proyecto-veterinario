import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";



interface Producto{
    id: number;
    nombre_producto: string;
    tipo_producto: string;
    precio_venta: number;
    stock_actual: number;
}

interface editProps{
    producto: Producto;
}

export default function Index({producto}: editProps){
    const {data,setData,put,processing,errors} = useForm({
        nombre_producto: producto.nombre_producto,
        tipo_producto: producto.tipo_producto,
        precio_venta: producto.precio_venta,
        stock_actual: producto.stock_actual,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/productos/${producto.id}`);
    }

    return(
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Editar Producto de la Tienda: {producto.nombre_producto} </span></h1>
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
                        <label> tipo_producto </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    </div>
                    <div>
                        <label> Telefono </label>
                        <input
                            type='text'
                            value={data.telefono}
                            onChange={(e) => setData('telefono', e.target.value)}
                        />
                    </div>
                    <div>
                        <label> Matricula </label>
                        <input 
                            type="text" 
                            value={data.matricula}
                            onChange={(e) => setData('matricula', e.target.value)}
                        />
                        {errors.matricula && <span className="text-red-500 text-sm">{errors.matricula}</span>}
                    </div>
                    <div>
                        <label> Especialidad </label>
                        <input 
                            type="text" 
                            value={data.especialidad}
                            onChange={(e) => setData('especialidad', e.target.value)}
                        />
                        {errors.especialidad && <span className="text-red-500 text-sm">{errors.especialidad}</span>}
                    </div>
                    <div className="flex gap-4 mt-4">
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {processing ? 'Guardando...' : 'Actualizar Perfil'}
                        </Button>
                        
                        <Link href="/veterinarios" className="px-4 py-2 bg-gray-300 rounded-md text-gray-700">
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}