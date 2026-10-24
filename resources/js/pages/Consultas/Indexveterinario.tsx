import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { Plus } from "lucide-react";

type SexoMascota = 'Macho' | 'Hembra';

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

interface Consulta{
    id: number;
    fecha_hora: string;
    motivo_consulta: string;
    diagnostico: string;
    peso: number;
    estado: string;
    observaciones: string;
    mascota: Mascota;
}

interface indexProps {
    consultas: Consulta[];
    flash?:{
        success?: string;
    };
}

export default function Index({ consultas, flash }: indexProps) {

    return (
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Consultas para Gestionar</span></h1>
            </div>
            <div className="min-h-screen flex bg-gray-100">
                {flash?.success && <div>{flash.success}</div>}
                <ul className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4">
                    {consultas.map((consulta) => (
                        <li key={consulta.id}>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 flex-col items-start gap-1 border border-black rounded-md p-4">

                                    <h2 className="text-lg"> <span className="font-bold">Datos de la Consulta:</span></h2>
                                    <h2 className="text-lg"> <span className="font-bold">Fecha y Hora:</span> {new Date(consulta.fecha_hora).toLocaleString()}</h2>
                                    <h2 className="text-lg"> <span className="font-bold">Motivo de la Consulta:</span> {consulta.motivo_consulta}</h2>
                                    <h2 className="text-lg"> <span className="font-bold">Diagnostico:</span> {consulta.diagnostico}</h2>
                                    <h2 className="text-lg"> <span className="font-bold">Peso:</span> {consulta.peso}</h2>
                                    <h2 className="text-lg"> <span className="font-bold">Estado:</span> {consulta.estado}</h2>
                                    <h2 className="text-lg"> <span className="font-bold">Observaciones:</span> {consulta.observaciones}</h2>
                                
                                    <div className="bg-gray-50 border border-gray-200/60 rounded-md p-4 space-y-2 text-sm text-gray-700">

                                        <h3 className="text-base font-bold">Datos del Cliente:</h3>
                                        <p><span className="font-bold">Nombre:</span> {consulta.mascota.cliente.nombre}</p>
                                        <p><span className="font-bold">Correo Electrónico:</span> {consulta.mascota.cliente.email}</p>
        
                                        <h3 className="text-base font-bold mt-2">Datos de la Mascota:</h3>
                                        <p><span className="font-bold">Nombre:</span> {consulta.mascota.nombre}</p>
                                        <p><span className="font-bold">Edad:</span> {consulta.mascota.edad} </p>
                                        <p><span className="font-bold">Sexo:</span> {consulta.mascota.sexo}</p>
                                        <p><span className="font-bold">Especie:</span> {consulta.mascota.raza?.especie?.nombre ?? 'No especificada'}</p>
                                        <p><span className="font-bold">Raza:</span> {consulta.mascota.raza?.nombre ?? 'No especificada'}</p>

                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Button 
                                            asChild 
                                            className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
                                        > 
                                            <Link href={`/veterinario/consultas/${consulta.id}/edit`}> 
                                                <Plus className="w-4 h-4 mr-2" /> 
                                                Responder Consulta
                                            </Link> 
                                        </Button>
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