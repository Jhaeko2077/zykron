import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

const PRIMARY = "#51d1f6";

export default function TareaDestroy({ tarea }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = (e) => {
        e.preventDefault();
        destroy(route('tareas.destroy', tarea.id));
    };

    return (
        <>
            <Head title="Eliminar Tarea" />
            <div className="min-h-screen bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 blur-xl pointer-events-none bg-[url('https://svgshare.com/i/14HD.svg')] bg-cover bg-center" />

                <header className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-[#51d1f6]/30 backdrop-blur-md">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider" style={{ color: PRIMARY }}>
                        ZYKRON CONTROL CENTER
                    </h1>
                </header>

                <main className="p-6 md:p-10">
                    <div className="max-w-xl mx-auto">

                        <Link
                            href={route('tareas.index')}
                            className="text-sm text-gray-400 hover:text-[#51d1f6] mb-6 inline-block"
                        >
                            ← Volver a Tareas
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#0b0b0b] border border-[#51d1f6]/30 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold mb-4" style={{ color: PRIMARY }}>
                                ¿Eliminar esta tarea?
                            </h2>

                            <p className="text-gray-300 mb-6">
                                Estás a punto de eliminar la tarea:
                                <span className="text-white font-semibold"> "{tarea.title}" </span>
                                Esta acción no se puede deshacer.
                            </p>

                            <form onSubmit={handleDelete} className="flex gap-4">
                                <Link
                                    href={route('tareas.index')}
                                    className="px-6 py-2 rounded-lg border border-[#51d1f6]/20 text-gray-300 hover:text-white transition"
                                >
                                    Cancelar
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 rounded-lg font-semibold text-black transition disabled:opacity-50"
                                    style={{ backgroundColor: PRIMARY }}
                                >
                                    {processing ? 'Eliminando...' : 'Eliminar'}
                                </button>
                            </form>

                        </motion.div>
                    </div>
                </main>
            </div>
        </>
    );
}