import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { FormEvent, useMemo } from "react";

type SexoMascota = 'Macho' | 'Hembra';
type Estados = 'pendiente' | 'completado' | 'cancelado' | 'confirmada';

interface Usuario{
    id: number;
    name: string;
    email: string;
}

interface Agenda {
    id: number;
    dia_semana: number;
    hora_inicio: string;
    hora_fin: string;
    activo: boolean;
}

interface Bloqueo {
    id: number;
    fecha: string;
    hora_inicio: string | null;
    hora_fin: string | null;
    motivo: string;
}

interface Especie {
  id: number;
  nombre: string;
}

interface Raza {
    id: number;
    nombre: string;
    especie_id: number;
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
    agendas?: Agenda[];
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

interface editProps{
    veterinarios: Veterinario[];
    estados: Estados[];
    cita: Cita;
    bloqueos?: Bloqueo[];
    flash?:
    {
        success?: string;
    }
}

export default function Edit({veterinarios, bloqueos, cita, estados}: editProps){

    const fechaInicial = cita.fecha_hora ? cita.fecha_hora.split(' ')[0] : '';
    const horaInicial = cita.fecha_hora ? cita.fecha_hora.split(' ')[1]?.slice(0, 5) : '10:00';
    
    const {data,setData,put,processing,errors} = useForm({
        fecha_hora: cita.fecha_hora,
        fecha: fechaInicial,
        hora: horaInicial,
        motivo: cita.motivo,
        estado: cita.estado as Estados,
        veterinario_id: cita.veterinario.id ?? veterinarios[0]?.id ?? 0,
    });

    const diasSemanaNombres = ['', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const veterinarioSeleccionado = veterinarios.find(v => v.id === data.veterinario_id);
    const agendasVeterinario = veterinarioSeleccionado?.agendas?.filter(a => a.activo) ?? [];

    const submit = (e: FormEvent) => {
        e.preventDefault();
        const fechaHoraCombinada = `${data.fecha} ${data.hora}:00`;
        data.fecha_hora = fechaHoraCombinada;
        put(`/citas/${cita.id}`, {
            onBefore: () => {
                data.fecha_hora = `${data.fecha} ${data.hora}:00`;
            }
        });
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 w-full">
            <div className="bg-white border border-orange-200 rounded-xl p-6 sm:p-8 shadow-sm">
                <div className="border-b border-orange-100 pb-4 mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Gestionar Turno
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Modifica los campos necesarios y guarda los cambios de la cita.</p>
                </div>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Veterinario Asignado</label>
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
                            {errors.veterinario_id && <span className="text-red-500 text-xs mt-0.5">{errors.veterinario_id}</span>}
                            <div className="bg-orange-50/60 border border-orange-200 rounded-lg p-3 text-xs text-orange-900 mt-1">
                                <span className="font-semibold block mb-1">Horarios de atención de este profesional:</span>
                                {agendasVeterinario.length === 0 ? (
                                    <span className="text-gray-500 italic">No tiene horarios configurados actualmente.</span>
                                ) : (
                                    <ul className="list-disc list-inside space-y-0.5">
                                        {agendasVeterinario.map((agenda) => (
                                            <li key={agenda.id}>
                                                <span className="font-medium">{diasSemanaNombres[agenda.dia_semana]}</span>: {agenda.hora_inicio.slice(0, 5)} a {agenda.hora_fin.slice(0, 5)} hs
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Fecha de la Cita:</label>
                            <input 
                                type="date"
                                value={data.fecha}
                                onChange={e => setData('fecha', e.target.value)}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            {errors.fecha_hora && <span className="text-red-500 text-xs mt-0.5">{errors.fecha_hora}</span>}
                            {data.fecha && bloqueos
                                ?.filter(b => b.fecha.substring(0, 10) === data.fecha)
                                .map((bloqueo) => (
                                    <div 
                                        key={bloqueo.id} 
                                        className={`border rounded-lg p-3 text-xs flex flex-col gap-1 mt-1 ${
                                            !bloqueo.hora_inicio ? 'bg-red-50 border-red-200 text-red-800' : 'bg-amber-50 border-amber-200 text-amber-900'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between font-semibold">
                                            <span className="flex items-center gap-1.5">
                                                <span>⚠️</span> 
                                                <span>{bloqueo.motivo}</span>
                                            </span>
                                            <span 
                                                className={`px-2 py-0.5 rounded font-medium text-[10px] ${
                                                    !bloqueo.hora_inicio ? 'bg-red-200 text-red-900' : 'bg-amber-200 text-amber-900'
                                                }`}
                                            >
                                                {!bloqueo.hora_inicio ? 'Bloqueo Total (Todo el día)' : `${bloqueo.hora_inicio} a ${bloqueo.hora_fin}`}
                                            </span>
                                        </div>
                                        <p className="text-[11px] opacity-90">
                                            {!bloqueo.hora_inicio ? 'La clínica se encuentra inhabilitada en esta fecha.' : 'Existe una restricción programada parcial en este intervalo de horas.'}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Hora de la Cita:</label>
                            <input 
                                type="time"
                                value={data.hora}
                                onChange={e => setData('hora', e.target.value)}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Estado del Turno:</label>
                            <select
                                value={data.estado}
                                onChange={(e) => setData('estado', e.target.value as Estados)}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            >
                                {estados.map((est) => (
                                    <option key={est} value={est}>
                                        {est}
                                    </option>
                                ))}
                            </select>
                            {errors.estado && <span className="text-red-500 text-xs mt-0.5">{errors.estado}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Motivo de la Cita:</label>
                            <textarea
                                value={data.motivo}
                                onChange={(e) => setData('motivo', e.target.value)}
                                rows={3}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                            {errors.motivo && <span className="text-red-500 text-xs mt-0.5">{errors.motivo}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 border-t border-orange-100 mt-6">
                        <Link 
                            href="/citas/admin" 
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
