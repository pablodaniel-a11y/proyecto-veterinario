import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { FormEvent, useMemo } from "react";

type SexoMascota = 'Macho' | 'Hembra';

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

interface createProps{
    mascotas: Mascota[];
    veterinarios: Veterinario[];
    razas: Raza[];
    especies: Especie[];
    flash?:
    {
        success?: string;
    }
}

export default function Create({mascotas, veterinarios, razas, especies}: createProps){
    
    const {data,setData,post,processing,errors} = useForm({
        fecha_hora: '',
        motivo: '',
        estado: 'pendiente',
        veterinario_id: veterinarios[0]?.id ?? 0,
        mascota_id: mascotas?.[0]?.id ?? 0,

        nombreingresado: '',
        emailingresado: '',
        nombre_mascota: '',
        sexo_mascota: 'Macho' as SexoMascota,
        edad_mascota: 1,
        especie_id: especies[0]?.id ?? 0,
        raza_id: razas.find(r => r.especie_id === especies[0]?.id)?.id ?? 0,
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
        post(`/citas`);
    };

    return (
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Realizar una Cita</span></h1>
            </div>
            <div className="min-h-screen flex bg-gray-100">
                <form className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4" onSubmit={submit}>
                    { !(mascotas.length > 0) && (
                        <div>
                            <h2 className="font-bold text-md text-gray-700">Tus Datos</h2>
                            <div>
                                <label> Nombre Completo </label>
                                <input 
                                    type="text" 
                                    value={data.nombreingresado} 
                                    onChange={e => setData('nombreingresado', e.target.value)}
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input 
                                    type="email" 
                                    value={data.emailingresado} 
                                    onChange={e => setData('emailingresado', e.target.value)}
                                    className="w-full border rounded p-2"
                                />
                            </div>

                            <h2 className="font-bold text-md text-gray-700 mt-2">Datos de tu Mascota</h2>
                            <div>
                                <label>Nombre de la Mascota:</label>
                                <input 
                                    type="text" 
                                    value={data.nombre_mascota} 
                                    onChange={e => setData('nombre_mascota', e.target.value)}
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="sexo"
                                        value="Macho"
                                        checked={data.sexo_mascota === 'Macho'}
                                        onChange={(e) => setData('sexo_mascota', e.target.value as SexoMascota)}
                                    />
                                        Macho
                                    </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="sexo"
                                        value="Hembra"
                                        checked={data.sexo_mascota === 'Hembra'}
                                        onChange={(e) => setData('sexo_mascota', e.target.value as SexoMascota)}
                                    />
                                        Hembra
                                </label>
                            </div>
                            <div>
                                <label>Edad:</label>
                                <input 
                                    type="number" 
                                    value={data.edad_mascota} 
                                    onChange={e => setData('edad_mascota', Number(e.target.value))}
                                    className="w-full border rounded p-2"
                                />
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
                                    {razas.filter((raza)=> raza.especie_id === data.especie_id)
                                        .map((raza) => (
                                        <option key={raza.id} value={raza.id}>
                                            {raza.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                    <div>
                        <label> Fechas Disponibles:  </label>
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
                    {(mascotas.length > 0) && (
                        <div>
                            <label> Mascota para la Cita </label>
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
                            {errors.mascota_id && <span className="text-red-500 text-sm">{errors.mascota_id}</span>}
                        </div>
                    )}
                    <div className="flex gap-4 mt-4">
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {processing ? 'Guardando...' : 'Crear Cita'}
                        </Button>
                        {!(mascotas.length > 0) && (
                            <Link href="/dashboard" className="px-4 py-2 bg-gray-300 rounded-md text-gray-700">
                                Cancelar
                            </Link>
                        )}
                        <Link href="/citas/create" className="px-4 py-2 bg-gray-300 rounded-md text-gray-700">
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
