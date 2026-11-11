import { Button } from "@/components/ui/button";
import { Head, Link, router } from "@inertiajs/react";
import { Check, ChevronDown, Pencil, UserPlus, UserX } from "lucide-react";
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

    const [busquedaEspecialidad, setBusquedaEspecialidad] = useState(filtros?.especialidadbus ?? '');
    const [abiertoEspecialidad, setAbiertoEspecialidad] = useState(false);

    const especialidadesFiltradas = especialidades.filter((es) =>
        es.toLowerCase().includes(busquedaEspecialidad.toLowerCase())
    );
    
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
            <Head title="Profesionales - Veterinaria Chiquititos" />
            <div className="bg-orange-200 shadow-sm border-b border-orange-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="w-full md:w-1/4 flex justify-start">
                            {!user && (
                            <Link 
                                href="/" 
                                className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-900 hover:underline transition"
                            >
                                ← Volver al inicio
                            </Link>
                            )}
                        </div>
                        <div className="w-full md:w-2/4 flex flex-col items-center text-center gap-3">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                                Personal de la Veterinaria
                            </h1>
                            {can('crear veterinario') && (
                                <Button 
                                    asChild 
                                    className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
                                > 
                                    <Link href={`/veterinarios/create`}>
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Incorporar Profesional
                                    </Link> 
                                </Button>
                            )}
                        </div>
                        <div className="w-full md:w-1/4 flex justify-end">
                            {!user && (
                            <span className="text-sm font-medium text-slate-700">
                                Veterinaria Chiquititos
                            </span>
                            )}
                        </div>
                    </div>
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
                    <div className={`w-full transition-all duration-300 ease-in-out ${mostrarFiltros ? 'max-h-[600px] opacity-100 mt-4 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        <form onSubmit={aplicarFiltros} className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 items-center bg-white/60 p-4 rounded-xl border border-orange-200 shadow-inner"> 
                            <input 
                                type="text" 
                                value={buscarname} 
                                onChange={(e) => setBuscarname(e.target.value)} 
                                placeholder="Ingresar Nombre del Profesional..." 
                                className="w-full sm:flex-1 rounded-lg border border-orange-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm bg-white p-2.5"
                            />

                            <div className="relative w-full sm:w-auto min-w-[240px]">
                                <div 
                                    onClick={() => setAbiertoEspecialidad(!abiertoEspecialidad)}
                                    className="w-full rounded-lg border border-orange-300 shadow-sm bg-white p-2.5 text-sm flex items-center justify-between cursor-pointer focus:ring-2 focus:ring-orange-500"
                                >
                                    <input
                                        type="text"
                                        placeholder="Buscar o filtrar especialidad..."
                                        value={busquedaEspecialidad}
                                        onChange={(e) => {
                                            setBusquedaEspecialidad(e.target.value);
                                            setAbiertoEspecialidad(true);
                                            if (e.target.value === '') {setEspecialidadbus('')};
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full outline-none bg-transparent cursor-text text-sm"
                                    />
                                    <ChevronDown className="w-4 h-4 text-gray-400 ml-2 shrink-0" />
                                </div>

                                {abiertoEspecialidad && (
                                    <div className="absolute z-50 mt-1 w-full bg-white border border-orange-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                        <div
                                            onClick={() => {
                                                setEspecialidadbus('');
                                                setBusquedaEspecialidad('');
                                                setAbiertoEspecialidad(false);
                                            }}
                                            className="px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 cursor-pointer font-medium border-b border-gray-100"
                                        >
                                            Todas las Especialidades
                                        </div>

                                        {especialidadesFiltradas.length === 0 ? (
                                            <div className="px-3 py-2 text-sm text-gray-400 text-center">
                                                No se encontraron especialidades
                                            </div>
                                        ) : (
                                            especialidadesFiltradas.map((es, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => {
                                                        setEspecialidadbus(es);
                                                        setBusquedaEspecialidad(es);
                                                        setAbiertoEspecialidad(false);
                                                    }}
                                                    className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-orange-50 ${
                                                        especialidadbus === es ? 'bg-orange-100 text-orange-900 font-medium' : 'text-gray-700'
                                                    }`}
                                                >
                                                    <span>{es}</span>
                                                    {especialidadbus === es && <Check className="w-4 h-4 text-orange-600" />}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
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