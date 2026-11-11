import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash2, UserPlus, ChevronDown, Check } from 'lucide-react';
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

    const [abiertoTipo, setAbiertoTipo] = useState(false);
    const textoSeleccionado = tipobus === '' ? 'Todos los Tipos de Productos' : tipobus;

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
                    <div className={`w-full transition-all duration-300 ease-in-out ${mostrarFiltros ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        <form onSubmit={aplicarFiltros} className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 items-center bg-white/60 p-4 rounded-xl border border-orange-200 shadow-inner">
                            <input 
                                type="text" 
                                value={buscarname} 
                                onChange={(e) => setBuscarname(e.target.value)} 
                                placeholder="Ingresar Nombre del Producto..." 
                                className="w-full sm:flex-1 rounded-lg border border-orange-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm bg-white p-2.5"
                            />
                            <div className="relative w-full sm:w-auto min-w-[220px]">
                                <div 
                                    onClick={() => setAbiertoTipo(!abiertoTipo)}
                                    className="w-full rounded-lg border border-orange-300 shadow-sm bg-white p-2.5 text-sm flex items-center justify-between cursor-pointer focus:ring-2 focus:ring-orange-500 hover:border-orange-400 transition"
                                >
                                    <span className={`truncate ${tipobus === '' ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>
                                        {textoSeleccionado}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-gray-400 ml-2 shrink-0 transition-transform duration-200 ${abiertoTipo ? 'rotate-180' : ''}`} />
                                </div>
                                {abiertoTipo && (
                                    <div className="absolute z-50 mt-1 w-full bg-white border border-orange-200 rounded-lg shadow-lg overflow-hidden py-1">
                                        <div
                                            onClick={() => {
                                                setTiposbus('');
                                                setAbiertoTipo(false);
                                            }}
                                            className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-orange-50 transition-colors ${
                                                tipobus === '' ? 'bg-orange-100 text-orange-900 font-medium' : 'text-gray-700'
                                            }`}
                                        >
                                            <span>Todos los Tipos de Productos</span>
                                            {tipobus === '' && <Check className="w-4 h-4 text-orange-600" />}
                                        </div>
                                        {diferentestipos.map((tip, i) => (
                                            <div
                                                key={i}
                                                onClick={() => {
                                                    setTiposbus(tip);
                                                    setAbiertoTipo(false);
                                                }}
                                                className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-orange-50 transition-colors ${
                                                    tipobus === tip ? 'bg-orange-100 text-orange-900 font-medium' : 'text-gray-700'
                                                }`}
                                            >
                                                <span>{tip}</span>
                                                {tipobus === tip && <Check className="w-4 h-4 text-orange-600" />}
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

            <div>
                <div className="hidden md:block rounded-xl border border-orange-200 bg-white shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-orange-50/50">
                            <TableRow>
                                <TableHead
                                    className="cursor-pointer select-none hover:bg-orange-100 font-semibold text-orange-900"
                                    onClick={() => ordenarPor('nombre_producto')}
                                >
                                    Nombre del Producto {indicadorOrden('nombre_producto')}
                                </TableHead>
                                <TableHead className="font-semibold text-orange-900">Tipo del Producto</TableHead>
                                <TableHead 
                                    className="w-[120px] cursor-pointer select-none hover:bg-orange-100 font-semibold text-orange-900" 
                                    onClick={() => ordenarPor('precio_venta')}
                                >
                                    Precio {indicadorOrden('precio_venta')}
                                </TableHead>
                                {(can('editar producto')||can('eliminar producto')) && (
                                    <TableHead 
                                        className="w-[140px] cursor-pointer select-none hover:bg-orange-100 font-semibold text-orange-900"
                                        onClick={() => ordenarPor('stock_actual')}
                                    >
                                        Stock Actual {indicadorOrden('stock_actual')}
                                    </TableHead>
                                )}
                                {(can('editar producto')||can('eliminar producto')) && (
                                    <TableHead className="w-[140px] text-right font-semibold text-orange-900">Acciones</TableHead>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productos.data.map((producto) => (
                                <TableRow key={producto.id} className="hover:bg-orange-50/30 transition-colors">
                                    <TableCell className="font-medium text-gray-900">
                                        {producto.nombre_producto}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                            {producto.tipo_producto}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-gray-700 font-medium text-sm">
                                        ${producto.precio_venta}
                                    </TableCell>
                                    {(can('editar producto')||can('eliminar producto')) && (
                                        <TableCell className="text-muted-foreground text-sm font-medium">
                                            <span className={producto.stock_actual <= 5 ? 'text-red-600 font-bold' : ''}>
                                                {producto.stock_actual} un.
                                            </span>
                                        </TableCell>
                                    )}
                                    {(can('editar producto')||can('eliminar producto')) && (
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-orange-600 hover:bg-orange-100" asChild>
                                                    <Link href={`/productos/${producto.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
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
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {productos.data.map((producto) => (
                        <div 
                            key={producto.id} 
                            className="bg-white rounded-xl border border-orange-200 p-4 shadow-sm flex flex-col gap-3 relative hover:border-orange-300 transition-all"
                        >
                            <div className="flex justify-between items-start gap-2">
                                <div>
                                    <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
                                        {producto.tipo_producto}
                                    </span>
                                    <h3 className="font-bold text-gray-900 text-base mt-0.5">
                                        {producto.nombre_producto}
                                    </h3>
                                </div>
                                <div className="text-right bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100">
                                    <span className="text-xs text-gray-500 block">Precio</span>
                                    <span className="font-bold text-orange-700 text-sm">${producto.precio_venta}</span>
                                </div>
                            </div>
                            {(can('editar producto') || can('eliminar producto')) && (
                                <div className="flex items-center justify-between text-sm text-gray-600 pt-2 border-t border-gray-100">
                                    <span>Stock disponible:</span>
                                    <span className={`font-bold ${producto.stock_actual <= 5 ? 'text-red-600' : 'text-gray-800'}`}>
                                        {producto.stock_actual} unidades
                                    </span>
                                </div>
                            )}
                            {(can('editar producto') || can('eliminar producto')) && (
                                <div className="flex items-center gap-2 pt-2 border-t border-gray-100 mt-1">
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="w-1/2 border-orange-200 text-orange-700 hover:bg-orange-50" 
                                        asChild
                                    >
                                        <Link href={`/productos/${producto.id}/edit`}>
                                            <Pencil className="h-4 w-4 mr-1.5" />
                                            Editar
                                        </Link>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-1/2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                                        onClick={() => eliminar(producto.id)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-1.5" />
                                        Eliminar
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
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