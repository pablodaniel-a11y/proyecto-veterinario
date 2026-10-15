import { Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type SexoMascota = 'Macho' | 'Hembra';

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

interface editProps {
  mascota: Mascota;
  especies: Especie[];
}

export default function Edit({mascota, especies}: editProps) {

    const {data,setData, put,processing,errors} = useForm({
        nombre : mascota.nombre,
        sexo : mascota.sexo,
        edad : mascota.edad,
        foto : null as File | string | null,
        raza : mascota.raza?.nombre ?? '',
        especie_id: mascota.raza?.especie?.id ?? (especies[0]?.id ?? ''),
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/mascota/${mascota.id}`);
    };

    return(
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Editar Mascota</span></h1>
            </div>
            <div>

            </div>
            <div className="min-h-screen flex bg-gray-100">
                <form className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4" onSubmit={submit}>
                    <div>

                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                    <div>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setData('foto', e.target.files[0]);
                                }
                            }}
                        />

                    </div>
                </form>
            </div>
        </div>
    );

}