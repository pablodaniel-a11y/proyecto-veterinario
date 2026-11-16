import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { Plus, X } from "lucide-react";
import { FormEvent } from "react";
import { SelectorProducto } from "@/components/SelectorProducto";

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
    es_externo: boolean;
    producto_id: number | '';
    nombre_medicamento: string;
    dosis: number | '';
    cantidad: number;
    indicaciones: string;
}

interface Consulta{
    id: number;
    fecha_hora: string;
    motivo_consulta: string;
    diagnostico: string | null;
    tratamiento: string | null;
    peso: number | null;
    estado: string;
    observaciones: string | null;
    mascota: Mascota;

    detalles_consultas?: 
    {
        id?: number;
        producto_id: number | null;
        nombre_medicamento: string | null;
        dosis: number;
        cantidad: number;
        indicaciones: string | null;
        producto?: Producto | null;
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
        tratamiento: consulta.tratamiento ?? '',
        peso: consulta.peso ?? 0,
        estado: consulta.estado as Estados,
        observaciones: consulta.observaciones ?? '',

        detalles: consulta.detalles_consultas?.map(detalle => ({
            es_externo: !detalle.producto_id && Boolean(detalle.nombre_medicamento),
            producto_id: detalle.producto_id ?? '',
            nombre_medicamento: detalle.nombre_medicamento ?? '',
            dosis: detalle.dosis ?? '',
            cantidad: detalle.cantidad ?? 1,
            indicaciones: detalle.indicaciones ?? ''
        })) as Detalle_Consulta[] ?? []
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/veterinario/consultas/${consulta.id}`);
    };

    const agregarProducto = () => {
        setData('detalles', [
            ...data.detalles, { es_externo: false, producto_id: '', nombre_medicamento: '', dosis: '', cantidad: 1, indicaciones: ''}
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

    const cambiarTipoMedicamento = (index: number, esExterno: boolean) => {
        const nuevo = [...data.detalles];
        nuevo[index] = {
            ...nuevo[index],
            es_externo: esExterno,
            producto_id: esExterno ? '' : nuevo[index].producto_id,
            nombre_medicamento: esExterno ? nuevo[index].nombre_medicamento : '',
        };
        setData('detalles', nuevo);
    };

    return(
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 w-full">
            <div className="bg-white border border-orange-200 rounded-xl p-6 sm:p-8 shadow-sm">
                <div className="border-b border-orange-100 pb-4 mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Atender Consulta
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Modifica los campos necesarios y guarda los cambios de la consulta.</p>
                </div>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Motivo de la Consulta</label>
                            <div className="bg-orange-50/60 border border-orange-200 rounded-lg p-3.5 text-sm text-gray-800">
                                {consulta.motivo_consulta || 'Sin motivo especificado'}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Peso de la Mascota (kg):</label>
                            <input
                                type='number'
                                value={data.peso}
                                onChange={(e) => setData('peso', Number(e.target.value))}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                            {errors.peso && (<span className="text-red-500 text-xs mt-0.5">{errors.peso}</span>)}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Estado de la Consulta:</label>
                            <select
                                value={data.estado}
                                onChange={(e) => setData('estado', e.target.value as Estados)}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            >
                                {estados.map((est) => (
                                    <option key={est} value={est}>
                                        {est}
                                    </option>
                                ))}
                            </select>
                            {errors.estado && (<span className="text-red-500 text-xs mt-0.5">{errors.estado}</span>) }
                        </div>
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Diagnóstico Clínico:</label>
                            <textarea
                                value={data.diagnostico}
                                onChange={(e) => setData('diagnostico', e.target.value)}
                                rows={3}
                                placeholder="Escribe el diagnóstico clínico..."
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                            {errors.diagnostico && (<span className="text-red-500 text-xs mt-0.5">{errors.diagnostico}</span>)}
                        </div>
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Tratamiento / Plan Terapéutico:</label>
                            <textarea
                                value={data.tratamiento}
                                onChange={(e) => setData('tratamiento', e.target.value)}
                                rows={3}
                                placeholder="Indica el procedimiento realizado, cuidados en casa, dieta o frecuencia de curaciones..."
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                            {errors.tratamiento && (<span className="text-red-500 text-xs mt-0.5">{errors.tratamiento}</span>)}
                        </div>
                        <div className="flex flex-col gap-3 sm:col-span-2 border-t border-orange-100 pt-5 mt-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 block">Receta Médica y Productos</label>
                                    <span className="text-xs text-gray-500">
                                        Selecciona productos del catálogo o escribe medicamentos externos.
                                    </span>
                                </div>
                                <Button
                                    type="button"
                                    onClick={agregarProducto}
                                    className="bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 shadow-none font-semibold text-xs px-3.5 py-2 self-start sm:self-auto transition-colors"
                                >
                                    <Plus className="w-4 h-4"/>
                                    Agregar Producto
                                </Button>
                            </div>
                            {data.detalles.length === 0 ? (
                                <div className="bg-gray-50 border border-dashed border-gray-200 rounded-lg p-4 text-center text-xs text-gray-500 italic">
                                    No se han agregado productos o medicamentos a esta consulta.
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {data.detalles.map((detalle, i) => (
                                        <div key={i} className="relative bg-orange-50/40 border border-orange-200 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                                            <div className="sm:col-span-12 flex items-center gap-2 pb-1 border-b border-orange-100">
                                                <span className="text-xs font-semibold text-gray-600">Origen:</span>
                                                <button
                                                    type="button"
                                                    onClick={() => cambiarTipoMedicamento(i, false)}
                                                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                                                        !detalle.es_externo ? 'bg-orange-600 text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    Del catálogo
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => cambiarTipoMedicamento(i, true)}
                                                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                                                        detalle.es_externo ? 'bg-orange-600 text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    Medicamento externo
                                                </button>
                                            </div>
                                            <div className="flex flex-col gap-1 sm:col-span-6">
                                                <label className="text-sm font-semibold text-gray-700"> {detalle.es_externo ? 'Nombre del Medicamento' : 'Producto / Medicamento'} </label>
                                                {detalle.es_externo ? (
                                                    <div>
                                                        <input
                                                            type="text"
                                                            value={detalle.nombre_medicamento}
                                                            onChange={(e) => actualizarProducto(i, 'nombre_medicamento', e.target.value)}
                                                            placeholder="Ej: Amoxicilina 500mg jarabe..."
                                                            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                        />
                                                        {errors[`detalles.${i}.nombre_medicamento`] && (<span className="text-red-500 text-xs">{errors[`detalles.${i}.nombre_medicamento`]}</span>)}
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <SelectorProducto
                                                            productos={productos}
                                                            value={detalle.producto_id}
                                                            onChange={(nuevoId) => actualizarProducto(i, 'producto_id', nuevoId)}
                                                        />
                                                        {errors[`detalles.${i}.producto_id`] && (<span className="text-red-500 text-xs">{errors[`detalles.${i}.producto_id`]}</span>)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-1 sm:col-span-3">
                                                <label className="text-sm font-semibold text-gray-700">Dosis</label>
                                                <input
                                                    type='number'
                                                    value={detalle.dosis}
                                                    onChange={(e) => actualizarProducto(i, 'dosis', Number(e.target.value))}
                                                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                />
                                                {errors[`detalles.${i}.dosis`] && (<span className="text-red-500 text-sm"> {errors[`detalles.${i}.dosis`]} </span>)}
                                            </div>
                                            <div className="flex flex-col gap-1 sm:col-span-3">
                                                <label className="text-sm font-semibold text-gray-700">Cantidad</label>
                                                <input
                                                    type='number'
                                                    value={detalle.cantidad}
                                                    onChange={(e) => actualizarProducto(i, 'cantidad', Number(e.target.value))}
                                                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                />
                                                {errors[`detalles.${i}.cantidad`] && (<span className="text-red-500 text-sm"> {errors[`detalles.${i}.cantidad`]} </span>)}
                                            </div>
                                            <div className="flex flex-col gap-1 sm:col-span-12">
                                                <label className="text-sm font-semibold text-gray-700">Indicaciones</label>
                                                <textarea
                                                    value={detalle.indicaciones}
                                                    onChange={(e) => actualizarProducto(i, 'indicaciones', e.target.value)}
                                                    rows={2}
                                                    placeholder="Frecuencia, vía de administración, duración..."
                                                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                />
                                                {errors[`detalles.${i}.indicaciones`] && (<span className="text-red-500 text-sm"> {errors[`detalles.${i}.indicaciones`]} </span>)}
                                            </div>
                                            <div className="sm:col-span-12 pt-1">
                                                <button
                                                    type="button"
                                                    onClick={() => eliminarDetalle(i)}
                                                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 bg-red-50/70 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                    Eliminar producto
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )} 

                            <div className="flex flex-col gap-1.5 sm:col-span-2">
                                <label className="text-sm font-semibold text-gray-700">Observaciones:</label>
                                <textarea
                                    value={data.observaciones}
                                    onChange={(e) => setData('observaciones', e.target.value)}
                                    rows={3}
                                    placeholder="Notas adicionales o recomendaciones para el dueño..."
                                    className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                />
                                {errors.observaciones && (<span className="text-red-500 text-xs mt-0.5">{errors.observaciones}</span>)}
                            </div>
                            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 border-t border-orange-100 mt-6">
                                <Link
                                    href="/veterinario/consultas"
                                    className="w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm font-semibold text-center transition-colors"
                                >
                                    Cancelar
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white shadow-sm font-semibold text-sm px-5 py-2"
                                >
                                    {processing ? 'Guardando...' : 'Completar Consulta'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}