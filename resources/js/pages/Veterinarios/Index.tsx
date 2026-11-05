import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { Pencil, Plus, Trash2, UserPlus, UserX } from "lucide-react";
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
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    
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
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="bg-orange-200 shadow-sm border-b border-orange-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col justify-between items-center gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">
                        Personal de la Veterinaria
                    </h1>
                    { can('crear veterinario') && (
                    <div className="bg-orange-200 p-2">
                        <Button 
                            asChild 
                            className="bg-orange-600 hover:bg-orange-700 text-white"
                        > 
                            <Link href={`/veterinarios/create`}>
                                <UserPlus className="w-4 h-4 mr-2" />
                                Incorporar Profesional
                            </Link> 
                        </Button>
                    </div>
                    )}
                </div>
            </div>
            <div className="bg-orange-100 border-b border-orange-200 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <button
                        onClick={() => setMostrarFiltros(!mostrarFiltros)}
                        type="button"
                        className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-colors text-sm"
                    >
                        <svg className={`w-4 h-4 transition-transform duration-200 ${mostrarFiltros ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                        {mostrarFiltros ? 'Ocultar Filtros' : 'Filtrar Profesionales'}
                    </button>
                    <div className={`w-full transition-all duration-300 ease-in-out overflow-hidden ${mostrarFiltros ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                        <form onSubmit={aplicarFiltros} className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 items-center bg-white/60 p-4 rounded-xl border border-orange-200 shadow-inner"> 
                            <input 
                                type="text" 
                                value={buscarname} 
                                onChange={(e) => setBuscarname(e.target.value)} 
                                placeholder="Ingresar Nombre del Profesional..." 
                                className="w-full sm:flex-1 rounded-lg border-orange-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm bg-white p-2.5"
                            /> 
                            <select
                                value={especialidadbus}
                                onChange={(e) => setEspecialidadbus(e.target.value)}
                                className="w-full sm:w-auto rounded-lg border-orange-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm bg-white p-2.5 min-w-[220px]"
                            >
                                <option value="">Todas las Especialidades</option>
                                {especialidades.map((es, i) => (
                                    <option key={i} value={es}>
                                        {es}
                                    </option>
                                ))}
                            </select>
                            <button 
                                type="submit" 
                                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-sm transition-colors"
                            >
                                Aplicar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg shadow-sm flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">{mensaje}</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
                <FlashMessage />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {veterinarios.data.map((veterinario) => (
                        <div key={veterinario.id} className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-xl p-6 border border-gray-200 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{veterinario.user.name}</h3>
                                <p className="text-sm text-gray-500 mb-4">{veterinario.user.email}</p>
                                <div className="bg-orange-50/50 border border-orange-100 rounded-lg p-4 space-y-2 text-sm text-gray-700">
                                    <p><span className="font-semibold text-gray-900">Especialidad:</span> {veterinario.especialidad}</p>
                                    <p><span className="font-semibold text-gray-900">Matrícula:</span> {veterinario.matricula}</p>
                                    <p><span className="font-semibold text-gray-900">Teléfono:</span> {veterinario.telefono}</p>
                                </div>    
                            </div>
                            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t border-gray-100">
                                {(can('editar veterinario') && (user?.id === veterinario.user?.id || can('crear veterinario'))) && (
                                <Button 
                                    asChild 
                                    className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
                                > 
                                    <Link href={`/veterinarios/${veterinario.id}/edit`}> 
                                        <Pencil className="w-4 h-4 mr-2" /> 
                                        Actualizar Información
                                    </Link> 
                                </Button>
                                )}
                                {can('eliminar veterinario') && (
                                <Button  
                                    className="bg-red-600 hover:bg-red-700 text-white shadow-sm"
                                    onClick={() => eliminar(veterinario.id)}
                                >
                                    <UserX className="mr-1.5 h-4 w-4" />
                                    Dar de baja
                                </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {veterinarios.last_page > 1 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center gap-4 mt-8 bg-white p-4 rounded-xl border border-gray-200 shadow-sm max-w-md mx-auto">
                        {veterinarios.prev_page_url && ( 
                            <button 
                                type="button" 
                                onClick={() => router.get(veterinarios.prev_page_url!)}
                                className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 text-sm font-semibold rounded-lg transition-colors border border-orange-200"
                            > 
                                Anterior 
                            </button> 
                        )}
                        <span className="text-sm font-medium text-gray-700"> 
                            Página {veterinarios.current_page} de {veterinarios.last_page} 
                        </span>
                        {veterinarios.next_page_url && ( 
                            <button 
                                type="button" 
                                onClick={() => router.get(veterinarios.next_page_url!)}
                                className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 text-sm font-semibold rounded-lg transition-colors border border-orange-200"
                            > 
                                Siguiente 
                            </button> 
                        )} 
                    </div>
                </div>
            )}
        </div>
    );
}