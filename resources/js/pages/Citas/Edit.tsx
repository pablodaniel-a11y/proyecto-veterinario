import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { FormEvent, useMemo } from "react";

type SexoMascota = 'Macho' | 'Hembra';
type Estados = 'pendiente' | 'completado' | 'cancelado';

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
    flash?:
    {
        success?: string;
    }
}

export default function Edit({veterinarios, cita, estados}: editProps){
    
    const {data,setData,put,processing,errors} = useForm({
        fecha_hora: cita.fecha_hora,
        motivo: cita.motivo,
        estado: cita.estado,
        veterinario_id: cita.veterinario.id ?? veterinarios[0]?.id ?? 0,
    });

    const fechasDisponibles = useMemo(() => {
        const fechas = [];
        let fechaActual = new Date();
        
        while (fechas.length < 6) {
            fechaActual.setDate(fechaActual.getDate() + 1);
            const diaSemana = fechaActual.getDay();
            
            if (diaSemana === 1 || diaSemana === 3 || diaSemana === 5) {
                fechaActual.setHours(10, 0, 0, 0);
                fechas.push(new Date(fechaActual).toISOString().slice(0, 19).replace('T', ' '));
            }
        }
        return fechas;
    }, []);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/citas/${cita.id}`);
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
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Fecha y Hora (Si es necesario):</label>
                            <select
                                value={data.fecha_hora}
                                onChange={(e) => setData('fecha_hora', e.target.value)}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            >
                                {fechasDisponibles.map((fecha, index) => (
                                    <option key={index} value={fecha}>
                                        {fecha}
                                    </option>
                                ))}
                            </select>
                            {errors.fecha_hora && <span className="text-red-500 text-xs mt-0.5">{errors.fecha_hora}</span>}
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
