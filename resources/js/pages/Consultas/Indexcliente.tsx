import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";

type SexoMascota = 'Macho' | 'Hembra';

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
    id: number;
    dosis: number;
    cantidad: number;
    indicaciones: string | null;
    producto: Producto;
}

interface Consulta{
    id: number;
    fecha_hora: Date;
    motivo_consulta: string;
    diagnostico: string;
    peso: number;
    estado: string;
    observaciones: string;
    detalles_consultas?: Detalle_Consulta[];
}

interface indexProps {
    mascota: Mascota;
    consultas: Consulta[];
    flash?:{
        success?: string;
    };
}

export default function Indexcliente({ mascota, consultas, flash }: indexProps) {
  return (
    <div>
        <div className="h-15 flex bg-orange-200">
            <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Consultas de: {mascota.nombre}</span></h1>
        </div>
        <div className="bg-orange-300 flex justify-between items-center">
            <Button 
                asChild 
                className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
            > 
                <Link href={`/mascotas/${mascota.id}/consultas/create`}>
                    Realizar una Consulta
                </Link> 
            </Button>
            <Button 
                asChild 
                className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
            > 
                <Link href={`/mascotas`}>
                    Volver
                </Link> 
            </Button>
        </div>
        <div className="min-h-screen flex bg-gray-100">
            {flash?.success && <div>{flash.success}</div>}
            <ul className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4">
                {consultas.map((consulta) => (
                    <li key={consulta.id}>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 flex-col items-start gap-1 ">
                                <h2 className="text-lg"> <span className="font-bold">Datos de la Consulta:</span></h2>
                                <h2 className="text-lg"> <span className="font-bold">Fecha y Hora:</span> {new Date(consulta.fecha_hora).toLocaleString()}</h2>
                                <h2 className="text-lg"> <span className="font-bold">Motivo de la Consulta:</span> {consulta.motivo_consulta}</h2>
                                <h2 className="text-lg"> <span className="font-bold">Diagnostico:</span> {consulta.diagnostico}</h2>
                                <h2 className="text-lg"> <span className="font-bold">Peso:</span> {consulta.peso}</h2>
                                <h2 className="text-lg"> <span className="font-bold">Estado:</span> {consulta.estado}</h2>
                                <h2 className="text-lg"> <span className="font-bold">Observaciones:</span> {consulta.observaciones}</h2>
                                <div className="mt-3 pt-3 border-t">
                                <h3 className="font-bold text-gray-800 mb-2">Medicamentos / Productos Recetados:</h3>
                                
                                {consulta.detalles_consultas && consulta.detalles_consultas.length > 0 ? (
                                    <ul className="flex flex-col gap-2">
                                        {consulta.detalles_consultas.map((detalle) => (
                                            <li key={detalle.id} className="rounded border text-sm flex flex-col gap-1 p-1">
                                                <div className="flex justify-between">
                                                    <h3><span> {detalle.producto.nombre_producto} ({detalle.producto.tipo_producto}) </span></h3>
                                                    <h3><span> Cantidad: {detalle.cantidad}</span></h3>
                                                </div>
                                                <div>
                                                    <h3><span><strong>Dosis:</strong> {detalle.dosis}</span></h3>
                                                    {detalle.indicaciones && <span className="ml-3"><strong>Indicaciones:</strong> {detalle.indicaciones}</span>}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400 text-sm italic">No se recetaron productos en esta consulta.</p>
                                )}
                            </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  );
}