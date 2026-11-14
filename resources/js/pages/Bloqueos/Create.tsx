import { Button } from "@/components/ui/button";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";

export default function Create() {
    const [tipoBloqueo, setTipoBloqueo] = useState<'total' | 'parcial'>('total');
    const { data, setData, post, processing, errors } = useForm({
        fecha: '',
        hora_inicio: '',
        hora_fin: '',
        motivo: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();

        if (tipoBloqueo === 'total') {
            data.hora_inicio = null as any;
            data.hora_fin = null as any;
        }

        post('/bloqueos');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <Head title="Registrar Feriado o Bloqueo - Veterinaria Chiquititos" />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="bg-white border border-orange-200 rounded-xl p-6 sm:p-8 shadow-sm">
                    <div className="border-b border-orange-100 pb-4 mb-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            Nuevo Bloqueo / Feriado
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Bloquea un día completo o un intervalo de horas para impedir la reserva de turnos en ese lapso.
                        </p>
                    </div>
                    <form onSubmit={submit} className="space-y-6">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Tipo de Bloqueo</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTipoBloqueo('total');
                                        setData(data => ({ ...data, hora_inicio: '', hora_fin: '' }));
                                    }}
                                    className={`py-2.5 px-4 rounded-lg text-sm font-semibold border transition-all ${
                                        tipoBloqueo === 'total'
                                            ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-50/50'
                                    }`}
                                >
                                    Día Completo (Feriado / Cierre)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTipoBloqueo('parcial')}
                                    className={`py-2.5 px-4 rounded-lg text-sm font-semibold border transition-all ${
                                        tipoBloqueo === 'parcial'
                                            ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-50/50'
                                    }`}
                                >
                                    Horario Parcial (Horas específicas)
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5 sm:col-span-2">
                                <label className="text-sm font-semibold text-gray-700">Fecha del Bloqueo</label>
                                <input
                                    type="date"
                                    value={data.fecha}
                                    onChange={(e) => setData('fecha', e.target.value)}
                                    className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                {errors.fecha && <span className="text-red-500 text-xs mt-0.5">{errors.fecha}</span>}
                            </div>
                            {tipoBloqueo === 'parcial' && (
                                <>
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
                                </>
                            )}
                            <div className="flex flex-col gap-1.5 sm:col-span-2">
                                <label className="text-sm font-semibold text-gray-700">Motivo</label>
                                <textarea
                                    value={data.motivo}
                                    onChange={(e) => setData('motivo', e.target.value)}
                                    rows={3}
                                    placeholder="Ej. Feriado Nacional por el Día del Trabajador, Mantenimiento de equipos..."
                                    className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                />
                                {errors.motivo && <span className="text-red-500 text-xs mt-0.5">{errors.motivo}</span>}
                            </div>
                        </div>
                        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 border-t border-orange-100 mt-6">
                            <Link
                                href="/bloqueos"
                                className="w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm font-semibold text-center transition-colors"
                            >
                                Cancelar
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white shadow-sm font-semibold text-sm px-5 py-2"
                            >
                                {processing ? 'Registrando...' : 'Guardar Bloqueo'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}