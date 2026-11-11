import { Button } from "@/components/ui/button";
import { Head, Link, router } from "@inertiajs/react";
import { FileText, ImageIcon, Pencil, Plus, Trash2, ChevronDown, Check } from "lucide-react";
import FlashMessage from '@/components/FlashMessage';
import { FormEvent, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

type SexoMascota = 'Macho' | 'Hembra';

interface Filtro {
    buscarname?: string;
    especiebus?: number | string | null;
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

interface MascotasPaginadas { 
    data: Mascota[]; 
    current_page: number; 
    last_page: number; 
    per_page: number; 
    total: number; 
    from: number | null; 
    to: number | null; 
    prev_page_url: string | null; 
    next_page_url: string | null; 
}

interface indexProps {
    mascotas: MascotasPaginadas;
    especies: Especie[];
    filtros?: Filtro;
    flash?:{
        success?: string;
    };
}

export default function Index({mascotas, especies, filtros, flash} : indexProps){

    let mensaje="";
    if(mascotas.total === 0){
        mensaje="Aún no tienes mascotas registradas.";
    }else{
        if (mascotas.total === 1){
            mensaje="Mostrando tu unica mascota.";
        }else{
            mensaje=`Mostrando ${mascotas.from} a ${mascotas.to} de ${mascotas.total} mascotas`;
        }
    }

    const [buscarname, setBuscarname] = useState(filtros?.buscarname ?? ''); 
    const [especiebus, setEspeciebus] = useState(filtros?.especiebus ?? '');
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [abiertoTipo, setAbiertoTipo] = useState(false);

    const especieSeleccionada = especies.find(es => es.id === especiebus);
    const textoSeleccionado = !especiebus || !especieSeleccionada ? 'Todas las Especies' : especieSeleccionada.nombre;

    const eliminar = (id:number) => {
        if (confirm('¿Está seguro de eliminar esta mascota?')) {
            router.delete(`/mascotas/${id}`);
        }
    };

    const aplicarFiltros = (e: FormEvent) => { 
        e.preventDefault(); 
 
        router.get('/mascotas', { 
            buscarname, 
            especiebus,
        },{
            preserveState: true,
            preserveScroll: true,
        }); 
    };

    return(
        <div className="min-h-screen bg-gray-50 pb-12">
            <Head title="Mascotas - Veterinaria Chiquititos" />
            <div className="bg-orange-200 shadow-sm border-b border-orange-300">
                <div className="w-full flex justify-center items-center py-4 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                        Carnet de Mascotas
                    </h1>
                </div>
            </div>
            <div className="bg-orange-200/60 border-b border-orange-300 py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Button 
                        asChild 
                        className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white shadow-sm flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg transition-colors"
                    > 
                        <Link href={`/mascotas/create`}>
                            <Plus className="w-4 h-4" />
                            <span>Añadir Mascota</span>
                        </Link> 
                    </Button>
                    <Button 
                        asChild 
                        className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white shadow-sm flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg transition-colors"
                    > 
                        <Link href={`/consultas/create`}>
                            <FileText className="w-4 h-4" />
                            <span>Realizar una Consulta</span>
                        </Link> 
                    </Button>
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
                    <div className={`w-full transition-all duration-300 ease-in-out ${mostrarFiltros ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        <form onSubmit={aplicarFiltros} className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 items-center bg-white/60 p-4 rounded-xl border border-orange-200 shadow-inner">
                            <input 
                                type="text" 
                                value={buscarname} 
                                onChange={(e) => setBuscarname(e.target.value)} 
                                placeholder="Ingresar Nombre de la Mascota..." 
                                className="w-full sm:flex-1 rounded-lg border border-orange-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm bg-white p-2.5"
                            />
                            <div className="relative w-full sm:w-auto min-w-[220px]">
                                <div 
                                    onClick={() => setAbiertoTipo(!abiertoTipo)}
                                    className="w-full rounded-lg border border-orange-300 shadow-sm bg-white p-2.5 text-sm flex items-center justify-between cursor-pointer focus:ring-2 focus:ring-orange-500 hover:border-orange-400 transition"
                                >
                                    <span className={`truncate ${especiebus === '' ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>
                                        {textoSeleccionado}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-gray-400 ml-2 shrink-0 transition-transform duration-200 ${abiertoTipo ? 'rotate-180' : ''}`} />
                                </div>
                                {abiertoTipo && (
                                    <div className="absolute z-50 mt-1 w-full bg-white border border-orange-200 rounded-lg shadow-lg overflow-hidden py-1">
                                        <div
                                            onClick={() => {
                                                setEspeciebus('');
                                                setAbiertoTipo(false);
                                            }}
                                            className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-orange-50 transition-colors ${
                                                especiebus === '' ? 'bg-orange-100 text-orange-900 font-medium' : 'text-gray-700'
                                            }`}
                                        >
                                            <span>Todas las Especies</span>
                                            {especiebus === '' && <Check className="w-4 h-4 text-orange-600" />}
                                        </div>
                                        {especies.map((es) => (
                                            <div
                                                key={es.id}
                                                onClick={() => {
                                                    setEspeciebus(es.id);
                                                    setAbiertoTipo(false);
                                                }}
                                                className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-orange-50 transition-colors ${
                                                    especiebus === es.id ? 'bg-orange-100 text-orange-900 font-medium' : 'text-gray-700'
                                                }`}
                                            >
                                                <span>{es.nombre}</span>
                                                {especiebus === es.id && <Check className="w-4 h-4 text-orange-600" />}
                                            </div>
                                        ))}
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
                <ul className="w-full max-w-4xl mx-auto flex flex-col gap-4">
                    {mascotas.data.map((mascota) => (
                        <li key={mascota.id} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                <div className="w-full sm:w-48 shrink-0 flex justify-center">
                                    {mascota.foto ? (
                                        <img
                                            src={`/storage/${mascota.foto}`}
                                            alt={`Foto de ${mascota.nombre}`}
                                            className="w-36 h-36 sm:w-40 sm:h-40 object-cover rounded-lg border border-gray-200 shadow-inner"
                                        />
                                    ) : (
                                        <div className="w-36 h-36 sm:w-40 sm:h-40 bg-gray-50 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-gray-400">
                                            <ImageIcon className="w-10 h-10 stroke-[1.5] mb-1" />
                                            <span className="text-xs font-medium">Sin foto</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 w-full text-center sm:text-left flex flex-col justify-center gap-1.5">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b border-orange-100 pb-1 mb-1">
                                        {mascota.nombre}
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm sm:text-base text-gray-700">
                                        <p><span className="font-semibold text-gray-900">Edad:</span> {mascota.edad} años</p>
                                        <p><span className="font-semibold text-gray-900">Sexo:</span> {mascota.sexo}</p>
                                        <p><span className="font-semibold text-gray-900">Especie:</span> {mascota.raza?.especie?.nombre || 'No especificada'}</p>
                                        <p><span className="font-semibold text-gray-900">Raza:</span> {mascota.raza?.nombre || 'No especificada'}</p>
                                    </div>
                                </div>
                                <div className="w-full sm:w-auto flex flex-col sm:justify-center gap-2.5 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100 shrink-0">
                                    <Button 
                                        asChild 
                                        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white shadow-sm text-xs sm:text-sm"
                                    > 
                                        <Link href={`/mascotas/${mascota.id}/edit`}> 
                                            <Pencil className="w-4 h-4 mr-2" />
                                            Actualizar Carnet
                                        </Link> 
                                    </Button>

                                    <Button 
                                        asChild 
                                        className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white shadow-sm text-xs sm:text-sm"
                                    > 
                                        <Link href={`/mascotas/${mascota.id}/consultas`}> 
                                            <FileText className="w-4 h-4 mr-2" /> 
                                            Historial de Consultas
                                        </Link> 
                                    </Button>

                                    <Button  
                                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white shadow-sm text-xs sm:text-sm"
                                        onClick={() => eliminar(mascota.id)}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Quitar Mascota
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {mascotas.last_page > 1 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center gap-4 mt-8 bg-white p-4 rounded-xl border border-gray-200 shadow-sm max-w-md mx-auto">
                        {mascotas.prev_page_url && ( 
                            <button 
                                type="button" 
                                onClick={() => router.get(mascotas.prev_page_url!)}
                                className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 text-sm font-semibold rounded-lg transition-colors border border-orange-200"
                            > 
                                Anterior 
                            </button> 
                        )} 
                        <span className="text-sm font-medium text-gray-700">
                            Página {mascotas.current_page} de {mascotas.last_page} 
                        </span> 
                        {mascotas.next_page_url && ( 
                            <button 
                                type="button" 
                                onClick={() => router.get(mascotas.next_page_url!)}
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