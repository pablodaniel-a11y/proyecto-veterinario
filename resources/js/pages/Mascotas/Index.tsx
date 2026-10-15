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

interface indexProps {
  mascotas: Mascota[];
}

export default function Index({mascotas} : indexProps){

    return(
        <div>
            <div className="h-15 flex bg-orange-200">
                <h1 className="p-4 mx-auto text-[20px]"><span className="font-bold">Carnet de Mascotas</span></h1>
            </div>
            <div>

            </div>
            <div className="min-h-screen flex bg-gray-100">
                <ul className="w-full max-w-2xl mx-auto mt-4 flex flex-col gap-4">
                    {mascotas.map((mascota) => (
                        <li key={mascota.id} className="mb-4 p-4 border bg-orange-100">
                            <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                {mascota.foto ? (
                                    <img
                                        src={mascota.foto}
                                        alt={`Foto de ${mascota.nombre}`}
                                        className="w-50 h-30"
                                    >
                                    </img>
                                ) : (
                                    <div className="w-60 h-50 bg-gray-200 flex items-center justify-center"><p>Aca iba una foto</p></div>
                                )}
                            </div>
                            <div className="flex flex-col items-start gap-1 ">
                                <h2 className="text-lg"> <span className="font-bold">Datos de la Mascota:</span></h2>
                                <h2 className="text-lg"> <span className="font-bold">Nombre:</span> {mascota.nombre}</h2>
                                <h2 className="text-lg"> <span className="font-bold">Edad:</span> {mascota.sexo}</h2>
                                <h2 className="text-lg"> <span className="font-bold">Sexo:</span> {mascota.sexo}</h2>
                                <h2 className="text-lg"> <span className="font-bold">Especie:</span> {mascota.raza?.especie?.nombre}</h2>
                                <h2 className="text-lg"> <span className="font-bold">Raza:</span> {mascota.raza?.nombre}</h2>
                            </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}