import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { ImageIcon, Plus, Trash2 } from "lucide-react";
import FlashMessage from '@/components/FlashMessage';
import { FormEvent, useState } from "react";
import mascota from "@/routes/mascota";

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
    //const [porPagina, setPorPagina] = useState(filtros?.por_pagina ?? 5 ); 

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
        <div>
            <div className="h-16 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Carnet de Mascotas</span></h1>
            </div>
            <div className="bg-orange-300 flex justify-between items-center">
                <Button 
                    asChild 
                    className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
                > 
                    <Link href={`/mascotas/create`}>
                        Agregar una Mascota Nueva
                    </Link> 
                </Button>
                <Button 
                    asChild 
                    className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
                > 
                    <Link href={`/consultas/create`}>
                        Realizar una Consulta
                    </Link> 
                </Button>
            </div>
            <div className="p-4 bg-orange-100 flex justify-center">
                <form onSubmit={aplicarFiltros} className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4"> 
                    <input 
                        type="text" 
                        value={buscarname} 
                        onChange={(e) => setBuscarname(e.target.value)} 
                        placeholder="Ingresar Nombre de tu mascota..." 
                    /> 
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
                    <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                        Buscar
                    </button>
                </form>
            </div>
            <div>
                <p>
                    {mensaje}
                </p>
            </div>
            {mascotas.last_page > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6 max-w-2xl mx-auto"> 
                {mascotas.prev_page_url && ( 
                    <button 
                        type="button" 
                        onClick={() => router.get(mascotas.prev_page_url!)} 
                    > 
                        Anterior 
                    </button> 
                )} 
 
                <span> 
                    Página {mascotas.current_page} de {mascotas.last_page} 
                </span> 
 
                {mascotas.next_page_url && ( 
                    <button 
                        type="button" 
                        onClick={() => router.get(mascotas.next_page_url!)} 
                    > 
                        Siguiente 
                    </button> 
                )} 
            </div>
            )}
            <div className="min-h-screen flex bg-gray-100">
                <FlashMessage />
                <ul className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4">
                    {mascotas.data.map((mascota) => (
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
                                    <Button 
                                        asChild 
                                        className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
                                    > 
                                        <Link href={`/mascotas/${mascota.id}/consultas`}> 
                                            <Plus className="w-4 h-4 mr-2" /> 
                                            Consultas de la Mascota
                                        </Link> 
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