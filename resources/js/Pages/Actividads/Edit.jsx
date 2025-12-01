import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const PRIMARY = "#51d1f6";

export default function ActividadEdit({ actividad, users, tareas }) {

    const { data, setData, put, processing, errors } = useForm({
        user_id: actividad.user_id,
        tarea_id: actividad.tarea_id,
        description: actividad.description,
        due_date: actividad.due_date,
        done: actividad.done,
    });

    const [openUser, setOpenUser] = useState(false);
    const [openTarea, setOpenTarea] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        put(route('actividads.update', actividad.id), {
            onSuccess: () => {
                window.location.href = route('actividads.index');
            }
        });
    };

    return (
        <>
            <Head title="Editar Actividad" />

            <div className="min-h-screen bg-black text-white relative overflow-hidden">

                <div className="absolute inset-0 opacity-20 blur-xl pointer-events-none bg-[url('https://svgshare.com/i/14HD.svg')] bg-cover bg-center" />

                <header className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-[#51d1f6]/30 backdrop-blur-md">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider" style={{ color: PRIMARY }}>
                        ZYKRON CONTROL CENTER
                    </h1>
                </header>

                <main className="p-6 md:p-10">
                    <div className="max-w-2xl mx-auto">

                        <Link
                            href={route('actividads.index')}
                            className="text-sm text-gray-400 hover:text-[#51d1f6] mb-6 inline-block"
                        >
                            ← Volver a Actividades
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#0b0b0b] border border-[#51d1f6]/30 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold mb-6" style={{ color: PRIMARY }}>
                                Editar Actividad
                            </h2>

                            <form onSubmit={submit} className="space-y-6">

                                {/* DESCRIPCION */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Descripción *
                                    </label>
                                    <textarea
                                        rows="3"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
                                </div>

                                {/* USUARIO */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Asignado a *
                                    </label>

                                    <div
                                        onClick={() => setOpenUser(!openUser)}
                                        className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg cursor-pointer hover:border-[#51d1f6]/60 transition"
                                    >
                                        {users.find(u => u.id == data.user_id)?.name ?? "Seleccionar usuario"}
                                    </div>

                                    <AnimatePresence>
                                        {openUser && (
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
                                                            setData('user_id', u.id);
                                                            setOpenUser(false);
                                                        }}
                                                        className="px-4 py-2 hover:bg-[#51d1f6]/20 cursor-pointer"
                                                    >
                                                        {u.name}
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>

                                    {errors.user_id && <p className="mt-1 text-sm text-red-400">{errors.user_id}</p>}
                                </div>

                                {/* TAREA */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Tarea Relacionada *
                                    </label>

                                    <div
                                        onClick={() => setOpenTarea(!openTarea)}
                                        className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg cursor-pointer hover:border-[#51d1f6]/60 transition"
                                    >
                                        {tareas.find(t => t.id == data.tarea_id)?.nombre ?? "Seleccionar tarea"}
                                    </div>

                                    <AnimatePresence>
                                        {openTarea && (
                                            <motion.ul
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute w-full bg-black border border-[#51d1f6]/20 rounded-lg mt-2 max-h-40 overflow-y-auto z-20"
                                            >
                                                {tareas.map((t) => (
                                                    <li
                                                        key={t.id}
                                                        onClick={() => {
                                                            setData('tarea_id', t.id);
                                                            setOpenTarea(false);
                                                        }}
                                                        className="px-4 py-2 hover:bg-[#51d1f6]/20 cursor-pointer"
                                                    >
                                                        {t.nombre}
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>

                                    {errors.tarea_id && <p className="mt-1 text-sm text-red-400">{errors.tarea_id}</p>}
                                </div>

                                {/* FECHA */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Fecha límite *
                                    </label>
                                    <input
                                        type="date"
                                        value={data.due_date}
                                        onChange={(e) => setData('due_date', e.target.value)}
                                        className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                    />
                                    {errors.due_date && <p className="mt-1 text-sm text-red-400">{errors.due_date}</p>}
                                </div>

                                {/* SWITCH */}
                                <div className="flex items-center gap-4">
                                    <label className="text-gray-300">¿Completada?</label>

                                    <div
                                        onClick={() => setData("done", !data.done)}
                                        className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition ${
                                            data.done ? "bg-[#51d1f6]" : "bg-gray-700"
                                        }`}
                                    >
                                        <motion.div
                                            layout
                                            className="w-6 h-6 bg-white rounded-full shadow"
                                        />
                                    </div>
                                </div>

                                {/* BOTONES */}
                                <div className="flex gap-4 mt-8">
                                    <Link
                                        href={route('actividads.index')}
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
                                        {processing ? 'Guardando...' : 'Guardar Cambios'}
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