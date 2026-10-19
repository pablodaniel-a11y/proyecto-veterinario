import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { ImageIcon, Plus, Trash2 } from "lucide-react";

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

interface indexProps {
    mascotas: Mascota[];
    flash?:{
        success?: string;
    };
}

export default function Index({mascotas, flash} : indexProps){



    const eliminar = (id:number) => {
        if (confirm('¿Está seguro de eliminar esta mascota?')) {
            router.delete(`/mascotas/${id}`);
        }
    };

    return(
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Carnet de Mascotas</span></h1>
            </div>
            <div className="bg-orange-300">
                <Button 
                    asChild 
                    className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
                > 
                    <Link href={`/mascotas/create`}>
                        Agregar una Mascota Nueva
                    </Link> 
                </Button>
            </div>
            <div className="min-h-screen flex bg-gray-100">
                {flash?.success && <div>{flash.success}</div>}
                <ul className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4">
                    {mascotas.map((mascota) => (
                        <li key={mascota.id} className="mb-4 p-4 border bg-orange-100">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                    {mascota.foto ? (
                                        <img
                                            src={`/storage/${mascota.foto}`}
                                            alt={`Foto de ${mascota.nombre}`}
                                            className="w-50 h-30"
                                        >
                                        </img>
                                    ) : (
                                        <div className="w-50 h-45 bg-gray-200 flex items-center justify-center border-dashed border-gray-300">
                                            <ImageIcon className="w-8 h-8 stroke-[1.5]" />
                                            <span className="text-xs">Sin foto</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 flex-col items-start gap-1 ">
                                    <h2 className="text-lg"> <span className="font-bold">Datos de la Mascota:</span></h2>
                                    <h2 className="text-lg"> <span className="font-bold">Nombre:</span> {mascota.nombre}</h2>
                                    <h2 className="text-lg"> <span className="font-bold">Edad:</span> {mascota.edad}</h2>
                                    <h2 className="text-lg"> <span className="font-bold">Sexo:</span> {mascota.sexo}</h2>
                                    <h2 className="text-lg"> <span className="font-bold">Especie:</span> {mascota.raza?.especie?.nombre}</h2>
                                    <h2 className="text-lg"> <span className="font-bold">Raza:</span> {mascota.raza?.nombre}</h2>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Button 
                                        asChild 
                                        className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
                                    > 
                                        <Link href={`/mascotas/${mascota.id}/edit`}> 
                                            <Plus className="w-4 h-4 mr-2" /> 
                                            Editar Mascota
                                        </Link> 
                                    </Button>
                                    <Button  
                                        className="bg-red-600 hover:bg-red-700 text-white shadow-sm"
                                        onClick={() => eliminar(mascota.id)}
                                    >
                                        <Trash2 className="mr-1.5 h-4 w-4" />
                                        Eliminar Mascota
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}