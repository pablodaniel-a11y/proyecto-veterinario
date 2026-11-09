import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Bienvenido a la Veterinaria" />
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="w-full border-b border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-6 lg:px-12 dark:border-slate-800 dark:bg-slate-900">
                    <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                            <img 
                                src="/storage/imagenes/logo.png" 
                                alt="Veterinaria Chiquititos" 
                                className="h-15 sm:h-14 w-auto object-contain shrink-0" 
                            />
                            <div className="flex flex-col text-left">
                                <span className="text-base sm:text-xl font-extrabold tracking-tight text-orange-600 dark:text-orange-400 leading-tight">
                                    Chiquititos
                                </span>
                                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                                    Veterinaria
                                </span>
                            </div>
                        </div>
                        <nav className="flex items-center gap-2 sm:gap-4 shrink-0">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-lg bg-orange-600 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white transition hover:bg-orange-700 shadow-sm"
                                >
                                    Ir al Panel
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="text-xs sm:text-sm font-medium text-slate-600 hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-400 transition px-1 py-1"
                                    >
                                        <span className="inline sm:hidden">Entrar</span>
                                        <span className="hidden sm:inline">Iniciar Sesión</span>
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="rounded-lg bg-orange-600 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white transition hover:bg-orange-700 shadow-sm"
                                    >
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>
                <main className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
                    <div className="max-w-3xl space-y-6">
                        <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-950 dark:text-orange-300">
                            Cuidado profesional para tus mascotas
                        </span>
                        
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                            Salud y bienestar animal al alcance de un click
                        </h1>
                        
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Administra citas médicas, historial clínico de pacientes y stock de farmacia de forma rápida y moderna.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                            {!auth.user && (
                                <Link
                                    href={register()}
                                    className="w-full sm:w-auto rounded-lg bg-orange-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-orange-700 text-center"
                                >
                                    Comenzar Ahora
                                </Link>
                            )}
                            <Link
                                href="/agendarcita"
                                className="w-full sm:w-auto rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 text-center"
                            >
                                Cómo agendar una cita
                            </Link>
                            <Link
                                href="/veterinarios"
                                className="w-full sm:w-auto rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 text-center"
                            >
                                Ver Profesionales
                            </Link>
                            <Link
                                href="/productos"
                                className="w-full sm:w-auto rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 text-center"
                            >
                                Ver Productos
                            </Link>
                        </div>
                    </div>
                </main>
                <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                    &copy; {new Date().getFullYear()} Veterinaria Chiquititos. Desarrollado con Laravel.
                </footer>
            </div>
        </>
    );
}
