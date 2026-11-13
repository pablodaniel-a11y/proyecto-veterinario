import { Head, Link, router } from "@inertiajs/react";
import FlashMessage from '@/components/FlashMessage';
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";


interface User {
    name: string;
}

interface Bloqueo {
    id: number;
    fecha: string;
    hora_inicio: string | null;
    hora_fin: string | null;
    motivo: string;
    user: User;
}

interface BloqueosPaginados {
    data: Bloqueo[];
    current_page: number;
    last_page: number;
    total: number;
    prev_page_url: string | null;
    next_page_url: string | null;
}

interface IndexProps {
    bloqueos: BloqueosPaginados;
    flash?: { success?: string };
}

export default function Index({ bloqueos, flash }: IndexProps) {
    
    const eliminar = (id: number) => {
        console.log("Eliminando bloqueo con ID:", id);
        if (confirm('¿Estás seguro de eliminar este bloqueo o feriado?')) {
            router.delete(`/bloqueos/${id}`);
        }
    };

    return(
        <div className="min-h-screen bg-gray-50 pb-12">
            <Head title="Feriados y Bloqueos de Agenda - Veterinaria Chiquititos" />

            <div className="bg-orange-200 shadow-sm border-b border-orange-300">
                <div className="w-full flex justify-center items-center py-4 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                        Feriados y Bloqueos de Agenda
                    </h1>
                </div>
            </div>

            <div className="bg-orange-200/60 border-b border-orange-300 py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Button 
                        asChild 
                        className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm flex items-center gap-2 py-2.5 px-4 rounded-lg"
                    >
                        <Link href="/bloqueos/create">
                            <Plus className="w-4 h-4" />
                            <span>Registrar Feriado / Bloqueo</span>
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
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Fecha</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Horario Afectado</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Motivo</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Registrado por</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-orange-100 bg-white">
                            {bloqueos.data.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                        No hay bloqueos o feriados registrados.
                                    </td>
                                </tr>
                            ) : (
                                bloqueos.data.map((bloqueo) => (
                                    <tr key={bloqueo.id} className="hover:bg-orange-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {bloqueo.fecha}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {bloqueo.hora_inicio && bloqueo.hora_fin ? `${bloqueo.hora_inicio} - ${bloqueo.hora_fin}` : 'Día Completo (Feriado/Paro)'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {bloqueo.motivo}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {bloqueo.user?.name || 'Sistema'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Button size="sm" variant="destructive" onClick={() => eliminar(bloqueo.id)}>
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