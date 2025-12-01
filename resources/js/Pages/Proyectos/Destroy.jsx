import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

const PRIMARY = "#FF4C4C";

export default function ProyectoDestroy({ proyecto }) {
    const { delete: destroy, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        destroy(route('proyectos.destroy', proyecto.id), {
            onSuccess: () => {
                window.location.href = route('proyectos.index');
            }
        });
    };

    return (
        <>
            <Head title="Eliminar Proyecto" />

            <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#0b0b0b] border border-red-600 rounded-2xl p-8 max-w-md w-full"
                >
                    <h2 className="text-2xl font-bold mb-6 text-red-600">Eliminar Proyecto</h2>
                    <p className="mb-6">
                        ¿Estás seguro que quieres eliminar el proyecto <strong>{proyecto.name}</strong>? Esta acción no se puede deshacer.
                    </p>
                    <div className="flex gap-4">
                        <Link
                            href={route('proyectos.index')}
                            className="px-6 py-2 rounded-lg border border-gray-400 text-gray-300 hover:text-white transition"
                        >
                            Cancelar
                        </Link>
                        <button
                            onClick={submit}
                            disabled={processing}
                            className="px-6 py-2 rounded-lg font-semibold text-black transition disabled:opacity-50"
                            style={{ backgroundColor: PRIMARY }}
                        >
                            {processing ? 'Eliminando...' : 'Eliminar'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </>
    );
}