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

interface DashboardProps {
    metrics?: {
        total_mascotas: number;
        total_clientes: number;
        total_veterinarios: number;
        citas_hoy: number;
    };
    mascotas_especies?: { name: string; value: number }[];
    citas_estados?: { name: string; value: number }[];
    consultas_veterinarios?: { name: string; total: number }[];
    citasRecientes?: Cita[];
}

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

export default function Dashboard({
    metrics = { total_mascotas: 0, total_clientes: 0, total_veterinarios: 0, citas_hoy: 0 },
    mascotas_especies = [],
    citas_estados = [],
    consultas_veterinarios = [],
    citasRecientes = [],
}: DashboardProps){
    return (
        <AppLayout>
            <Head title="Panel Veterinario" />
            
            <div className="w-full overflow-x-hidden flex-1 space-y-6 p-4 md:p-8 pt-6 transition-all duration-300">
                
                {/* Encabezado */}
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Panel de Control Veterinario</h2>
                        <p className="text-muted-foreground">Monitoreo general de mascotas, clientes, turnos y consultas.</p>
                    </div>
                    <Button asChild>
                        <Link href="/citas/create">Nueva Cita</Link>
                    </Button>
                </div>
                
                {/* Tarjetas de Métricas */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Mascotas Totales</CardTitle>
                            <PawPrint className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metrics.total_mascotas}</div>
                            <p className="text-xs text-muted-foreground">Registradas en el sistema</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metrics.total_clientes}</div>
                            <p className="text-xs text-muted-foreground"> Dueños </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Veterinarios</CardTitle>
                            <Stethoscope className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metrics.total_veterinarios}</div>
                            <p className="text-xs text-muted-foreground">Profesionales activos</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Citas para Hoy</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metrics.citas_hoy}</div>
                            <p className="text-xs text-muted-foreground">Agendadas para la jornada</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Sección de Gráficos (Barras + Torta) */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Mascotas por Especie</CardTitle>
                            <CardDescription>Distribución de Especies</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={mascotas_especies}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                        <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} />
                                        <YAxis stroke="#a1a1aa" fontSize={12} allowDecimals={false} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#18181b',
                                                borderColor: '#27272a',
                                                borderRadius: '8px',
                                            }}
                                        />
                                        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Cantidad" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Estado de Citas</CardTitle>
                            <CardDescription>Proporción de turnos actuales</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={citas_estados}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={55}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {citas_estados.map((_, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#18181b',
                                                borderColor: '#27272a',
                                                borderRadius: '8px',
                                            }}
                                            itemStyle={{ color: '#fafafa' }}
                                        />
                                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Segunda Fila de Gráficos, son Tablas */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Consultas por Veterinario</CardTitle>
                            <CardDescription>Carga de trabajo por profesional</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={consultas_veterinarios}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                        <XAxis dataKey="name" stroke="#fafafa" fontSize={12} interval={0} angle={-15} textAnchor="end" />
                                        <YAxis stroke="#a1a1aa" fontSize={12} allowDecimals={false} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#18181b',
                                                borderColor: '#27272a',
                                                borderRadius: '8px',
                                                color: '#fafafa',
                                            }}
                                        />
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
                                <CardDescription>Control rápido de los turnos recientes</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/citas/admin" className="flex items-center gap-1">
                                    Ver todas <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </Button>
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
                                                <TableCell className="font-semibold text-xs">
                                                    {cita.fecha_hora}
                                                </TableCell>
                                                <TableCell>{cita.mascota?.nombre ?? 'N/A'}</TableCell>
                                                <TableCell>{cita.cliente?.nombre ?? 'Invitado'}</TableCell>
                                                <TableCell>
                                                    {cita.veterinario?.user?.name
                                                        ? `Dr./Dra. ${cita.veterinario.user.name}`
                                                        : 'Sin asignar'}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Badge variant="secondary">{cita.estado}</Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center text-muted-foreground py-4">
                                                No hay citas registradas recientemente.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
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
