import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

type SexoMascota = 'Macho' | 'Hembra';
type Estados = 'pendiente' | 'completado' | 'cancelado';

interface Cliente{
    id: number;
    nombre: string;
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
    cliente: Cliente;
    nombre: string;
    sexo: SexoMascota;
    edad: number;
    foto: string | null;
    raza?: Raza | null;
}

interface Consulta{
    id: number;
    fecha_hora: string;
    motivo_consulta: string;
    diagnostico: string;
    peso: number;
    estado: string;
    observaciones: string;
    mascota: Mascota;
}

interface editProps {
  consulta: Consulta;
  estados: Estados[];
}

export default function Edit({consulta, estados}: editProps) {
    const {data,setData, put,processing,errors} = useForm({
        diagnostico: consulta.diagnostico ?? '',
        peso: consulta.peso ?? 0,
        estado: consulta.estado as Estados,
        observaciones: consulta.observaciones ?? '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/veterinario/consultas/${consulta.id}`);
    };

    return(
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Completar Consulta </span></h1>
            </div>
            <div>

            </div>
            <div className="min-h-screen flex bg-gray-100">
                <form className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4" onSubmit={submit}>
                    <div>
                        <label> Motivo de la Consulta </label>
                        <p className="text-gray-700 bg-gray-50 p-2 rounded border">{consulta.motivo_consulta}</p>
                    </div>
                    <div>
                        <label> Peso de la Mascota: </label>
                        <input
                            type='number'
                            value={data.peso}
                            onChange={(e) => setData('peso', Number(e.target.value))}
                        />
                        {errors.peso && <span className="text-red-500 text-sm">{errors.peso}</span>}
                    </div>
                    <div>
                        <label> Diagnostico: </label>
                        <textarea
                            value={data.diagnostico}
                            onChange={(e) => setData('diagnostico', e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.diagnostico && <span className="text-red-500 text-sm">{errors.diagnostico}</span> }
                    </div>
                    <div>
                        <label className="font-semibold block mb-1">Observaciones:</label>
                        <textarea
                            value={data.observaciones}
                            onChange={(e) => setData('observaciones', e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.observaciones && <span className="text-red-500 text-sm">{errors.observaciones}</span>}
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
                            {processing ? 'Guardando...' : 'Editar Consulta'}
                        </Button>
                        <Link href="/veterinario/consultas" className="px-4 py-2 bg-gray-300 rounded-md text-gray-700">
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}