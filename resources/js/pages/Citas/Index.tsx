import { Button } from "@/components/ui/button";
import { Head, Link, router } from "@inertiajs/react";
import FlashMessage from '@/components/FlashMessage';
import { FormEvent, useState } from "react";
import { Check, ChevronDown, Plus } from "lucide-react";

type SexoMascota = 'Macho' | 'Hembra';

interface Filtro {
    mascotabus?: string;
    fechabus?: string;
    estadobus?: string;
    vetbus?: string;
}

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

interface CitasPaginadas { 
    data: Cita[]; 
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
    citas: CitasPaginadas;
    filtros?: Filtro;
    estados: string[];
    fechasdisponibles: string[];
    mascotalist: Mascota[];
    veterinariolist: Veterinario[];
    flash?:
    {
        success?: string;
    }
}

export default function Index({citas, filtros, estados, fechasdisponibles, mascotalist, veterinariolist, flash}: indexProps){
    
    let mensaje="";
    if(citas.total === 0){
        mensaje="No tienes Citas Hechas.";
    }else{
        if (citas.total === 1){
            mensaje="Mostrando tu unica Cita.";
        }else{
            mensaje=`Mostrando ${citas.from} a ${citas.to} de ${citas.total} Citas`;
        }
    }

    const [mascotabus, setMascotabus] = useState(filtros?.mascotabus ?? ''); 
    const [fechabus, setFechabus] = useState(filtros?.fechabus ?? ''); 
    const [estadobus, setEstadobus] = useState(filtros?.estadobus ?? '');
    const [vetbus, setVetbus] = useState(filtros?.vetbus ?? '');
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [abiertoTipo, setAbiertoTipo] = useState(false);

    const [busquedaMascota, setBusquedaMascota] = useState(filtros?.mascotabus ?? '');
    const [abiertoMascota, setAbiertoMascota] = useState(false);

    const mascotasFiltradas = mascotalist.filter((mas) =>
        mas.nombre.toLowerCase().includes(busquedaMascota.toLowerCase())
    );

    const [busquedaVet, setBusquedaVet] = useState(filtros?.vetbus ?? '');
    const [abiertoVet, setAbiertoVet] = useState(false);

    const veterinariosFiltrados = veterinariolist.filter((v) =>
        v.user.name.toLowerCase().includes(busquedaVet.toLowerCase())
    );

    const [busquedaFecha, setBusquedaFecha] = useState(filtros?.fechabus ?? '');
    const [abiertoFecha, setAbiertoFecha] = useState(false);

    const fechasFiltradas = fechasdisponibles.filter((fech) =>
        fech.toLowerCase().includes(busquedaFecha.toLowerCase())
    );

    const [abiertoEstado, setAbiertoEstado] = useState(false);
    const textoSeleccionado = estadobus === '' ? 'Todos los Estados' : estadobus;

    const aplicarFiltros = (e: FormEvent) => { 
        e.preventDefault(); 
        
        router.get('/citas', {
            mascotabus,
            fechabus, 
            estadobus,
            vetbus,
        },{
            preserveState: true,
            preserveScroll: true,
        }); 
    };

    return(
        <div className="min-h-screen bg-gray-50 pb-12">
            <Head title="Citas Agendadas - Veterinaria Chiquititos" />
            <div className="bg-orange-200 shadow-sm border-b border-orange-300">
                <div className="w-full flex justify-center items-center py-4 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                        Mis Citas Agendadas
                    </h1>
                </div>
            </div>
            <div className="bg-orange-200/60 border-b border-orange-300 py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Button 
                        asChild 
                        className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white shadow-sm flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg transition-colors"
                    > 
                        <Link href={`/citas/create`}>
                            <Plus className="w-4 h-4" />
                            <span>Solicitar una Cita</span>
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
                    <div className={`w-full grid transition-all duration-300 ease-in-out ${mostrarFiltros ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`}>
                        <div className="overflow-hidden">
                        <form onSubmit={aplicarFiltros} className="max-w-4xl mx-auto bg-white/70 p-5 rounded-xl border border-orange-200 shadow-inner flex flex-col gap-4">
                            <div className="relative w-full lg:flex-1 min-w-[220px]">
                                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Buscar por Mascota</label>
                                <div 
                                    onClick={() => setAbiertoMascota(!abiertoMascota)}
                                    className="w-full rounded-lg border border-orange-300 shadow-sm bg-white p-2.5 text-sm flex items-center justify-between cursor-pointer focus:ring-2 focus:ring-orange-500"
                                >
                                    <input
                                        type="text"
                                        placeholder="Buscar o filtrar mascotas..."
                                        value={busquedaMascota}
                                        onChange={(e) => {
                                            setBusquedaMascota(e.target.value);
                                            setAbiertoMascota(true);
                                            if (e.target.value === '') {setMascotabus('')};
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full outline-none bg-transparent cursor-text text-sm"
                                    />
                                    <ChevronDown className="w-4 h-4 text-gray-400 ml-2 shrink-0" />
                                </div>

                                {abiertoMascota && (
                                    <div className="absolute z-50 mt-1 w-full bg-white border border-orange-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                        <div
                                            onClick={() => {
                                                setMascotabus('');
                                                setBusquedaMascota('');
                                                setAbiertoMascota(false);
                                            }}
                                            className="px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 cursor-pointer font-medium border-b border-gray-100"
                                        >
                                            Todas las Mascotas
                                        </div>

                                        {mascotasFiltradas.length === 0 ? (
                                            <div className="px-3 py-2 text-sm text-gray-400 text-center">
                                                No se encontraron mascotas
                                            </div>
                                        ) : (
                                            mascotasFiltradas.map((mas, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => {
                                                        setMascotabus(mas.nombre);
                                                        setBusquedaMascota(mas.nombre);
                                                        setAbiertoMascota(false);
                                                    }}
                                                    className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-orange-50 ${
                                                        mascotabus === mas.nombre ? 'bg-orange-100 text-orange-900 font-medium' : 'text-gray-700'
                                                    }`}
                                                >
                                                    <span>{mas.nombre}</span>
                                                    {mascotabus === mas.nombre && <Check className="w-4 h-4 text-orange-600" />}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="relative w-full lg:flex-1 min-w-[220px]">
                                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Veterinario</label>
                                <div 
                                    onClick={() => setAbiertoVet(!abiertoVet)}
                                    className="w-full rounded-lg border border-orange-300 shadow-sm bg-white p-2.5 text-sm flex items-center justify-between cursor-pointer focus:ring-2 focus:ring-orange-500"
                                >
                                    <input
                                        type="text"
                                        placeholder="Buscar o filtrar veterinarios..."
                                        value={busquedaVet}
                                        onChange={(e) => {
                                            setBusquedaVet(e.target.value);
                                            setAbiertoVet(true);
                                            if (e.target.value === '') {setVetbus('')};
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full outline-none bg-transparent cursor-text text-sm"
                                    />
                                    <ChevronDown className="w-4 h-4 text-gray-400 ml-2 shrink-0" />
                                </div>

                                {abiertoVet && (
                                    <div className="absolute z-50 mt-1 w-full bg-white border border-orange-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                        <div
                                            onClick={() => {
                                                setVetbus('');
                                                setBusquedaVet('');
                                                setAbiertoVet(false);
                                            }}
                                            className="px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 cursor-pointer font-medium border-b border-gray-100"
                                        >
                                            Todos los Veterinarios
                                        </div>

                                        {veterinariosFiltrados.length === 0 ? (
                                            <div className="px-3 py-2 text-sm text-gray-400 text-center">
                                                No se encontraron Veterinarios
                                            </div>
                                        ) : (
                                            veterinariosFiltrados.map((v, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => {
                                                        setVetbus(v.user.name);
                                                        setBusquedaVet(v.user.name);
                                                        setAbiertoVet(false);
                                                    }}
                                                    className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-orange-50 ${
                                                        vetbus === v.user.name ? 'bg-orange-100 text-orange-900 font-medium' : 'text-gray-700'
                                                    }`}
                                                >
                                                    <span>{v.user.name}</span>
                                                    {vetbus === v.user.name && <Check className="w-4 h-4 text-orange-600" />}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="relative w-full lg:flex-1 min-w-[220px]">
                                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Fecha</label>
                                <div 
                                    onClick={() => setAbiertoFecha(!abiertoFecha)}
                                    className="w-full rounded-lg border border-orange-300 shadow-sm bg-white p-2.5 text-sm flex items-center justify-between cursor-pointer focus:ring-2 focus:ring-orange-500"
                                >
                                    <input
                                        type="text"
                                        placeholder="Buscar fecha (ej: 2026)..."
                                        value={busquedaFecha}
                                        onChange={(e) => {
                                            setBusquedaFecha(e.target.value);
                                            setAbiertoFecha(true);
                                            if (e.target.value === '') { setFechabus(''); }
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full outline-none bg-transparent cursor-text text-sm"
                                    />
                                    <ChevronDown className="w-4 h-4 text-gray-400 ml-2 shrink-0" />
                                </div>

                                {abiertoFecha && (
                                    <div className="absolute z-50 mt-1 w-full bg-white border border-orange-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                        <div
                                            onClick={() => {
                                                setFechabus('');
                                                setBusquedaFecha('');
                                                setAbiertoFecha(false);
                                            }}
                                            className="px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 cursor-pointer font-medium border-b border-gray-100"
                                        >
                                            Todas las Fechas Realizadas
                                        </div>

                                        {fechasFiltradas.length === 0 ? (
                                            <div className="px-3 py-2 text-sm text-gray-400 text-center">
                                                No se encontraron fechas
                                            </div>
                                        ) : (
                                            fechasFiltradas.map((fech, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => {
                                                        setFechabus(fech);
                                                        setBusquedaFecha(fech);
                                                        setAbiertoFecha(false);
                                                    }}
                                                    className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-orange-50 ${
                                                        fechabus === fech ? 'bg-orange-100 text-orange-900 font-medium' : 'text-gray-700'
                                                    }`}
                                                >
                                                    <span>{fech}</span>
                                                    {fechabus === fech && <Check className="w-4 h-4 text-orange-600" />}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="relative w-full lg:flex-1 min-w-[200px]">
                                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Estado</label>
                                <div 
                                    onClick={() => setAbiertoEstado(!abiertoEstado)}
                                    className="w-full rounded-lg border border-orange-300 shadow-sm bg-white p-2.5 text-sm flex items-center justify-between cursor-pointer focus:ring-2 focus:ring-orange-500 hover:border-orange-400 transition"
                                >
                                    <span className={`truncate ${estadobus === '' ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>
                                        {textoSeleccionado}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-gray-400 ml-2 shrink-0 transition-transform duration-200 ${abiertoTipo ? 'rotate-180' : ''}`} />
                                </div>
                                {abiertoEstado && (
                                    <div className="absolute z-50 mt-1 w-full bg-white border border-orange-200 rounded-lg shadow-lg overflow-hidden py-1">
                                        <div
                                            onClick={() => {
                                                setEstadobus('');
                                                setAbiertoEstado(false);
                                            }}
                                            className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-orange-50 transition-colors ${
                                                estadobus === '' ? 'bg-orange-100 text-orange-900 font-medium' : 'text-gray-700'
                                            }`}
                                        >
                                            <span>Todos los Estados</span>
                                            {estadobus === '' && <Check className="w-4 h-4 text-orange-600" />}
                                        </div>
                                        {estados.map((es, i) => (
                                            <div
                                                key={i}
                                                onClick={() => {
                                                    setEstadobus(es);
                                                    setAbiertoEstado(false);
                                                }}
                                                className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-orange-50 transition-colors ${
                                                    estadobus === es ? 'bg-orange-100 text-orange-900 font-medium' : 'text-gray-700'
                                                }`}
                                            >
                                                <span>{es}</span>
                                                {estadobus === es && <Check className="w-4 h-4 text-orange-600" />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="pt-2 flex justify-end">
                                <button 
                                    type="submit" 
                                    className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-medium px-8 py-2.5 rounded-lg shadow-sm transition-colors"
                                >
                                    Aplicar
                                </button>   
                            </div>
                        </form>
                        </div>
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-12">
                <ul className="w-full max-w-4xl mx-auto flex flex-col gap-4">
                    {citas.data.map((cita) => (
                        <li key={cita.id} className="bg-white border border-orange-200 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-orange-100 pb-3 mb-4 gap-2">
                                <div>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-orange-600">Fecha y Hora</span>
                                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                        {new Date(cita.fecha_hora).toLocaleString()}
                                    </h2>
                                </div>
                                <span className={`px-3.5 py-1 text-xs sm:text-sm font-semibold rounded-full ${
                                    cita.estado === 'completado' ? 'bg-green-100 text-green-800' :
                                    cita.estado === 'confirmada' ? 'bg-blue-100 text-blue-800' :
                                    cita.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {cita.estado}
                                </span>
                            </div>
                            <p className="font-semibold text-lg sm:text-xl text-gray-900 mb-3">Información de la Cita:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-gray-700 mb-2">
                                <div>
                                    <p className="font-semibold text-gray-900">Cliente:</p>
                                    <p>{cita.cliente.nombre}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Mascota:</p>
                                    <p>
                                        {cita.mascota.nombre}
                                        {cita.mascota.raza && (
                                            <span className="text-gray-500 text-sm block">
                                                ({cita.mascota.raza.nombre} - {cita.mascota.raza.especie?.nombre})
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Veterinario Asignado:</p>
                                    <p>{cita.veterinario.user.name} <span className="text-sm text-orange-600 font-medium">({cita.veterinario.especialidad})</span></p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="font-semibold text-gray-900">Motivo de la consulta:</p>
                                    <p className="bg-orange-50/50 p-3 rounded-lg border border-orange-100 text-gray-800 mt-1">
                                        {cita.motivo}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {citas.last_page > 1 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center gap-4 mt-8 bg-white p-4 rounded-xl border border-gray-200 shadow-sm max-w-md mx-auto">
                        {citas.prev_page_url && ( 
                            <button 
                                type="button" 
                                onClick={() => router.get(citas.prev_page_url!)}
                                className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 text-sm font-semibold rounded-lg transition-colors border border-orange-200"
                            > 
                                Anterior 
                            </button> 
                        )} 
                        <span className="text-sm font-medium text-gray-700">
                            Página {citas.current_page} de {citas.last_page} 
                        </span>
                        {citas.next_page_url && ( 
                            <button 
                                type="button" 
                                onClick={() => router.get(citas.next_page_url!)}
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