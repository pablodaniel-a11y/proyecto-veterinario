import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { Check, ChevronDown, Plus, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

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

    detalles_consulta?: 
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

interface SelectorProductoProps {
    productos: Producto[];
    value: number | '';
    onChange: (productoId: number | '') => void;
}

export function SelectorProducto({productos, value, onChange }: SelectorProductoProps) {
    const productoActual= value!=='' ? productos.find((p) => p.id === Number(value)) : undefined;

    const [busqueda, setBusqueda]= useState(
        productoActual ? `${productoActual.nombre_producto} (${productoActual.tipo_producto})` : ''
    );
    const [abierto, setAbierto] = useState(false);

    useEffect(() => {
        if(value === ''){
            setBusqueda('');
            return;
        }
        const prod = productos.find((p) => p.id === Number(value));
        setBusqueda(prod ? `${prod.nombre_producto} (${prod.tipo_producto})` : '');
    }, [value, productos]);

    const productosFiltrados = productos.filter((prod) =>
        `${prod.nombre_producto} ${prod.tipo_producto}`
            .toLowerCase()
            .includes(busqueda.toLowerCase())
    );

    return (
        <div className="relative w-full">
            <div
                onClick={() => setAbierto(!abierto)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm flex items-center justify-between cursor-pointer focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition-all"
            >
                <input
                    type="text"
                    placeholder="Buscar producto o tipo..."
                    value={busqueda}
                    onChange={(e) => {
                        setBusqueda(e.target.value);
                        setAbierto(true);
                        if (e.target.value === '') {
                            onChange('');
                        }
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setAbierto(true);
                    }}
                    className="w-full outline-none bg-transparent cursor-text text-sm text-gray-900"
                />
                <ChevronDown className="w-4 h-4 text-gray-400 ml-2 shrink-0" />
            </div>
            {abierto && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setAbierto(false)}
                    />
                    <div className="absolute z-50 mt-1 w-full bg-white border border-orange-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {productosFiltrados.length === 0 ? (
                            <div className="px-3 py-2 text-sm text-gray-400 text-center">
                                No se encontraron productos
                            </div>
                        ) : (
                            productosFiltrados.map((prod) => {
                                const textoItem = `${prod.nombre_producto} (${prod.tipo_producto})`;
                                const seleccionado = value !== '' && Number(value) === prod.id;

                                return (
                                    <div
                                        key={prod.id}
                                        onClick={() => {
                                            onChange(prod.id);
                                            setBusqueda(textoItem);
                                            setAbierto(false);
                                        }}
                                        className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between gap-2 hover:bg-orange-50 ${
                                            seleccionado ? 'bg-orange-100 text-orange-900 font-medium' : 'text-gray-700'
                                        }`}
                                    >
                                        <div className="flex flex-col">
                                            <span>{textoItem}</span>
                                            <span
                                                className={`text-[11px] ${prod.stock_actual > 0 ? 'text-green-600' : 'text-amber-600'}`}
                                            >
                                                {prod.stock_actual > 0 ? `Stock disponible: ${prod.stock_actual}` : 'Sin stock en clínica (Solo referencia)'}
                                            </span>
                                        </div>
                                        {seleccionado && ( <Check className="w-4 h-4 text-orange-600 shrink-0" />)}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </>
            )}
        </div>
    );
}