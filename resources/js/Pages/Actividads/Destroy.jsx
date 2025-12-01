import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

const PRIMARY = "#51d1f6";

export default function ActividadDestroy({ actividad }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = (e) => {
        e.preventDefault();
        destroy(route('actividades.destroy', actividad.id));
    };

    return (
        <>
            <Head title="Eliminar Actividad" />
            <div className="min-h-screen bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 blur-xl pointer-events-none bg-[url('https://svgshare.com/i/14HD.svg')] bg-cover bg-center" />
        
                <header className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-[#51d1f6]/30 backdrop-blur-md">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider" style={{ color: PRIMARY }}>
                            ZYKRON CONTROL CENTER
                    </h1>
                </header>
        
                <main className="p-6 md:p-10">
                    <div className="max-w-2xl mx-auto">
                            <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-red-400">
                                Confirmar Eliminación
                            </h2>
                            <p className="text-gray-300 mb-6">
                                ¿Estás seguro de que deseas eliminar el cliente <strong>{cliente.company_name}</strong>? Esta acción no se puede deshacer.
                            </p>
        
                            <div className="flex gap-4">
                                <Link
                                    href={route('actividads.index')}
                                    className="px-6 py-2 rounded-lg border border-[#51d1f6]/20 text-gray-300 hover:text-white transition"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    disabled={processing}
                                    className="px-6 py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition disabled:opacity-50"
                                >
                                    {processing ? 'Eliminando...' : 'Eliminar Actividad'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>
        </>
    );
}