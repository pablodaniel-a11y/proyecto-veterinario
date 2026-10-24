import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

type SexoMascota = 'Macho' | 'Hembra';

interface Usuario{
    id: number;
    name: string;
    email: string;
}

interface Veterinario{
    id: number;
    user: Usuario;
    telefono: string;
    matricula: string;
    especialidad: string;
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

interface createProps {
  mascota: Mascota;
  mascotas: Mascota[];
  veterinarios: Veterinario[];
}


export default function Create({ mascotas, mascota, veterinarios }: createProps) {
    
    const {data,setData,post,processing,errors} = useForm({
        motivo_consulta: '',
        peso: 0,
        veterinario_id: veterinarios[0]?.id ?? 0,
        mascota_id: mascota?.id ?? mascotas?.[0]?.id ?? 0,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(`/mascotas/${data.mascota_id}/consultas`);
    };
    
    return(
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Crear una Nueva Consulta</span></h1>
            </div>
            <div className="min-h-screen flex bg-gray-100">
                <form className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4" onSubmit={submit}>
                    <div>
                        <label> Motivo de la Consulta </label>
                        <textarea
                            value={data.motivo_consulta}
                            onChange={(e) => setData('motivo_consulta', e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.motivo_consulta && <span className="text-red-500 text-sm">{errors.motivo_consulta}</span>}
                    </div>
                    <div>
                        <label> Peso de la Mascota </label>
                        <input
                            type='number'
                            value={data.peso}
                            onChange={(e) => setData('peso', Number(e.target.value))}
                        />
                        {errors.peso && <span className="text-red-500 text-sm">{errors.peso}</span>}
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
                        <label> Mascota para la Consulta </label>
                        {mascota ? (
                            <div>
                                <label>Mascota Seleccionada Automaticamente </label>
                                <select
                                    value={data.mascota_id}
                                    disabled
                                    className="bg-gray-100 cursor-not-allowed"
                                >
                                    <option value={mascota.id}>
                                        Nombre: {mascota.nombre} y Raza: {mascota.raza?.nombre}
                                    </option>
                                </select>
                            </div>
                        ) : (
                            <div>
                                <label> Mascota Disponibles </label>
                                <select
                                    value={data.mascota_id}
                                    onChange={(e) => setData('mascota_id', Number(e.target.value))}
                                >
                                    {mascotas.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            Nombre: {m.nombre} y Raza: {m.raza?.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {errors.mascota_id && <span className="text-red-500 text-sm">{errors.mascota_id}</span>}
                    </div>
                    <div className="flex gap-4 mt-4">
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {processing ? 'Guardando...' : 'Crear Consulta'}
                        </Button>
                        {mascota ? (
                            <Link href={`/mascotas/${mascota.id}/consultas`} className="px-4 py-2 bg-gray-300 rounded-md text-gray-700">
                                Cancelar
                            </Link>
                        ) : (
                            <Link href="/mascotas" className="px-4 py-2 bg-gray-300 rounded-md text-gray-700">
                                Cancelar
                            </Link>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}