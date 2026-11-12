import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { useAuth } from '@/hooks/use-auth';

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

interface editProps{
    veterinario: Veterinario;
}

export default function Index({veterinario}: editProps){
    const {data,setData,put,processing,errors} = useForm({
        name: veterinario.user.name,
        email: veterinario.user.email,
        telefono: veterinario.telefono,
        matricula: veterinario.matricula,
        especialidad: veterinario.especialidad,
    });

    const { can } = useAuth();

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/veterinarios/${veterinario.id}`);
    }

    return(
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 w-full">
            <div className="bg-white border border-orange-200 rounded-xl p-6 sm:p-8 shadow-sm">
                <div className="border-b border-orange-100 pb-4 mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Actualizar Información del Profecional: <span className="text-orange-600 text-lg font-normal block sm:inline">{veterinario.user.name}</span>
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Modifica los campos necesarios y guarda los cambios.</p>
                </div>
                <form onSubmit={submit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Nombre</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                            {errors.name && <span className="text-red-500 text-xs mt-0.5">{errors.name}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Correo Electrónico</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                            {errors.email && <span className="text-red-500 text-xs mt-0.5">{errors.email}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Teléfono</label>
                            <input
                                type='text'
                                value={data.telefono}
                                onChange={(e) => setData('telefono', e.target.value)}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                            {errors.telefono && <span className="text-red-500 text-xs mt-0.5">{errors.telefono}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Matrícula</label>
                            <input
                                type="text" 
                                value={data.matricula}
                                onChange={(e) => setData('matricula', e.target.value)}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                            {errors.matricula && <span className="text-red-500 text-xs mt-0.5">{errors.matricula}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Especialidad</label>
                            <input 
                                type="text" 
                                value={data.especialidad}
                                onChange={(e) => setData('especialidad', e.target.value)}
                                className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                            {errors.especialidad && <span className="text-red-500 text-xs mt-0.5">{errors.especialidad}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 border-t border-orange-100 mt-6">
                        <Link 
                            href="/veterinarios" 
                            className="w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm font-semibold text-center transition-colors"
                        >
                            Cancelar
                        </Link>
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white shadow-sm font-semibold text-sm px-5 py-2"
                        >
                            {processing ? 'Actualizando...' : 'Actualizar Cambios'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}