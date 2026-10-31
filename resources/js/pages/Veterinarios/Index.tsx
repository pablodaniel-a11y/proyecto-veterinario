import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { Plus, Trash2 } from "lucide-react";
import { useAuth } from '@/hooks/use-auth';
import FlashMessage from '@/components/FlashMessage';
import { FormEvent, useState } from "react";

interface Filtro {
    buscarname?: string;
    especialidadbus?: string;
}

interface Usuario{
    id: number;
    name: string;
    email: string;
}

interface Veterinario{
    id: number;
    user_id: number;
    user: Usuario;
    telefono: string;
    matricula: string;
    especialidad: string;
}

interface VeterinariosPaginados { 
    data: Veterinario[]; 
    current_page: number; 
    last_page: number; 
    per_page: number; 
    total: number; 
    from: number | null; 
    to: number | null; 
    prev_page_url: string | null; 
    next_page_url: string | null; 
}

interface indexProps{
    veterinarios: VeterinariosPaginados;
    especialidades: string[];
    filtros?: Filtro;
    flash?:{
        success?: string;
    };
}

export default function Index({veterinarios, especialidades, filtros, flash}: indexProps){

    let mensaje="";
    if(veterinarios.total === 0){
        mensaje="Aún no tienes Especialistas registrados.";
    }else{
        if (veterinarios.total === 1){
            mensaje="Mostrando tu unico Especialista.";
        }else{
            mensaje=`Mostrando ${veterinarios.from} a ${veterinarios.to} de ${veterinarios.total} Profecionales`;
        }
    }

    const { can, user} = useAuth();
    const [buscarname, setBuscarname] = useState(filtros?.buscarname ?? ''); 
    const [especialidadbus, setEspecialidadbus] = useState(filtros?.especialidadbus ?? '');
    
    const eliminar = (id:number) => {
        if (confirm('¿Está seguro de eliminar este perfil?')) {
            router.delete(`/veterinarios/${id}`);
        }
    };

    const aplicarFiltros = (e: FormEvent) => { 
        e.preventDefault(); 
     
        router.get('/veterinarios', { 
            buscarname, 
            especialidadbus,
        },{
            preserveState: true,
            preserveScroll: true,
        }); 
    };

    return(
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Personal de la Veterinaria</span></h1>
            </div>
            { can('crear veterinario') && (
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
            )}
            <div className="p-4 bg-orange-100 flex justify-center">
                <form onSubmit={aplicarFiltros} className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4"> 
                    <input 
                        type="text" 
                        value={buscarname} 
                        onChange={(e) => setBuscarname(e.target.value)} 
                        placeholder="Ingresar Nombre del Profecional..." 
                    /> 
                    <select
                        value={especialidadbus}
                        onChange={(e) => setEspecialidadbus(e.target.value)}
                    >
                        <option value="">Todas las Especialidad Disponibles</option>
                        {especialidades.map((es, i) => (
                            <option key={i} value={es}>
                                {es}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                        Buscar
                    </button>
                </form>
            </div>
            <div>
                <p>{mensaje}</p>
            </div>
            {veterinarios.last_page > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6 max-w-2xl mx-auto"> 
                {veterinarios.prev_page_url && ( 
                    <button 
                        type="button" 
                        onClick={() => router.get(veterinarios.prev_page_url!)} 
                    > 
                        Anterior 
                    </button> 
                )} 
 
                <span> 
                    Página {veterinarios.current_page} de {veterinarios.last_page} 
                </span> 
 
                {veterinarios.next_page_url && ( 
                    <button 
                        type="button" 
                        onClick={() => router.get(veterinarios.next_page_url!)} 
                    > 
                        Siguiente 
                    </button> 
                )} 
            </div>
            )}
            <FlashMessage />
            <div className="bg-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                {veterinarios.data.map((veterinario) => (
                    <div key={veterinario.id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-800">{veterinario.user.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">{veterinario.user.email}</p>
                        <div className="bg-gray-50 border border-gray-200/60 rounded-md p-4 space-y-2 text-sm text-gray-700">
                            <p><span className="font-medium"> Especialidad: </span> {veterinario.especialidad}</p>
                            <p><span className="font-medium"> Matrícula: </span> {veterinario.matricula}</p>
                            <p><span className="font-medium"> Teléfono: </span> {veterinario.telefono}</p>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            {(can('editar veterinario') && (user?.id === veterinario.user?.id || can('crear veterinario'))) && (
                            <Button 
                                asChild 
                                className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
                            > 
                                <Link href={`/veterinarios/${veterinario.id}/edit`}> 
                                    <Plus className="w-4 h-4 mr-2" /> 
                                    Editar Perfil
                                </Link> 
                            </Button>
                            )}
                            {can('eliminar veterinario') && (
                            <Button  
                                className="bg-red-600 hover:bg-red-700 text-white shadow-sm"
                                onClick={() => eliminar(veterinario.id)}
                            >
                                <Trash2 className="mr-1.5 h-4 w-4" />
                                Eliminar Perfil
                            </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}