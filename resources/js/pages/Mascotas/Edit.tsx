import { Button } from '@/components/ui/button';
import { Link, useForm } from '@inertiajs/react';
import { Upload } from 'lucide-react';
import { FormEvent, useState, type ChangeEvent } from 'react';

type SexoMascota = 'Macho' | 'Hembra';

interface Especie {
  id: number;
  nombre: string;
}

interface Raza {
    id: number;
    especie_id: number;
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
  razas: Raza[];
  especies: Especie[];
}

export default function Edit({mascota, razas, especies}: editProps) {
    const {data,setData, post,processing,errors} = useForm({
        _method : 'put',
        nombre : mascota.nombre,
        sexo : mascota.sexo,
        edad : mascota.edad,
        foto : null as File | string | null,
        especie_id: mascota.raza?.especie?.id ?? (especies[0]?.id ?? 0),
        raza_id : mascota.raza?.id ?? (razas[0]?.id) ?? 0,
    });
    
    const [preview, setPreview] = useState<string | null>(mascota.foto ? `/storage/${mascota.foto}` : null);

    const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('foto', file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(mascota.foto ? `/storage/${mascota.foto}` : null);
        }
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(`/mascotas/${mascota.id}`);
    };

    return(
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Editor de Mascota: {mascota.nombre} </span></h1>
            </div>
            <div>

            </div>
            <div className="min-h-screen flex bg-gray-100">
                <form className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4" onSubmit={submit}>
                    <div>
                        <label> Nombre </label>
                        <input
                            type='text'
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                        />
                        {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre}</span>}
                    </div>
                    <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="sexo"
                                value="Macho"
                                checked={data.sexo === 'Macho'}
                                onChange={(e) => setData('sexo', e.target.value as SexoMascota)}
                            />
                            Macho
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="sexo"
                                value="Hembra"
                                checked={data.sexo === 'Hembra'}
                                onChange={(e) => setData('sexo', e.target.value as SexoMascota)}
                            />
                            Hembra
                        </label>
                        {errors.sexo && <span className="text-red-500 text-sm">{errors.sexo}</span>}
                    </div>
                    <div>
                        <label> Edad </label>
                        <input
                            type='number'
                            value={data.edad}
                            onChange={(e) => setData('edad', Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label> Imagen </label>
                        {preview ? (
                            <img
                                src={preview}
                                alt="Foto actual o seleccionada"
                                className="w-16 h-16 rounded-full object-cover border border-zinc-700 shadow-sm"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-dashed border-zinc-700 flex items-center justify-center text-zinc-500">
                                <Upload className="w-6 h-6" />
                            </div>
                        )}
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleFotoChange}
                        />
                        {errors.foto && <span className="text-red-500 text-sm">{errors.foto}</span>}
                        <p>
                            Opcional. Seleccione una nueva imagen solo si desea reemplazar la actual.
                        </p>
                    </div>
                    <div>
                        <label> Especies </label>
                        <select
                            value={data.especie_id}
                            onChange={(e) => {
                                const primeraRaza = razas.find((raza) => Number(raza.especie_id) === Number(e.target.value))
                                setData(data => ({
                                    ...data, especie_id: Number(e.target.value), raza_id: primeraRaza ? primeraRaza.id : 0
                                }))
                            }}
                        >
                            {especies.map((especie) => (
                                <option key={especie.id} value={especie.id}>
                                    {especie.nombre}
                                </option>
                            ))}

                        </select>
                    </div>
                    <div>
                        <label> Razas </label>
                        <select
                            value={data.raza_id}
                            onChange={(e) => setData('raza_id', Number(e.target.value))}
                        >
                            {razas
                                .filter((raza)=> raza.especie_id === data.especie_id)
                                .map((raza) => (
                                <option key={raza.id} value={raza.id}>
                                    {raza.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.raza_id && <span className="text-red-500 text-sm">{errors.raza_id}</span>}
                    </div>
                    <div className="flex gap-4 mt-4">
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {processing ? 'Guardando...' : 'Actualizar Mascota'}
                        </Button>
                        
                        <Link href="/mascotas" className="px-4 py-2 bg-gray-300 rounded-md text-gray-700">
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );

}