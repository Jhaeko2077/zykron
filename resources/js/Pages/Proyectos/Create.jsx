import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const PRIMARY = "#51d1f6";

export default function ProyectoCreate({ clientes }) {
    const { data, setData, post, processing, errors } = useForm({
        cliente_id: '',
        name: '',
        description: '',
        status: 'pendiente',
        start_date: '',
        end_date: '',
    });

    const [openClientes, setOpenClientes] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('proyectos.store'), {
            onSuccess: () => {
                window.location.href = route('proyectos.index');
            }
        });
    };

    return (
        <>
            <Head title="Crear Proyecto" />

            <div className="min-h-screen bg-black text-white relative overflow-hidden">
                {/* Fondo nebuloso */}
                <div className="absolute inset-0 opacity-20 blur-xl pointer-events-none bg-[url('https://svgshare.com/i/14HD.svg')] bg-cover bg-center" />

                <header className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-[#51d1f6]/30 backdrop-blur-md">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider" style={{ color: PRIMARY }}>
                        ZYKRON CONTROL CENTER
                    </h1>
                </header>

                <main className="p-6 md:p-10">
                    <div className="max-w-2xl mx-auto">
                        <Link
                            href={route('proyectos.index')}
                            className="text-sm text-gray-400 hover:text-[#51d1f6] mb-6 inline-block"
                        >
                            ← Volver a Proyectos
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#0b0b0b] border border-[#51d1f6]/30 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold mb-6" style={{ color: PRIMARY }}>
                                Crear Nuevo Proyecto
                            </h2>

                            <form onSubmit={submit} className="space-y-6">

                                {/* NOMBRE */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Nombre del proyecto *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                                </div>

                                {/* DESCRIPCIÓN */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Descripción
                                    </label>
                                    <textarea
                                        rows="3"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
                                </div>

                                {/* DROPDOWN CLIENTES */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Cliente *
                                    </label>

                                    <div
                                        onClick={() => setOpenClientes(!openClientes)}
                                        className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg cursor-pointer hover:border-[#51d1f6]/60 transition"
                                    >
                                        {clientes.find(c => c.id == data.cliente_id)?.company_name || "Seleccionar cliente"}
                                    </div>

                                    <AnimatePresence>
                                        {openClientes && (
                                            <motion.ul
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute w-full bg-black border border-[#51d1f6]/20 rounded-lg mt-2 max-h-40 overflow-y-auto z-20"
                                            >
                                                {clientes.map((c) => (
                                                    <li
                                                        key={c.id}
                                                        onClick={() => {
                                                            setData('cliente_id', c.id);
                                                            setOpenClientes(false);
                                                        }}
                                                        className="px-4 py-2 hover:bg-[#51d1f6]/20 cursor-pointer"
                                                    >
                                                        {c.company_name}
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>

                                    {errors.cliente_id && <p className="mt-1 text-sm text-red-400">{errors.cliente_id}</p>}
                                </div>

                                {/* STATUS */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Estado *
                                    </label>

                                    <div
                                        onClick={() => setOpenStatus(!openStatus)}
                                        className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg cursor-pointer hover:border-[#51d1f6]/60 transition"
                                    >
                                        {data.status}
                                    </div>

                                    <AnimatePresence>
                                        {openStatus && (
                                            <motion.ul
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute w-full bg-black border border-[#51d1f6]/20 rounded-lg mt-2 max-h-40 overflow-y-auto z-20"
                                            >
                                                {['pendiente', 'en_progreso', 'completado', 'cancelado'].map((s) => (
                                                    <li
                                                        key={s}
                                                        onClick={() => {
                                                            setData('status', s);
                                                            setOpenStatus(false);
                                                        }}
                                                        className="px-4 py-2 hover:bg-[#51d1f6]/20 cursor-pointer capitalize"
                                                    >
                                                        {s.replace('_', ' ')}
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                    {errors.status && <p className="mt-1 text-sm text-red-400">{errors.status}</p>}
                                </div>

                                {/* FECHAS */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Fecha inicio
                                        </label>
                                        <input
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                            className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                        />
                                        {errors.start_date && <p className="mt-1 text-sm text-red-400">{errors.start_date}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Fecha fin
                                        </label>
                                        <input
                                            type="date"
                                            value={data.end_date}
                                            onChange={(e) => setData('end_date', e.target.value)}
                                            className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                        />
                                        {errors.end_date && <p className="mt-1 text-sm text-red-400">{errors.end_date}</p>}
                                    </div>
                                </div>

                                {/* BOTONES */}
                                <div className="flex gap-4 mt-8">
                                    <Link
                                        href={route('proyectos.index')}
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
                                        {processing ? 'Creando...' : 'Crear Proyecto'}
                                    </button>
                                </div>

                            </form>
                        </motion.div>
                    </div>
                </main>
            </div>
        </>
    );
}