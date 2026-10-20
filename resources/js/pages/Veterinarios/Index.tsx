import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { Plus, Trash2 } from "lucide-react";

interface Usuario{
    id: number;
    name: string;
    email: string;
}

interface Veterinario{
    id: number;
    user: Usuario;
    telefono: string;
    matricula: string;
    especialidad: string;
}

interface indexProps{
    veterinarios: Veterinario[];
    flash?:{
        success?: string;
    };
}

export default function Index({veterinarios, flash}: indexProps){

    const eliminar = (id:number) => {
        if (confirm('¿Está seguro de eliminar esta mascota?')) {
            router.delete(`/veterinarios/${id}`);
        }
    };

    return(
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Personal de la Veterinaria</span></h1>
            </div>
            <div className="bg-orange-300">
                <Button 
                    asChild 
                    className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
                > 
                    <Link href={`/veterinarios/create`}>
                        Agregar un Nuevo Perfil
                    </Link> 
                </Button>
            </div>
             {flash?.success && <div>{flash.success}</div>}
            <div className="bg-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                {veterinarios.map((veterinario) => (
                    <div key={veterinario.id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-800">{veterinario.user.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">{veterinario.user.email}</p>
                        <div className="bg-gray-50 border border-gray-200/60 rounded-md p-4 space-y-2 text-sm text-gray-700">
                            <p><span className="font-medium"> Especialidad: </span> {veterinario.especialidad}</p>
                            <p><span className="font-medium"> Matrícula: </span> {veterinario.matricula}</p>
                            <p><span className="font-medium"> Teléfono: </span> {veterinario.telefono}</p>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <Button 
                                asChild 
                                className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
                            > 
                                <Link href={`/veterinarios/${veterinario.id}/edit`}> 
                                    <Plus className="w-4 h-4 mr-2" /> 
                                    Editar Perfil
                                </Link> 
                            </Button>
                            <Button  
                                className="bg-red-600 hover:bg-red-700 text-white shadow-sm"
                                onClick={() => eliminar(veterinario.id)}
                            >
                                <Trash2 className="mr-1.5 h-4 w-4" />
                                Eliminar Perfil
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}