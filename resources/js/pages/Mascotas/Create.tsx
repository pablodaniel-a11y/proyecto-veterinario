import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { Upload } from "lucide-react";
import { type ChangeEvent, FormEvent, useState } from "react";

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

interface createProps {
  razas: Raza[];
  especies: Especie[];
}

export default function Create({razas,especies} : createProps ){

    const {data,setData,post,processing,errors} = useForm({
        nombre : '',
        sexo: 'Macho' as SexoMascota,
        edad : 0,
        foto : null as File | string | null,
        especie_id: especies[0]?.id ?? 0,
        raza_id: razas.find(r => r.especie_id === especies[0]?.id)?.id ?? 0,
    });

    const [preview, setPreview] = useState<string | null>(null);

    const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('foto', file);
    
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
           setPreview(null);
        }
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(`/mascotas`);
    };

    return(
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 w-full">
            <div className="bg-white border border-orange-200 rounded-xl p-6 sm:p-8 shadow-sm">
                <div className="border-b border-orange-100 pb-4 mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Añadir Nueva Mascota
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Completa los datos requeridos para registrar la información.</p>
                </div>
                <form onSubmit={submit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Nombre de la Mascota</label>
                            <input
                                type='text'
                                value={data.nombre}
                                onChange={(e) => setData('nombre', e.target.value)}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                placeholder="Ej. Lux"
                            />
                            {errors.nombre && <span className="text-red-500 text-xs mt-0.5">{errors.nombre}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Edad</label>
                            <input
                                type='number'
                                value={data.edad}
                                onChange={(e) => setData('edad', Number(e.target.value))}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                            {errors.edad && <span className="text-red-500 text-xs mt-0.5">{errors.edad}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Especies</label>
                            <select
                                value={data.especie_id}
                                onChange={(e) => {
                                    const primeraRaza = razas.find((raza) => Number(raza.especie_id) === Number(e.target.value))
                                    setData(data => ({
                                        ...data, especie_id: Number(e.target.value), raza_id: primeraRaza ? primeraRaza.id : 0
                                    }))
                                }}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            >
                                {especies.map((especie) => (
                                    <option key={especie.id} value={especie.id}>
                                        {especie.nombre}
                                    </option>
                                ))}
                            </select>
                            {errors.especie_id && <span className="text-red-500 text-xs mt-0.5">{errors.especie_id}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Razas</label>
                            <select
                                value={data.raza_id}
                                onChange={(e) => setData('raza_id', Number(e.target.value))}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            >
                                {razas.filter((raza)=> raza.especie_id === data.especie_id)
                                    .map((raza) => (
                                    <option key={raza.id} value={raza.id}>
                                        {raza.nombre}
                                    </option>
                                ))}
                            </select>
                            {errors.raza_id && <span className="text-red-500 text-xs mt-0.5">{errors.raza_id}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Sexo</label>
                            <div className="flex items-center gap-6 mt-1">
                                <label className="flex items-center gap-2 cursor-pointer bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg hover:bg-orange-50/50 transition-colors flex-1">
                                    <input
                                        type="radio"
                                        name="sexo"
                                        value="Macho"
                                        checked={data.sexo === 'Macho'}
                                        onChange={(e) => setData('sexo', e.target.value as SexoMascota)}
                                        className="text-orange-600 focus:ring-orange-500"
                                    />
                                    <span className="text-sm font-medium text-gray-800">Macho</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg hover:bg-orange-50/50 transition-colors flex-1">
                                    <input
                                        type="radio"
                                        name="sexo"
                                        value="Hembra"
                                        checked={data.sexo === 'Hembra'}
                                        onChange={(e) => setData('sexo', e.target.value as SexoMascota)}
                                        className="text-orange-600 focus:ring-orange-500"
                                    />
                                    <span className="text-sm font-medium text-gray-800">Hembra</span>
                                </label>
                            </div>
                            {errors.sexo && <span className="text-red-500 text-xs mt-0.5">{errors.sexo}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:col-span-2 pt-2 border-t border-orange-100 mt-2">
                        <label className="text-sm font-semibold text-gray-700">Fotografía de la Mascota</label>
                        <div className="flex flex-col sm:flex-row items-center gap-4 bg-orange-50/30 border border-orange-200 rounded-xl p-4">
                            <div className="shrink-0">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Vista previa de la mascota"
                                        className="w-20 h-20 rounded-full object-cover border-2 border-orange-400 shadow-sm"
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-white border-2 border-dashed border-orange-300 flex items-center justify-center text-orange-400 shadow-inner">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col flex-1 w-full gap-2">
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleFotoChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 cursor-pointer"
                                />
                                {errors.foto && <span className="text-red-500 text-xs">{errors.foto}</span>}
                                <p className="text-xs text-gray-500 italic">
                                    Opcional. Selecciona una nueva imagen en formato PNG, JPG o WEBP.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 border-t border-orange-100 mt-6">
                        <Link 
                            href="/mascotas" 
                            className="w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm font-semibold text-center transition-colors"
                        >
                            Cancelar
                        </Link>
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white shadow-sm font-semibold text-sm px-5 py-2"
                        >
                            {processing ? 'Guardando...' : 'Añadir Mascota'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}