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
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Realizar una Cita</span></h1>
            </div>
            <div className="min-h-screen flex bg-gray-100">
                <form className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4" onSubmit={submit}>
                    <div>
                        <label> Fechas Disponibles (Si es necesario):  </label>
                        <select
                            value={data.fecha_hora}
                            onChange={(e) => setData('fecha_hora', e.target.value)}
                            className="w-full border rounded p-2 mt-1"
                        >
                            {fechasDisponibles.map((fecha, index) => (
                                <option key={index} value={fecha}>
                                    {fecha}
                                </option>
                            ))}
                        </select>
                        {errors.fecha_hora && <span className="text-red-500 text-sm">{errors.fecha_hora}</span>}
                    </div>
                    <div>
                        <label> Motivo de la Cita:  </label>
                        <textarea
                            value={data.motivo}
                            onChange={(e) => setData('motivo', e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.motivo && <span className="text-red-500 text-sm">{errors.motivo}</span>}
                    </div>
                    <div>
                        <label> Veterinarios Disponibles </label>
                        <select
                            value={data.veterinario_id}
                            onChange={(e) => setData('veterinario_id', Number(e.target.value))}
                        >
                            {veterinarios.map((vet) => (
                                <option key={vet.id} value={vet.id}>
                                    Nombre: {vet.user.name} y Especialidad: {vet.especialidad}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label> Estado: </label>
                        <select
                            value={data.estado}
                            onChange={(e) => setData('estado', e.target.value as Estados)}
                        >
                            {estados.map((est) => (
                                <option key={est} value={est}>
                                    {est}
                                </option>
                            ))}
                        </select>
                        {errors.estado && <span className="text-red-500 text-sm">{errors.estado}</span> }
                    </div>
                    <div className="flex gap-4 mt-4">
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {processing ? 'Guardando...' : 'Confirmar Cita'}
                        </Button>
                        <Link href="/citas/admin" className="px-4 py-2 bg-gray-300 rounded-md text-gray-700">
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
