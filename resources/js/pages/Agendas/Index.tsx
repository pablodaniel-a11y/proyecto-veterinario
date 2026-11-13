import { Button } from "@/components/ui/button";
import { Head, Link, router } from "@inertiajs/react";
import FlashMessage from '@/components/FlashMessage';
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Usuario {
    name: string;
}

interface Veterinario {
    id: number;
    user: Usuario;
    especialidad: string;
}

interface Agenda {
    id: number;
    veterinario: Veterinario;
    dia_semana: number;
    hora_inicio: string;
    hora_fin: string;
    duracion_turno_minutos: number;
    activo: boolean;
}

interface AgendasPaginadas {
    data: Agenda[];
    current_page: number;
    last_page: number;
    total: number;
    prev_page_url: string | null;
    next_page_url: string | null;
}

interface IndexProps {
    agendas: AgendasPaginadas;
    flash?:{
        success?: string 
    };
}

export default function Index({ agendas, flash }: IndexProps) {
    
    const diasSemana = ['', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const eliminar = (id: number) => {
        if (confirm('¿Estás seguro de eliminar este horario de agenda?')) {
            router.delete(`/agendas/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return(
        <div className="min-h-screen bg-gray-50 pb-12">
            <Head title="Gestión de Agendas - Veterinaria Chiquititos" />
            <div className="bg-orange-200 shadow-sm border-b border-orange-300">
                <div className="w-full flex justify-center items-center py-4 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                        Horarios y Agendas de Veterinarios
                    </h1>
                </div>
            </div>
            <div className="bg-orange-200/60 border-b border-orange-300 py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Button 
                        asChild 
                        className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm flex items-center gap-2 py-2.5 px-4 rounded-lg"
                    >
                        <Link href="/agendas/create">
                            <Plus className="w-4 h-4" />
                            <span>Nueva Franja Horaria</span>
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                <FlashMessage />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="bg-white shadow-sm border border-orange-200 rounded-xl overflow-hidden">
                    <table className="min-w-full divide-y divide-orange-100">
                        <thead className="bg-orange-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Veterinario</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Día</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Horario</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Duración Turno</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Estado</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-orange-100 bg-white">
                            {agendas.data.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                        No hay agendas registradas.
                                    </td>
                                </tr>
                            ) : (
                                agendas.data.map((agenda) => (
                                    <tr key={agenda.id} className="hover:bg-orange-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {agenda.veterinario.user.name} <span className="text-xs text-orange-600 block">({agenda.veterinario.especialidad})</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {diasSemana[agenda.dia_semana]}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {agenda.hora_inicio} - {agenda.hora_fin}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {agenda.duracion_turno_minutos} mins
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${agenda.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {agenda.activo ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
                                            <Button asChild size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                                                <Link href={`/agendas/${agenda.id}/edit`}>
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <Button size="sm" variant="destructive" onClick={() => eliminar(agenda.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}