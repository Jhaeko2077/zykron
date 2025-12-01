import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const PRIMARY = "#51d1f6";

export default function TareaCreate({ users, proyectos }) {
    const { data, setData, post, processing, errors } = useForm({
        proyecto_id: '',
        assigned_to: '',
        title: '',
        details: '',
        status: 'pendiente',
        due_date: '',
    });

    const [openUsers, setOpenUsers] = useState(false);
    const [openProyectos, setOpenProyectos] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('tareas.store'), {
            onSuccess: () => {
                window.location.href = route('tareas.index');
            }
        });
    };

    return (
        <>
            <Head title="Crear Tarea" />

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
                            <h2 className="text-2xl font-bold mb-6" style={{ color: PRIMARY }}>
                                Crear Nueva Tarea
                            </h2>

                            <form onSubmit={submit} className="space-y-6">

                                {/* TITLE */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Título de la tarea *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
                                </div>

                                {/* DETAILS */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Detalles
                                    </label>
                                    <textarea
                                        rows="3"
                                        value={data.details}
                                        onChange={(e) => setData('details', e.target.value)}
                                        className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                    />
                                    {errors.details && <p className="mt-1 text-sm text-red-400">{errors.details}</p>}
                                </div>

                                {/* DROPDOWN PROYECTOS */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Proyecto *
                                    </label>

                                    <div
                                        onClick={() => setOpenProyectos(!openProyectos)}
                                        className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg cursor-pointer hover:border-[#51d1f6]/60 transition"
                                    >
                                        {proyectos.find(p => p.id == data.proyecto_id)?.nombre || "Seleccionar proyecto"}
                                    </div>

                                    <AnimatePresence>
                                        {openProyectos && (
                                            <motion.ul
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute w-full bg-black border border-[#51d1f6]/20 rounded-lg mt-2 max-h-40 overflow-y-auto z-20"
                                            >
                                                {proyectos.map((p) => (
                                                    <li
                                                        key={p.id}
                                                        onClick={() => {
                                                            setData('proyecto_id', p.id);
                                                            setOpenProyectos(false);
                                                        }}
                                                        className="px-4 py-2 hover:bg-[#51d1f6]/20 cursor-pointer"
                                                    >
                                                        {p.nombre}
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>

                                    {errors.proyecto_id && <p className="mt-1 text-sm text-red-400">{errors.proyecto_id}</p>}
                                </div>

                                {/* DROPDOWN USER */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Asignado a (Usuario)
                                    </label>

                                    <div
                                        onClick={() => setOpenUsers(!openUsers)}
                                        className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg cursor-pointer hover:border-[#51d1f6]/60 transition"
                                    >
                                        {users.find(u => u.id == data.assigned_to)?.name || "Seleccionar usuario"}
                                    </div>

                                    <AnimatePresence>
                                        {openUsers && (
                                            <motion.ul
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute w-full bg-black border border-[#51d1f6]/20 rounded-lg mt-2 max-h-40 overflow-y-auto z-20"
                                            >
                                                {users.map((u) => (
                                                    <li
                                                        key={u.id}
                                                        onClick={() => {
                                                            setData('assigned_to', u.id);
                                                            setOpenUsers(false);
                                                        }}
                                                        className="px-4 py-2 hover:bg-[#51d1f6]/20 cursor-pointer"
                                                    >
                                                        {u.name}
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>

                                    {errors.assigned_to && <p className="mt-1 text-sm text-red-400">{errors.assigned_to}</p>}
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
                                                {['pendiente', 'en progreso', 'completada'].map((s) => (
                                                    <li
                                                        key={s}
                                                        onClick={() => {
                                                            setData('status', s);
                                                            setOpenStatus(false);
                                                        }}
                                                        className="px-4 py-2 hover:bg-[#51d1f6]/20 cursor-pointer capitalize"
                                                    >
                                                        {s}
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                    {errors.status && <p className="mt-1 text-sm text-red-400">{errors.status}</p>}
                                </div>

                                {/* FECHA */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Fecha límite
                                    </label>
                                    <input
                                        type="date"
                                        value={data.due_date}
                                        onChange={(e) => setData('due_date', e.target.value)}
                                        className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                    />
                                    {errors.due_date && <p className="mt-1 text-sm text-red-400">{errors.due_date}</p>}
                                </div>

                                {/* BOTONES */}
                                <div className="flex gap-4 mt-8">
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
                                        {processing ? 'Creando...' : 'Crear Tarea'}
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