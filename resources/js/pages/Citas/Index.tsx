import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

type SexoMascota = 'Macho' | 'Hembra';

interface Usuario{
    id: number;
    name: string;
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
    nombre: string;
    sexo: SexoMascota;
    edad: number;
    foto: string | null;
    raza?: Raza | null;
}

interface Cliente{
    id: number;
    nombre: string;
    email: string;
}

interface Veterinario{
    id: number;
    user: Usuario;
    telefono: string;
    matricula: string;
    especialidad: string;
}

interface Cita{
    id: number;
    cliente: Cliente;
    veterinario: Veterinario;
    mascota: Mascota;
    fecha_hora: string;
    motivo: string;
    estado: string;
}

interface indexProps{
    citas: Cita[];
    flash?:
    {
        success?: string;
    }
}

export default function Index({citas, flash}: indexProps){
    
    return(
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold"> Citas Hechas: </span></h1>
            </div>
            <div className="bg-orange-300 flex justify-between items-center">
                <Button 
                    asChild 
                    className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
                > 
                    <Link href={`/citas/create`}>
                        Realizar una cita
                    </Link> 
                </Button>
            </div>
            <div className="min-h-screen flex bg-gray-100">
                {flash?.success && <div>{flash.success}</div>}
                <ul className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4">
                    {citas.map((cita) => (
                        <li key={cita.id} className="mb-4 p-4 border bg-orange-100">
                            <div className="flex-1 flex-col items-start gap-1 ">
                                <h2 className="text-lg"> <span className="font-bold">Citas para Programar:</span></h2>
                                <h2 className="text-lg"> <span className="font-bold">Fecha:</span> {new Date(cita.fecha_hora).toLocaleString()}</h2>
                                <h2 className="text-lg"> <span className="font-bold">Nombre del Cliente:</span> {cita.cliente.nombre}</h2>
                                <h2 className="text-lg"> 
                                    <span className="font-bold">Mascota del Cliente:</span>
                                    {cita.mascota.nombre}
                                    {cita.mascota.raza && ` (${cita.mascota.raza.nombre} - ${cita.mascota.raza.especie?.nombre})`}
                                </h2>
                                <h2 className="text-lg"> <span className="font-bold">Veterinario asignado:</span> {cita.veterinario.user.name} {(cita.veterinario.especialidad)} </h2>
                                <h2 className="text-lg"> <span className="font-bold">Motivo de la consulta:</span> {cita.motivo}</h2>
                                <h2 className="text-lg"> <span className="font-bold">Estado:</span> {cita.estado}</h2>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}