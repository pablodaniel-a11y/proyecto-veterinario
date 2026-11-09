import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash2, ArrowUpDown, ArrowUp, ArrowDown, UserPlus } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import FlashMessage from '@/components/FlashMessage';
import { FormEvent, useState } from 'react';

interface Filtro {
    buscarname?: string;
    tipobus?: string;
    orden?: string;
    direccion?: string;
}

interface Producto{
    id: number;
    nombre_producto: string;
    tipo_producto: string;
    precio_venta: number;
    stock_actual: number;
}

interface ProductosPaginados { 
    data: Producto[]; 
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
    productos: ProductosPaginados;
    diferentestipos: string[];
    filtros?: Filtro;
    flash?:{
        success?: string;
    };
}

export default function Index({productos, filtros, diferentestipos, flash}: indexProps){
    let mensaje="";
    if(productos.total === 0){
        mensaje="Aún no tienes Productos registrados.";
    }else{
        if (productos.total === 1){
            mensaje="Mostrando tu unico Producto.";
        }else{
            mensaje=`Mostrando ${productos.from} a ${productos.to} de ${productos.total} Productos`;
        }
    }

    const [buscarname,setBuscarname]=useState(filtros?.buscarname ?? '');
    const [tipobus,setTiposbus]=useState(filtros?.tipobus ?? '');
    const [orden, setOrden] = useState(filtros?.orden ?? 'nombre_producto'); 
    const [direccion, setDireccion] = useState(filtros?.direccion ?? 'asc');
    const {can, user} = useAuth();
    const [mostrarFiltros, setMostrarFiltros] = useState(false);

    const eliminar = (id:number) => {
        if (confirm('¿Está seguro de eliminar este Producto?')) {
            router.delete(`/productos/${id}`);
        }
    };

    const aplicarFiltros = (e: FormEvent) => { 
        e.preventDefault(); 
         
        router.get('/productos', { 
            buscarname, 
            tipobus,
            orden,
            direccion,
        },{
            preserveState: true,
            preserveScroll: true,
        }); 
    };

    const indicadorOrden = (campo: string) => { 
        if (orden !== campo) { 
            return <span className="text-gray-400 ml-1">↕</span>; 
        }
        return direccion === 'asc' ? ' ↑' : ' ↓'; 
    };

    const ordenarPor = (campo: string) => { 
        let nuevaDireccion = 'asc'; 
 
        if (orden === campo && direccion === 'asc') { 
            nuevaDireccion = 'desc'; 
        } 
 
        setOrden(campo); 
        setDireccion(nuevaDireccion); 
 
        router.get('/productos', { 
            buscarname, 
            tipobus, 
            orden: campo, 
            direccion: nuevaDireccion, 
        }); 
    }; 

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <Head title="Productos - Veterinaria Chiquititos" />
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
                                Catálogo de Productos e Inventario
                            </h1>
                            {can('crear producto') && (
                                <Button 
                                    asChild 
                                    className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
                                > 
                                    <Link href={`/productos/create`}>
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Registrar Nuevo Producto
                                    </Link> 
                                </Button>
                            )}
                        </div>
                        <div className="w-full md:w-1/4 flex justify-end">
                            <span className="text-sm font-medium text-slate-700">
                                Veterinaria Chiquititos
                            </span>
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
                    <div className={`w-full transition-all duration-300 ease-in-out overflow-hidden ${mostrarFiltros ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                        <form onSubmit={aplicarFiltros} className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 items-center bg-white/60 p-4 rounded-xl border border-orange-200 shadow-inner">
                            <input 
                                type="text" 
                                value={buscarname} 
                                onChange={(e) => setBuscarname(e.target.value)} 
                                placeholder="Ingresar Nombre del Producto..." 
                                className="w-full sm:flex-1 rounded-lg border-orange-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm bg-white p-2.5"
                            />
                            <select
                                value={tipobus}
                                onChange={(e) => setTiposbus(e.target.value)}
                                className="w-full sm:w-auto rounded-lg border-orange-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm bg-white p-2.5 min-w-[220px]"
                            >
                                <option value="">Todos los Tipos de Productos</option>
                                {diferentestipos.map((tip, i) => (
                                    <option key={i} value={tip}>
                                        {tip}
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

            {/* falta corregir la tabla para adaptarce al celular */}
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead
                                className="cursor-pointer select-none hover:bg-orange-50"
                                onClick={(e) => ordenarPor('nombre_producto')}
                            >
                                Nombre del Producto {indicadorOrden('nombre_producto')}
                            </TableHead>
                            <TableHead>Tipo del Producto</TableHead>
                            <TableHead 
                                className="w-[120px] cursor-pointer select-none hover:bg-orange-50" 
                                onClick={(e) => ordenarPor('precio_venta')}
                            >
                                Precio {indicadorOrden('precio_venta')}
                            </TableHead>
                            <TableHead 
                                className="w-[140px] cursor-pointer select-none hover:bg-orange-50"
                                onClick={(e) => ordenarPor('stock_actual')}
                            >
                                Stock Actual {indicadorOrden('stock_actual')}
                            </TableHead>
                            {(can('editar producto')||can('eliminar producto')) && (<TableHead className="w-[140px]">Acciones</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productos.data.map((producto) => (
                            <TableRow key={producto.id}>
                                <TableCell className="font-medium">
                                    {producto.nombre_producto}
                                </TableCell>

                                <TableCell className="text-muted-foreground text-sm">
                                    {producto.tipo_producto}
                                </TableCell>

                                <TableCell className="text-muted-foreground text-sm">
                                    {producto.precio_venta}
                                </TableCell>
                                
                                <TableCell className="text-muted-foreground text-sm">
                                    {producto.stock_actual}
                                </TableCell>
                                
                                {(can('editar producto')||can('eliminar producto')) && (
                                <TableCell>
                                    <div className="flex  items-center gap-1">

                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white" asChild>
                                            <Link href={`/productos/${producto.id}/edit`}>
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                            onClick={() => eliminar(producto.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            
            {productos.last_page > 1 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center gap-4 mt-8 bg-white p-4 rounded-xl border border-gray-200 shadow-sm max-w-md mx-auto">
                        {productos.prev_page_url && ( 
                            <button 
                                type="button" 
                                onClick={() => router.get(productos.prev_page_url!)}
                                className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 text-sm font-semibold rounded-lg transition-colors border border-orange-200"
                            > 
                                Anterior 
                            </button> 
                        )}
                        <span className="text-sm font-medium text-gray-700">
                            Página {productos.current_page} de {productos.last_page} 
                        </span>
                        {productos.next_page_url && ( 
                            <button 
                                type="button" 
                                onClick={() => router.get(productos.next_page_url!)} 
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