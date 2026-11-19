import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import {
    HeartPulse,
    Calendar,
    Users,
    PawPrint,
    ArrowUpRight,
    Stethoscope,
    DollarSign,
    Package,
    ShieldAlert,
    AlertTriangle,
} from 'lucide-react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';

//import { SidebarTrigger } from '@/components/ui/sidebar';

type SexoMascota = 'Macho' | 'Hembra';

interface Producto{
    id: number;
    nombre_producto: string;
    tipo_producto: string;
    precio_venta: number;
    stock_actual: number;
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
    user_id: number;
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
    motivo_cancelacion?: string | null;
    estado: string;
}

interface Bloqueo {
    id: number;
    fecha: string;
    hora_inicio: string | null;
    hora_fin: string | null;
    motivo: string;
    user: Usuario;
}

interface DashboardProps {
    role?: string;
    metrics?: Record<string, any>;

    mascotas_especies?: { name: string; value: number }[];
    citas_estados?: { name: string; value: number }[];
    consultas_veterinarios?: { name: string; total: number }[];
    citasRecientes?: Cita[];
    productosCriticos?: Producto[];
}

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

export default function Dashboard({
    role= 'admin',
    metrics= {},
    mascotas_especies= [],
    citas_estados= [],
    consultas_veterinarios= [],
    citasRecientes= [],
    productosCriticos= [],
}: DashboardProps){
    return (
        <AppLayout>
            <Head title="Panel de Control - Veterinaria" />
            
            <div className="w-full overflow-x-hidden flex-1 space-y-6 p-4 md:p-8 pt-6 transition-all duration-300">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        {role === 'admin' && 'Panel Gerencial (Administración)'}
                        {role === 'veterinario' && 'Panel Clínico (Veterinario)'}
                        {role === 'recepcionista' && 'Panel de Recepción y Turnos'}
                        {role === 'inventario' && 'Panel de Gestión de Inventario'}
                    </h2>
                    <p className="text-muted-foreground">
                        {role === 'admin' && 'Monitoreo global de mascotas, clientes, profesionales y finanzas.'}
                        {role === 'veterinario' && 'Resumen de tus citas programadas y estadísticas de atención.'}
                        {role === 'recepcionista' && 'Control diario de agenda, citas pendientes y nuevos registros.'}
                        {role === 'inventario' && 'Control de stock de farmacia, insumos y productos críticos.'}
                    </p>
                </div>

                {role === 'admin' && (
                    <div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Mascotas Totales</CardTitle>
                                    <PawPrint className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metrics.total_mascotas ?? 0}</div>
                                    <p className="text-xs text-muted-foreground">Registradas</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Clientes</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metrics.total_clientes ?? 0}</div>
                                    <p className="text-xs text-muted-foreground">Dueños</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Veterinarios</CardTitle>
                                    <Stethoscope className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metrics.total_veterinarios ?? 0}</div>
                                    <p className="text-xs text-muted-foreground">Activos</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metrics.citas_hoy ?? 0}</div>
                                    <p className="text-xs text-muted-foreground">Para la jornada</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Productos</CardTitle>
                                    <Package className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metrics.total_productos ?? 0}</div>
                                    <p className="text-xs text-muted-foreground">En catálogo</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Mascotas por Especie</CardTitle>
                                    <CardDescription>Distribución demográfica</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-72 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={mascotas_especies}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} />
                                                <YAxis stroke="#a1a1aa" fontSize={12} allowDecimals={false} />
                                                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} />
                                                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Cantidad" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Estado de Citas</CardTitle>
                                    <CardDescription>Proporción global de turnos</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-72 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={citas_estados} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} dataKey="value">
                                                    {citas_estados.map((_, index) => (
                                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} />
                                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Consultas por Veterinario</CardTitle>
                                    <CardDescription>Carga de trabajo profesional</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-72 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={consultas_veterinarios}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} interval={0} angle={-15} textAnchor="end" />
                                                <YAxis stroke="#a1a1aa" fontSize={12} allowDecimals={false} />
                                                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fafafa' }} />
                                                <Bar dataKey="total" fill="#10b981" radius={[4, 4, 0, 0]} name="Consultas" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="col-span-4">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Últimas Citas Agendadas</CardTitle>
                                        <CardDescription>Control rápido general</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Fecha / Hora</TableHead>
                                                <TableHead>Paciente</TableHead>
                                                <TableHead>Cliente</TableHead>
                                                <TableHead>Veterinario</TableHead>
                                                <TableHead className="text-right">Estado</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {citasRecientes.length > 0 ? (
                                                citasRecientes.map((cita) => (
                                                    <TableRow key={cita.id}>
                                                        <TableCell className="font-semibold text-xs">{cita.fecha_hora}</TableCell>
                                                        <TableCell>{cita.mascota?.nombre ?? 'N/A'}</TableCell>
                                                        <TableCell>{cita.cliente?.nombre ?? 'Invitado'}</TableCell>
                                                        <TableCell>{cita.veterinario?.user?.name ? `Dr./Dra. ${cita.veterinario.user.name}` : 'Sin asignar'}</TableCell>
                                                        <TableCell className="text-right"><Badge variant="secondary">{cita.estado}</Badge></TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-4">No hay citas recientes.</TableCell></TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {role === 'veterinario' && (
                    <div>
                        {metrics.esta_bloqueado_hoy && (
                            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex items-center gap-3">
                                <ShieldAlert className="h-6 w-6 text-red-600 shrink-0" />
                                <div>
                                    <h4 className="font-bold">Aviso de Agenda Bloqueada</h4>
                                    <p className="text-sm">Tienes un bloqueo registrado para hoy. Motivo: {metrics.motivo_bloqueo}</p>
                                </div>
                            </div>
                        )}

                        <div className="grid gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Mis Citas de Hoy</CardTitle>
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metrics.mis_citas_hoy ?? 0}</div>
                                    <p className="text-xs text-muted-foreground">Turnos asignados</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Consultas Realizadas</CardTitle>
                                    <Stethoscope className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metrics.mis_consultas ?? 0}</div>
                                    <p className="text-xs text-muted-foreground">Historial clínico acumulado</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Pacientes Únicos</CardTitle>
                                    <PawPrint className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metrics.pacientes_atendidos ?? 0}</div>
                                    <p className="text-xs text-muted-foreground">Mascotas atendidas</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Mis Próximas Citas Asignadas</CardTitle>
                                <CardDescription>Agenda de turnos del día</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Fecha / Hora</TableHead>
                                            <TableHead>Paciente</TableHead>
                                            <TableHead>Dueño</TableHead>
                                            <TableHead>Motivo</TableHead>
                                            <TableHead className="text-right">Estado</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {citasRecientes.length > 0 ? (
                                            citasRecientes.map((cita) => (
                                                <TableRow key={cita.id}>
                                                    <TableCell className="font-semibold text-xs">{cita.fecha_hora}</TableCell>
                                                    <TableCell>{cita.mascota?.nombre}</TableCell>
                                                    <TableCell>{cita.cliente?.nombre}</TableCell>
                                                    <TableCell>{cita.motivo}</TableCell>
                                                    <TableCell className="text-right"><Badge variant="secondary">{cita.estado}</Badge></TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-4">No tienes citas agendadas recientes.</TableCell></TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {role === 'recepcionista' && (
                    <div>
                        <div className="grid gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Citas Programadas Hoy</CardTitle>
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metrics.citas_hoy ?? 0}</div>
                                    <p className="text-xs text-muted-foreground">Total en la clínica</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Citas Pendientes</CardTitle>
                                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metrics.citas_pendientes ?? 0}</div>
                                    <p className="text-xs text-muted-foreground">Requieren confirmación o atención</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Nuevos Clientes (Semana)</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metrics.nuevos_clientes ?? 0}</div>
                                    <p className="text-xs text-muted-foreground">Registros recientes</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Control General de Citas</CardTitle>
                                    <CardDescription>Monitoreo operativo de recepción</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Fecha / Hora</TableHead>
                                            <TableHead>Paciente</TableHead>
                                            <TableHead>Cliente</TableHead>
                                            <TableHead>Veterinario</TableHead>
                                            <TableHead className="text-right">Estado</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {citasRecientes.length > 0 ? (
                                            citasRecientes.map((cita) => (
                                                <TableRow key={cita.id}>
                                                    <TableCell className="font-semibold text-xs">{cita.fecha_hora}</TableCell>
                                                    <TableCell>{cita.mascota?.nombre}</TableCell>
                                                    <TableCell>{cita.cliente?.nombre}</TableCell>
                                                    <TableCell>{cita.veterinario?.user?.name ? `Dr./Dra. ${cita.veterinario.user.name}` : 'Sin asignar'}</TableCell>
                                                    <TableCell className="text-right"><Badge variant="secondary">{cita.estado}</Badge></TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-4">No hay turnos registrados.</TableCell></TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {role === 'inventario' && (
                    <div>
                        <div className="grid gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
                                    <Package className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metrics.total_productos ?? 0}</div>
                                    <p className="text-xs text-muted-foreground">Items en catálogo</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Stock Crítico (≤ 5 un.)</CardTitle>
                                    <AlertTriangle className="h-4 w-4 text-red-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-red-600">{metrics.stock_bajo ?? 0}</div>
                                    <p className="text-xs text-muted-foreground">Requieren reposición urgente</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Tipos de Productos</CardTitle>
                                    <PawPrint className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metrics.tipos_productos ?? 0}</div>
                                    <p className="text-xs text-muted-foreground">Categorías distintas</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Alerta: Productos con Stock Bajo</CardTitle>
                                <CardDescription>Listado prioritario para reposición de inventario</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nombre del Producto</TableHead>
                                            <TableHead>Tipo</TableHead>
                                            <TableHead>Precio Venta</TableHead>
                                            <TableHead className="text-right">Stock Actual</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {productosCriticos.length > 0 ? (
                                            productosCriticos.map((prod) => (
                                                <TableRow key={prod.id}>
                                                    <TableCell className="font-semibold">{prod.nombre_producto}</TableCell>
                                                    <TableCell><Badge variant="outline">{prod.tipo_producto}</Badge></TableCell>
                                                    <TableCell>${prod.precio_venta}</TableCell>
                                                    <TableCell className="text-right font-bold text-red-600">{prod.stock_actual} unidades</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-4">¡Excelente! No hay productos con stock crítico.</TableCell></TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                )}      
            </div>
        </AppLayout>
    );
}







/* import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};

*/
