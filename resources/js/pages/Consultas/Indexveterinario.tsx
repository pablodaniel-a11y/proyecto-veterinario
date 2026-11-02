import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import FlashMessage from '@/components/FlashMessage';
import { FormEvent, useState } from "react";


type SexoMascota = 'Macho' | 'Hembra';

interface Filtro {
    buscarname?: string;
    fechabus?: string;
    estadobus?: string;
    especiebus?: number | string | null;
    por_pagina: number;
}

interface Cliente{
    id: number;
    nombre: string;
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
    cliente: Cliente;
    nombre: string;
    sexo: SexoMascota;
    edad: number;
    foto: string | null;
    raza?: Raza | null;
}

interface Producto{
    id: number;
    nombre_producto: string;
    tipo_producto: string;
    precio_venta: number;
    stock_actual: number;
}

interface Detalle_Consulta {
    id: number;
    dosis: number;
    cantidad: number;
    indicaciones: string | null;
    producto: Producto;
}

interface Consulta{
    id: number;
    fecha_hora: string;
    motivo_consulta: string;
    diagnostico: string;
    peso: number;
    estado: string;
    observaciones: string;
    mascota: Mascota;
    detalles_consultas?: Detalle_Consulta[];
}

interface ConsultasPaginadas { 
    data: Consulta[]; 
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
    consultas: ConsultasPaginadas;
    estados: string[];
    fechasdisponibles: string[];
    filtros?: Filtro;
    especies: Especie[];
    flash?:{
        success?: string;
    };
}

export default function Indexveterinario({ consultas, estados, fechasdisponibles, especies, filtros, flash }: indexProps) {

    let mensaje="";
    if(consultas.total === 0){
        mensaje="No tienes Consultas para Gestionar.";
    }else{
        if (consultas.total === 1){
            mensaje="Mostrando tu unica Consulta.";
        }else{
            mensaje=`Mostrando ${consultas.from} a ${consultas.to} de ${consultas.total} Consultas`;
        }
    }

    const [buscarname, setBuscarname] = useState(filtros?.buscarname ?? ''); 
    const [fechabus, setFechabus] = useState(filtros?.fechabus ?? ''); 
    const [estadobus, setEstadobus] = useState(filtros?.estadobus ?? '');
    const [especiebus, setEspeciebus] = useState(filtros?.especiebus ?? '');
    const [porPagina, setPorPagina] = useState(filtros?.por_pagina ?? 10);

    const aplicarFiltros = (e: FormEvent) => { 
        e.preventDefault(); 
    
        router.get('/veterinario/consultas', {
            buscarname, 
            especiebus,
            fechabus, 
            estadobus,
            por_pagina: porPagina,
        },{
            preserveState: true,
            preserveScroll: true,
        }); 
    };
    
    const gestionarExcel = () => {
        const filtrosusados = new URLSearchParams({
            buscarname: String(buscarname || ''),
            especiebus: String(especiebus || ''),
            fechabus: String(fechabus || ''),
            estadobus: String(estadobus || ''),
        }).toString();

        window.open(`/veterinario/consultas/exportar-excel?${filtrosusados}`, '_blank');
    };

    return (
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Consultas para Gestionar</span></h1>
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
                        <option value="">Todas las Fechas Realizadas</option>
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
                    <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                        Buscar
                    </button>
                </form>
            </div>
            <div>
                <button 
                    onClick={gestionarExcel}
                    className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
                >
                    Exportar Excel Filtrado
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
            {consultas.last_page > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6 max-w-2xl mx-auto"> 
                {consultas.prev_page_url && ( 
                    <button 
                        type="button" 
                        onClick={() => router.get(consultas.prev_page_url!)} 
                    > 
                        Anterior 
                    </button> 
                )} 
 
                <span> 
                    Página {consultas.current_page} de {consultas.last_page} 
                </span> 
 
                {consultas.next_page_url && ( 
                    <button 
                        type="button" 
                        onClick={() => router.get(consultas.next_page_url!)} 
                    > 
                        Siguiente 
                    </button> 
                )} 
            </div>
            )}
            <div className="min-h-screen flex bg-gray-100">
                <FlashMessage />
                <ul className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4">
                    {consultas.data.map((consulta) => (
                        <li key={consulta.id}>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 flex-col items-start gap-1 border border-black rounded-md p-4">

                                    <h2 className="text-lg"> <span className="font-bold">Datos de la Consulta:</span></h2>
                                    <h2 className="text-lg"> <span className="font-bold">Fecha y Hora:</span> {new Date(consulta.fecha_hora).toLocaleString()}</h2>
                                    <h2 className="text-lg"> <span className="font-bold">Motivo de la Consulta:</span> {consulta.motivo_consulta}</h2>
                                    <h2 className="text-lg"> <span className="font-bold">Diagnostico:</span> {consulta.diagnostico}</h2>
                                    <h2 className="text-lg"> <span className="font-bold">Peso:</span> {consulta.peso}</h2>
                                    <h2 className="text-lg"> <span className="font-bold">Estado:</span> {consulta.estado}</h2>
                                    <h2 className="text-lg"> <span className="font-bold">Observaciones:</span> {consulta.observaciones}</h2>
                                
                                    <div className="bg-gray-50 border border-gray-200/60 rounded-md p-4 space-y-2 text-sm text-gray-700">

                                        <h3 className="text-base font-bold">Datos del Cliente:</h3>
                                        <p><span className="font-bold">Nombre:</span> {consulta.mascota.cliente.nombre}</p>
                                        <p><span className="font-bold">Correo Electrónico:</span> {consulta.mascota.cliente.email}</p>
        
                                        <h3 className="text-base font-bold mt-2">Datos de la Mascota:</h3>
                                        <p><span className="font-bold">Nombre:</span> {consulta.mascota.nombre}</p>
                                        <p><span className="font-bold">Edad:</span> {consulta.mascota.edad} </p>
                                        <p><span className="font-bold">Sexo:</span> {consulta.mascota.sexo}</p>
                                        <p><span className="font-bold">Especie:</span> {consulta.mascota.raza?.especie?.nombre ?? 'No especificada'}</p>
                                        <p><span className="font-bold">Raza:</span> {consulta.mascota.raza?.nombre ?? 'No especificada'}</p>

                                    </div>
                                    <div className="bg-gray-50 border border-gray-200/60 rounded-md p-4 space-y-2 text-sm text-gray-700">
                                        {consulta.detalles_consultas && consulta.detalles_consultas.length > 0 ? (
                                            <ul className="flex flex-col gap-2">
                                                {consulta.detalles_consultas.map((detalle) => (
                                                    <li key={detalle.id} className="rounded border text-sm flex flex-col gap-1 p-1">
                                                        <div className="flex justify-between">
                                                            <h3><span> {detalle.producto.nombre_producto} ({detalle.producto.tipo_producto}) </span></h3>
                                                            <h3><span> Cantidad: {detalle.cantidad}</span></h3>
                                                        </div>
                                                        <div>
                                                            <h3><span><strong>Dosis:</strong> {detalle.dosis}</span></h3>
                                                            {detalle.indicaciones && <span className="ml-3"><strong>Indicaciones:</strong> {detalle.indicaciones}</span>}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-400 text-sm italic">No se recetaron productos en esta consulta.</p>
                                        )}
                                    </div>
                                    

                                    <div className="flex flex-col gap-2">
                                        <Button 
                                            asChild 
                                            className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
                                        > 
                                            <Link href={`/veterinario/consultas/${consulta.id}/edit`}> 
                                                <Plus className="w-4 h-4 mr-2" /> 
                                                Responder Consulta
                                            </Link> 
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}