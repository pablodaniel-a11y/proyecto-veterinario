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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 w-full">
            <div className="bg-white border border-orange-200 rounded-xl p-6 sm:p-8 shadow-sm">
                <div className="border-b border-orange-100 pb-4 mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Registrar Nuevo Producto
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Completa los datos requeridos para registrar la información.</p>
                </div>
                <form onSubmit={submit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Nombre del Producto</label>
                            <input
                                type="text"
                                value={data.nombre_producto}
                                onChange={(e) => setData('nombre_producto', e.target.value)}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                placeholder="Ej. AntiPulgas"
                            />
                            {errors.nombre_producto && <span className="text-red-500 text-xs mt-0.5">{errors.nombre_producto}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Tipo Producto</label>
                            <select
                                value={data.tipo_producto}
                                onChange={(e) => setData('tipo_producto', e.target.value as tipoproductos)}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            >
                                <option value="" disabled>Seleccione un tipo</option>
                                {tiposProductosList.map((tipo) => (
                                    <option key={tipo} value={tipo}>
                                        {tipo}
                                    </option>
                                ))}
                            </select>
                            {errors.tipo_producto && <span className="text-red-500 text-xs mt-0.5">{errors.tipo_producto}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Precio Venta</label>
                            <input
                                type='number'
                                value={data.precio_venta}
                                onChange={(e) => setData('precio_venta', Number(e.target.value))}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                            {errors.precio_venta && <span className="text-red-500 text-xs mt-0.5">{errors.precio_venta}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Stock Actual</label>
                            <input
                                type='number'
                                value={data.stock_actual}
                                onChange={(e) => setData('stock_actual', Number(e.target.value))}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                            {errors.stock_actual && <span className="text-red-500 text-xs mt-0.5">{errors.stock_actual}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 border-t border-orange-100 mt-6">
                        <Link 
                            href="/productos" 
                            className="w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm font-semibold text-center transition-colors"
                        >
                            Cancelar
                        </Link>
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white shadow-sm font-semibold text-sm px-5 py-2"
                        >
                            {processing ? 'Guardando...' : 'Registrar Producto'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}