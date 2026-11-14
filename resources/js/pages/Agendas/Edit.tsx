import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

interface Usuario {
    id: number;
    name: string;
}

interface Veterinario {
    id: number;
    user: Usuario;
    especialidad: string;
}

interface Agenda {
    id: number;
    veterinario_id: number;
    dia_semana: number;
    hora_inicio: string;
    hora_fin: string;
    duracion_turno_minutos: number;
    activo: boolean;
}

interface editProps{
    veterinarios: Veterinario[];
    agenda: Agenda;
    esVeterinarioRestringido?: boolean;
    flash?:
    {
        success?: string;
    }
}


export default function Edit({veterinarios, agenda, esVeterinarioRestringido}: editProps){

    const { user, can } = useAuth();
    const esVeterinario = esVeterinarioRestringido || (user && !can('gestionar agendas'));
    const veterinarioActual = veterinarios.find(vet => vet.id === agenda.veterinario_id);

    const diasSemana = [
        { id: 1, nombre: 'Lunes' },
        { id: 2, nombre: 'Martes' },
        { id: 3, nombre: 'Miércoles' },
        { id: 4, nombre: 'Jueves' },
        { id: 5, nombre: 'Viernes' },
        { id: 6, nombre: 'Sábado' },
        { id: 7, nombre: 'Domingo' },
    ];

    const { data, setData, put, processing, errors } = useForm({
        veterinario_id: agenda.veterinario_id,
        dia_semana: agenda.dia_semana,
        hora_inicio: agenda.hora_inicio ? agenda.hora_inicio.slice(0, 5) : '09:00',
        hora_fin: agenda.hora_fin ? agenda.hora_fin.slice(0, 5) : '13:00',
        duracion_turno_minutos: agenda.duracion_turno_minutos,
        activo: agenda.activo,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/agendas/${agenda.id}`);
    };


    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 w-full">
            <div className="bg-white border border-orange-200 rounded-xl p-6 sm:p-8 shadow-sm">
                <div className="border-b border-orange-100 pb-4 mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Editar Franja Horaria
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Modifica los campos necesarios y guarda los cambios de la agenda.</p>
                </div>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Veterinario</label>
                            {esVeterinario ? (
                                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2 text-sm text-gray-800 font-medium flex items-center justify-between">
                                    <span>
                                        {veterinarioActual ? `${veterinarioActual.user.name} — Especialidad: ${veterinarioActual.especialidad}` : (user?.name ?? 'Mi Agenda')}
                                    </span>
                                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-semibold">Fijo</span>
                                </div>
                            ) : (
                                <select
                                    value={data.veterinario_id}
                                    onChange={(e) => setData('veterinario_id', Number(e.target.value))}
                                    className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                >
                                    {veterinarios.map((vet) => (
                                        <option key={vet.id} value={vet.id}>
                                            {vet.user.name} — Especialidad: {vet.especialidad}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {errors.veterinario_id && <span className="text-red-500 text-xs mt-0.5">{errors.veterinario_id}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Día de la Semana</label>
                            <select
                                value={data.dia_semana}
                                onChange={(e) => setData('dia_semana', Number(e.target.value))}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            >
                                {diasSemana.map((dia) => (
                                    <option key={dia.id} value={dia.id}>
                                        {dia.nombre}
                                    </option>
                                ))}
                            </select>
                            {errors.dia_semana && <span className="text-red-500 text-xs mt-0.5">{errors.dia_semana}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Hora de Inicio</label>
                            <input
                                type="time"
                                value={data.hora_inicio}
                                onChange={(e) => setData('hora_inicio', e.target.value)}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            {errors.hora_inicio && <span className="text-red-500 text-xs mt-0.5">{errors.hora_inicio}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Hora de Fin</label>
                            <input
                                type="time"
                                value={data.hora_fin}
                                onChange={(e) => setData('hora_fin', e.target.value)}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            {errors.hora_fin && <span className="text-red-500 text-xs mt-0.5">{errors.hora_fin}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Duración del Turno (minutos)</label>
                            <input
                                type="number"
                                min={5}
                                step={5}
                                value={data.duracion_turno_minutos}
                                onChange={(e) => setData('duracion_turno_minutos', Number(e.target.value))}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            {errors.duracion_turno_minutos && <span className="text-red-500 text-xs mt-0.5">{errors.duracion_turno_minutos}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5 justify-center">
                            <label className="text-sm font-semibold text-gray-700">Estado</label>
                            <label className="flex items-center gap-2 cursor-pointer mt-1">
                                <input
                                    type="checkbox"
                                    checked={data.activo}
                                    onChange={(e) => setData('activo', e.target.checked)}
                                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 w-4 h-4"
                                />
                                <span className="text-sm font-medium text-gray-800">Franja horaria Activa</span>
                            </label>
                            {errors.activo && <span className="text-red-500 text-xs mt-0.5">{errors.activo}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 border-t border-orange-100 mt-6">
                        <Link
                            href="/agendas"
                            className="w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm font-semibold text-center transition-colors"
                        >
                            Cancelar
                        </Link>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white shadow-sm font-semibold text-sm px-5 py-2"
                        >
                            {processing ? 'Actualizando...' : 'Confirmar Cambios'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}