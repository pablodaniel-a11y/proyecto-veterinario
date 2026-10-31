import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link, router } from '@inertiajs/react';
import { Pencil, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
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
    const { can } = useAuth();

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
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Tienda de Productos</span></h1>
            </div>
            {can('crear producto') && (
            <div className="bg-orange-300">
                <Button 
                    asChild 
                    className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
                > 
                    <Link href={`/productos/create`}>
                        Crear un nuevo Producto para la tienda
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
                        placeholder="Ingresar Nombre del Producto..." 
                    /> 
                    <select
                        value={tipobus}
                        onChange={(e) => setTiposbus(e.target.value)}
                    >
                        <option value="">Todos los Tipos de Productos</option>
                        {diferentestipos.map((tip, i) => (
                            <option key={i} value={tip}>
                                {tip}
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
            {productos.last_page > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6 max-w-2xl mx-auto"> 
                {productos.prev_page_url && ( 
                    <button 
                        type="button" 
                        onClick={() => router.get(productos.prev_page_url!)} 
                    > 
                        Anterior 
                    </button> 
                )} 
 
                <span> 
                    Página {productos.current_page} de {productos.last_page} 
                </span> 
 
                {productos.next_page_url && ( 
                    <button 
                        type="button" 
                        onClick={() => router.get(productos.next_page_url!)} 
                    > 
                        Siguiente 
                    </button> 
                )} 
            </div>
            )}
            <div>
                <FlashMessage />
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
        </div>
    );
}