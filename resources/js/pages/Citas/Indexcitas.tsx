import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import FlashMessage from '@/components/FlashMessage';
import { useAuth } from '@/hooks/use-auth';
import { FormEvent, useState } from "react";

type SexoMascota = 'Macho' | 'Hembra';

interface Filtro {
    buscarname?: string;
    fechabus?: string;
    estadobus?: string;
    especiebus?: number | string | null;
    vetbus?: string;
    por_pagina: number;
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
    especies: Especie[];
    fechasdisponibles: string[];
    veterinariolist: Veterinario[];
    flash?:
    {
        success?: string;
    }
}

export default function Indexcitas({citas, filtros, estados, especies, fechasdisponibles, veterinariolist, flash} : indexProps){
    
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

    const [buscarname, setBuscarname] = useState(filtros?.buscarname ?? '');
    const [fechabus, setFechabus] = useState(filtros?.fechabus ?? ''); 
    const [estadobus, setEstadobus] = useState(filtros?.estadobus ?? '');
    const [vetbus, setVetbus] = useState(filtros?.vetbus ?? '');
    const [especiebus, setEspeciebus] = useState(filtros?.especiebus ?? '');
    const [porPagina, setPorPagina] = useState(filtros?.por_pagina ?? 10);

    const { can } = useAuth()

    const aplicarFiltros = (e: FormEvent) => { 
        e.preventDefault(); 
        
        router.get('/citas/admin', {
            buscarname, 
            especiebus,
            fechabus, 
            estadobus,
            vetbus,
            por_pagina: porPagina,
        },{
            preserveState: true,
            preserveScroll: true,
        }); 
    };

    const gestionarPdf = () => {
        const filtrosusados = new URLSearchParams({
            buscarname: String(buscarname || ''),
            especiebus: String(especiebus || ''),
            fechabus: String(fechabus || ''),
            estadobus: String(estadobus || ''),
            vetbus: String(vetbus || ''),
        }).toString();
        
        window.open(`/citas/admin/list?${filtrosusados}`, '_blank');
    };

    return (
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold"> Citas a Gestionar </span></h1>
            </div>
            <div className="p-4 bg-orange-100 flex justify-center">
                <form onSubmit={aplicarFiltros} className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4"> 
                    <input 
                        type="text" 
                        value={buscarname} 
                        onChange={(e) => setBuscarname(e.target.value)} 
                        placeholder="Ingresar Nombre del Cliente..." 
                    />
                    <select
                        value={fechabus}
                        onChange={(e) => setFechabus(e.target.value)}
                    >
                        <option value="">Todas las Fechas Disponibles</option>
                        {fechasdisponibles.map((fech, i) => (
                            <option key={i} value={fech}>
                                {fech}
                            </option>
                        ))}
                    </select>
                    <select
                        value={estadobus}
                        onChange={(e) => setEstadobus(e.target.value)}
                    >
                        <option value="">Todos los Estados Disponibles</option>
                        {estados.map((es,i) => (
                            <option key={i} value={es}>
                                {es}
                            </option>
                        ))}
                    </select>
                    <select
                        value={especiebus}
                        onChange={(e) => setEspeciebus(e.target.value)}
                    >
                        <option value="">Todas las Especies</option>
                        {especies.map((es) => (
                            <option key={es.id} value={es.id}>
                                {es.nombre}
                            </option>
                        ))}
                    </select>
                    <select
                        value={vetbus}
                        onChange={(e) => setVetbus(e.target.value)}
                    >
                        <option value="">Todas los Veterinarios Consultados</option>
                        {veterinariolist.map((vet) => (
                            <option key={vet.id} value={vet.id}>
                                {vet.user.name}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                        Buscar
                    </button>
                </form>
            </div>
            <div>
                <button 
                    onClick={gestionarPdf}
                    className="bg-orange-600 text-white px-4 py-2 rounded shadow hover:bg-orange-700"
                >
                    Descargar PDF Filtrado
                </button>
            </div>
            <div>
                <label> 
                    Mostrar: 
 
                    <select 
                        value={porPagina} 
                        onChange={(e) => setPorPagina(Number(e.target.value))} 
                    >  
                        <option value={10}>10</option> 
                        <option value={20}>20</option>
                        <option value={50}>50</option> 
                        <option value={100}>100</option> 
                    </select> 
 
                    filas 
                </label>
                <p>
                    {mensaje}
                </p>
            </div>
            {citas.last_page > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6 max-w-2xl mx-auto"> 
                {citas.prev_page_url && ( 
                    <button 
                        type="button" 
                        onClick={() => router.get(citas.prev_page_url!)} 
                    > 
                        Anterior 
                    </button> 
                )} 
 
                <span> 
                    Página {citas.current_page} de {citas.last_page} 
                </span> 
 
                {citas.next_page_url && ( 
                    <button 
                        type="button" 
                        onClick={() => router.get(citas.next_page_url!)} 
                    > 
                        Siguiente 
                    </button> 
                )} 
            </div>
            )}
            <div className="min-h-screen flex bg-gray-100">
                <FlashMessage />
                <ul className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4">
                    {citas.data.map((cita) => (
                        <li key={cita.id} className="mb-4 p-4 border bg-orange-100">
                            <div className="flex-1 flex-col items-start gap-1 ">
                                <h2 className="text-lg"> <span className="font-bold">Citas Programadas:</span></h2>
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
                            {can('gestionar citas') && (
                            <div className="flex flex-col gap-2">
                                <Button 
                                    asChild 
                                    className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
                                > 
                                    <Link href={`/citas/${cita.id}/edit`}> 
                                        <Plus className="w-4 h-4 mr-2" /> 
                                        Reprogramar Cita / Responder Cita
                                    </Link> 
                                </Button>
                            </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}