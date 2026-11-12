import { Button } from "@/components/ui/button";
import { Link, useForm, usePage } from "@inertiajs/react";
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
    Urlanterior?: string;
    flash?:
    {
        success?: string;
    }
}

export default function Create({mascotas, veterinarios, razas, especies, Urlanterior}: createProps){

    const rutaCancelar= Urlanterior || '/agendarcita';
    
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 w-full">
            <div className="bg-white border border-orange-200 rounded-xl p-6 sm:p-8 shadow-sm">
                <div className="border-b border-orange-100 pb-4 mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Solicitar Cita Previa
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Completa los datos requeridos para registrar la información.</p>
                </div>
                <form onSubmit={submit} className="space-y-6">
                    {!(mascotas.length > 0) && (
                        <div className="bg-orange-50/40 border border-orange-100 rounded-xl p-5 space-y-4">
                            <div>
                                <h2 className="font-bold text-base text-orange-900 mb-1">Tus Datos de Contacto</h2>
                                <p className="text-xs text-gray-500 mb-3">Como no estás registrado, necesitamos tus datos básicos.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Nombre Completo</label>
                                    <input 
                                        type="text" 
                                        value={data.nombreingresado} 
                                        onChange={e => setData('nombreingresado', e.target.value)}
                                        placeholder="Ej. María Gómez"
                                        className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    />
                                    {errors.nombreingresado && <span className="text-red-500 text-xs mt-0.5">{errors.nombreingresado}</span>}
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Correo Electrónico</label>
                                    <input 
                                        type="email" 
                                        value={data.emailingresado} 
                                        onChange={e => setData('emailingresado', e.target.value)}
                                        placeholder="correo@ejemplo.com"
                                        className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    />
                                    {errors.emailingresado && <span className="text-red-500 text-xs mt-0.5">{errors.emailingresado}</span>}
                                </div>
                            </div>
                            <div className="border-t border-orange-200/60 pt-4 mt-2">
                                <h2 className="font-bold text-base text-orange-900 mb-1">Datos de tu Mascota</h2>
                                <p className="text-xs text-gray-500 mb-3">Registra los datos principales de tu mascota para la consulta.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Nombre de la Mascota</label>
                                    <input 
                                        type="text" 
                                        value={data.nombre_mascota} 
                                        onChange={e => setData('nombre_mascota', e.target.value)}
                                        placeholder="Ej. Firulais"
                                        className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    />
                                    {errors.nombre_mascota && <span className="text-red-500 text-xs mt-0.5">{errors.nombre_mascota}</span>}
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Edad (años)</label>
                                    <input 
                                        type="number" 
                                        value={data.edad_mascota} 
                                        onChange={e => setData('edad_mascota', Number(e.target.value))}
                                        placeholder="Ej. 2"
                                        className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    />
                                    {errors.edad_mascota && <span className="text-red-500 text-xs mt-0.5">{errors.edad_mascota}</span>}
                                </div>
                                <div className="flex flex-col gap-1.5 sm:col-span-2">
                                    <label className="text-sm font-semibold text-gray-700">Sexo de la Mascota</label>
                                    <div className="flex items-center gap-6 mt-1">
                                        <label className="flex items-center gap-2 cursor-pointer bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-orange-50/50 transition-colors flex-1">
                                            <input
                                                type="radio"
                                                name="sexo_mascota"
                                                value="Macho"
                                                checked={data.sexo_mascota === 'Macho'}
                                                onChange={(e) => setData('sexo_mascota', e.target.value as SexoMascota)}
                                                className="text-orange-600 focus:ring-orange-500"
                                            />
                                            <span className="text-sm font-medium text-gray-800">Macho</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-orange-50/50 transition-colors flex-1">
                                            <input
                                                type="radio"
                                                name="sexo_mascota"
                                                value="Hembra"
                                                checked={data.sexo_mascota === 'Hembra'}
                                                onChange={(e) => setData('sexo_mascota', e.target.value as SexoMascota)}
                                                className="text-orange-600 focus:ring-orange-500"
                                            />
                                            <span className="text-sm font-medium text-gray-800">Hembra</span>
                                        </label>
                                    </div>
                                    {errors.sexo_mascota && <span className="text-red-500 text-xs mt-0.5">{errors.sexo_mascota}</span>}
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Especie</label>
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
                                    <label className="text-sm font-semibold text-gray-700">Raza</label>
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
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Fechas Disponibles</label>
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
                            <label className="text-sm font-semibold text-gray-700">Profesional Asignado</label>
                            <select
                                value={data.veterinario_id}
                                onChange={(e) => setData('veterinario_id', Number(e.target.value))}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            >
                                {veterinarios.map((vet) => (
                                    <option key={vet.id} value={vet.id}>
                                        {vet.user.name} ({vet.especialidad})
                                    </option>
                                ))}
                            </select>
                            {errors.veterinario_id && <span className="text-red-500 text-xs mt-0.5">{errors.veterinario_id}</span>}
                        </div>
                        {mascotas.length > 0 && (
                            <div className="flex flex-col gap-1.5 sm:col-span-2">
                                <label className="text-sm font-semibold text-gray-700">Mascota Seleccionada</label>
                                <select
                                    value={data.mascota_id}
                                    onChange={(e) => setData('mascota_id', Number(e.target.value))}
                                    className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                >
                                    {mascotas.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.nombre} - Raza: {m.raza?.nombre ?? 'No especificada'}
                                        </option>
                                    ))}
                                </select>
                                {errors.mascota_id && <span className="text-red-500 text-xs mt-0.5">{errors.mascota_id}</span>}
                            </div>
                        )}
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Motivo de la Cita</label>
                            <textarea
                                value={data.motivo}
                                onChange={(e) => setData('motivo', e.target.value)}
                                rows={3}
                                placeholder="Describe brevemente el motivo de la consulta..."
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                            {errors.motivo && <span className="text-red-500 text-xs mt-0.5">{errors.motivo}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 border-t border-orange-100 mt-6">
                        <Link 
                            href={rutaCancelar} 
                            className="w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm font-semibold text-center transition-colors"
                        >
                            Cancelar
                        </Link>
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white shadow-sm font-semibold text-sm px-5 py-2"
                        >
                            {processing ? 'Guardando...' : 'Solicitar Cita'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
