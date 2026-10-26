import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

type SexoMascota = 'Macho' | 'Hembra';
type Estados = 'pendiente' | 'completado' | 'cancelado';

interface Cliente{
    id: number;
    nombre: string;
    email: string;
}

interface Especie {
  id: number;
  nombre: string;
}

interface Raza {
    id: number;
    nombre: string;
    especie?: Especie;
}

interface Mascota {
    id: number;
    cliente: Cliente;
    nombre: string;
    sexo: SexoMascota;
    edad: number;
    foto: string | null;
    raza?: Raza | null;
}

interface Producto{
    id: number;
    nombre_producto: string;
    tipo_producto: string;
    precio_venta: number;
    stock_actual: number;
}

interface Detalle_Consulta {
    producto_id: number | '';
    dosis: number | '';
    cantidad: number;
    indicaciones: string;
}

interface Consulta{
    id: number;
    fecha_hora: string;
    motivo_consulta: string;
    diagnostico: string;
    peso: number;
    estado: string;
    observaciones: string;
    mascota: Mascota;

    detalles_consulta?: 
    {
        producto_id: number;
        dosis: number;
        cantidad: number;
        indicaciones: string;
    }[];
}

interface editProps {
  consulta: Consulta;
  estados: Estados[];
  productos: Producto[];
}

export default function Edit({consulta, estados, productos}: editProps) {
    const {data,setData, put,processing,errors} = useForm({
        diagnostico: consulta.diagnostico ?? '',
        peso: consulta.peso ?? 0,
        estado: consulta.estado as Estados,
        observaciones: consulta.observaciones ?? '',

        detalles: consulta.detalles_consulta?.map(detalle => ({
            producto_id: detalle.producto_id,
            dosis: detalle.dosis,
            cantidad: detalle.cantidad,
            indicaciones: detalle.indicaciones ?? ''
        })) as Detalle_Consulta[] ?? []
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/veterinario/consultas/${consulta.id}`);
    };

    const agregarProducto = () => {
        setData('detalles', [
            ...data.detalles, {producto_id: '', dosis: '', cantidad: 1, indicaciones: ''}
        ]);
    }

    const eliminarDetalle = (index: number) => {
        const nuevo = data.detalles.filter((_, i) => i !== index);
        setData('detalles', nuevo);
    };

    const actualizarProducto = (index: number, campo: string , diferente: any) => {
        const nuevo = [...data.detalles];
        nuevo[index] = {
            ...nuevo[index],
            [campo]: diferente,
        };
        setData('detalles', nuevo);
    }

    return(
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Completar Consulta </span></h1>
            </div>
            <div>

            </div>
            <div className="min-h-screen flex bg-gray-100">
                <form className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4" onSubmit={submit}>
                    <div>
                        <label> Motivo de la Consulta </label>
                        <p className="text-gray-700 bg-gray-50 p-2 rounded border">{consulta.motivo_consulta}</p>
                    </div>
                    <div>
                        <label> Peso de la Mascota: </label>
                        <input
                            type='number'
                            value={data.peso}
                            onChange={(e) => setData('peso', Number(e.target.value))}
                        />
                        {errors.peso && <span className="text-red-500 text-sm">{errors.peso}</span>}
                    </div>
                    <div>
                        <label> Diagnostico: </label>
                        <textarea
                            value={data.diagnostico}
                            onChange={(e) => setData('diagnostico', e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.diagnostico && <span className="text-red-500 text-sm">{errors.diagnostico}</span> }
                    </div>
                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-3">
                            <label> Receta y Productos Aplicados </label>
                            <Button 
                                type="button" 
                                onClick={agregarProducto}
                                className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3"
                            >
                                + Agregar Producto
                            </Button>
                            {data.detalles.length === 0 ? (
                                <p>No se han agregado productos o medicamentos a esta consulta.</p>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {data.detalles.map((detalle, i) => (
                                        <div key={i} className="flex flex-col gap-3 p-3">
                                            <div>
                                                <label> Productos y Medicamentos</label>
                                                <select
                                                    value={detalle.producto_id}
                                                    onChange={(e) => actualizarProducto(i, 'producto_id', Number(e.target.value))}
                                                    className="w-full border rounded p-1.5 text-sm bg-white"
                                                >
                                                    <option value="">Seleccione un producto</option>
                                                    {productos.map((prod) => (
                                                        <option key={prod.id} value={prod.id}>
                                                            {prod.nombre_producto} ({prod.tipo_producto})
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors[`detalles.${i}.producto_id`] && <span className="text-red-500 text-sm"> {errors[`detalles.${i}.producto_id`]} </span> }
                                            </div>
                                            <div>
                                                <label> Dosis: </label>
                                                <input
                                                    type='number'
                                                    value={detalle.dosis}
                                                    onChange={(e) => actualizarProducto(i, 'dosis', Number(e.target.value))}
                                                />
                                                {errors[`detalles.${i}.dosis`] && <span className="text-red-500 text-sm"> {errors[`detalles.${i}.dosis`]} </span> }
                                            </div>
                                            <div>
                                                <label> Cantidad: </label>
                                                <input
                                                    type='number'
                                                    value={detalle.cantidad}
                                                    onChange={(e) => actualizarProducto(i, 'cantidad', Number(e.target.value))}
                                                />
                                                {errors[`detalles.${i}.cantidad`] && <span className="text-red-500 text-sm"> {errors[`detalles.${i}.cantidad`]} </span> }
                                            </div>
                                            <div>
                                                <label> Indicaciones: </label>
                                                <textarea
                                                    value={detalle.indicaciones}
                                                    onChange={(e) => actualizarProducto(i, 'indicaciones', e.target.value)}
                                                    className="w-full border rounded p-2"
                                                />
                                                {errors[`detalles.${i}.indicaciones`] && <span className="text-red-500 text-sm"> {errors[`detalles.${i}.indicaciones`]} </span> }
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => eliminarDetalle(i)}
                                                className="text-red-600 hover:text-red-800 font-bold px-2 py-1 mt-5 md:mt-0 text-sm"
                                                title="Eliminar ítem"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="font-semibold block mb-1">Observaciones:</label>
                        <textarea
                            value={data.observaciones}
                            onChange={(e) => setData('observaciones', e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.observaciones && <span className="text-red-500 text-sm">{errors.observaciones}</span>}
                    </div>
                    <div>
                        <label> Estado: </label>
                        <select
                            value={data.estado}
                            onChange={(e) => setData('estado', e.target.value as Estados)}
                        >
                            {estados.map((est) => (
                                <option key={est} value={est}>
                                    {est}
                                </option>
                            ))}
                        </select>
                        {errors.estado && <span className="text-red-500 text-sm">{errors.estado}</span> }
                    </div>
                    <div className="flex gap-4 mt-4">
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {processing ? 'Guardando...' : 'Editar Consulta'}
                        </Button>
                        <Link href="/veterinario/consultas" className="px-4 py-2 bg-gray-300 rounded-md text-gray-700">
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}