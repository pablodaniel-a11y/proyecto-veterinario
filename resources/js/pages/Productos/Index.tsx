import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';

interface Producto{
    id: number;
    nombre_producto: string;
    tipo_producto: string;
    precio_venta: number;
    stock_actual: number;
}

interface indexProps{
    productos: Producto[];
    flash?:{
        success?: string;
    };
}

export default function Index({productos, flash}: indexProps){

    const eliminar = (id:number) => {
        if (confirm('¿Está seguro de eliminar este Producto?')) {
            router.delete(`/productos/${id}`);
        }
    };

    return (
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Tienda de Productos</span></h1>
            </div>
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
            <div>
                {flash?.success && <div>{flash.success}</div>}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre del Producto</TableHead>
                            <TableHead>Tipo del Producto</TableHead>
                            <TableHead className="w-[120px]">Precio</TableHead>
                            <TableHead className="w-[140px]">Stock Actual</TableHead>
                            <TableHead className="w-[140px]">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productos.map((producto) => (
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}