
type SexoMascota = 'Macho' | 'Hembra';
type Estados = 'pendiente' | 'completado' | 'cancelado';

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
  estados: Estados;
  veterinario: Veterinario;
}


export default function Create({ estados, mascotas, mascota, veterinario }: createProps) {
    return("hola mundo");
}