import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';
import FlashMessage from '@/components/FlashMessage';
import { useAuth } from '@/hooks/use-auth';

export default function ComoAgendar() {
    const { user} = useAuth();
    return (
        <>
            <Head title="Cómo agendar una cita - Veterinaria Chiquititos" />
            <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
                <header className="w-full border-b border-slate-200 bg-orange-200 px-6 py-4 shadow-sm lg:px-12 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="w-full md:w-1/4 flex justify-start">
                            {!user && (
                            <Link 
                                href="/" 
                                className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-900 hover:underline transition"
                            >
                                ← Volver al inicio
                            </Link>
                            )}
                        </div>
                        <div className="w-full md:w-1/4 flex justify-end">
                            <span className="text-sm font-medium text-slate-700">
                                Veterinaria Chiquititos
                            </span>
                        </div>
                    </div>
                </header>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
                    <FlashMessage />
                </div>
                <main className="mx-auto max-w-4xl flex-1 px-6 py-12">
                    <div className="text-center space-y-4 mb-12">
                        <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-950 dark:text-orange-300">
                            Proceso simple y rápido
                        </span>
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            ¿Cómo agendar una cita para tu mascota?
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            En Chiquititos nos encargamos de que la salud de tus compañeros esté en buenas manos en tan solo 3 sencillos pasos.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3 mb-12">
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600 font-bold dark:bg-orange-950 dark:text-orange-400">
                                1
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Elige el servicio</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Selecciona el motivo de la consulta y revisa si prefieres un profesional en específico para la atención.
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600 font-bold dark:bg-orange-950 dark:text-orange-400">
                                2
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Completa los datos</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Ingresa la información básica de tu mascota y elige el horario disponible que mejor se adapte a tu día.
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600 font-bold dark:bg-orange-950 dark:text-orange-400">
                                3
                            </div>
                            <h3 className="text-lg font-semibold mb-2">¡Listo y confirmado!</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Recibirás la confirmación de tu turno. Como visitante puedes hacerlo rápido, o registrarte para ver tu historial.
                            </p>
                        </div>
                    </div>

                    <div className="text-center rounded-2xl bg-orange-50 border border-orange-200 p-8 dark:bg-orange-950/30 dark:border-orange-900/50">
                        <h3 className="text-xl font-bold text-orange-900 dark:text-orange-200 mb-2">
                            ¿Todo listo para cuidar de tu mascota?
                        </h3>
                        <p className="text-sm text-orange-700 dark:text-orange-300 mb-6">
                            No necesitas una cuenta obligatoria para dar el primer paso.
                        </p>
                        <Link
                            href="/citas/create"
                            className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-8 py-3 text-base font-semibold text-white shadow-md transition hover:bg-orange-700"
                        >
                            Ir al Formulario de Citas
                        </Link>
                    </div>
                </main>

                <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                    &copy; {new Date().getFullYear()} Veterinaria Chiquititos.
                </footer>
            </div>
        </>
    );
}