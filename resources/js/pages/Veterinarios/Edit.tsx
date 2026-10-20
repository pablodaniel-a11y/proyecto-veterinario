import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

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

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/veterinarios/${veterinario.id}`);
    }

    return(
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Editar Perfil del Profecional: {veterinario.user.name} </span></h1>
            </div>
            <div>

            </div>
            <div className="min-h-screen flex bg-gray-100">
                <form className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4" onSubmit={submit}>
                    <div>
                        <label> Nombre </label>
                        <input
                            type='text'
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>
                    <div>
                        <label> Correo Electronico </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    </div>
                    <div>
                        <label> Telefono </label>
                        <input
                            type='text'
                            value={data.telefono}
                            onChange={(e) => setData('telefono', e.target.value)}
                        />
                    </div>
                    <div>
                        <label> Matricula </label>
                        <input 
                            type="text" 
                            value={data.matricula}
                            onChange={(e) => setData('matricula', e.target.value)}
                        />
                        {errors.matricula && <span className="text-red-500 text-sm">{errors.matricula}</span>}
                    </div>
                    <div>
                        <label> Especialidad </label>
                        <input 
                            type="text" 
                            value={data.especialidad}
                            onChange={(e) => setData('especialidad', e.target.value)}
                        />
                        {errors.especialidad && <span className="text-red-500 text-sm">{errors.especialidad}</span>}
                    </div>
                    <div className="flex gap-4 mt-4">
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {processing ? 'Guardando...' : 'Actualizar Perfil'}
                        </Button>
                        
                        <Link href="/veterinarios" className="px-4 py-2 bg-gray-300 rounded-md text-gray-700">
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}