import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";

const PRIMARY = "#51d1f6";

export default function Create({ users, tareas }) {
    const { data, setData, post, processing, errors } = useForm({
        nombre: "",
        user_id: "",
        tarea_id: "",
        descripcion: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("actividads.store"));
    };

    return (
        <>
            <Head title="Crear Actividad" />

            <div className="min-h-screen bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 blur-xl pointer-events-none bg-[url('https://svgshare.com/i/14HD.svg')] bg-cover bg-center" />

                <header className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-[#51d1f6]/30 backdrop-blur-md">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider" style={{ color: PRIMARY }}>
                        ZYKRON CONTROL CENTER
                    </h1>
                </header>

                <main className="p-6 md:p-10">
                    <div className="max-w-2xl mx-auto">
                        {/* Volver */}
                        <Link
                            href={route("actividads.index")}
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
                                Crear Actividad
                            </h2>

                            <form onSubmit={submit} className="space-y-6">

                                {/* Nombre */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Nombre de la Actividad *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.nombre}
                                        onChange={(e) => setData("nombre", e.target.value)}
                                        className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                    />
                                    {errors.nombre && (
                                        <p className="mt-1 text-sm text-red-400">{errors.nombre}</p>
                                    )}
                                </div>

                                {/* Combobox Users */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Seleccionar Usuario *
                                    </label>

                                    <select
                                        value={data.user_id}
                                        onChange={(e) => setData("user_id", e.target.value)}
                                        className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                    >
                                        <option value="">-- Seleccione un usuario --</option>
                                        {users.map((u) => (
                                            <option key={u.id} value={u.id}>
                                                {u.name}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.user_id && (
                                        <p className="mt-1 text-sm text-red-400">{errors.user_id}</p>
                                    )}
                                </div>

                                {/* Combobox Tareas */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Seleccionar Tarea *
                                    </label>

                                    <select
                                        value={data.tarea_id}
                                        onChange={(e) => setData("tarea_id", e.target.value)}
                                        className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                    >
                                        <option value="">-- Seleccione una tarea --</option>
                                        {tareas.map((t) => (
                                            <option key={t.id} value={t.id}>
                                                {t.title}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.tarea_id && (
                                        <p className="mt-1 text-sm text-red-400">{errors.tarea_id}</p>
                                    )}
                                </div>

                                {/* Descripción */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Descripción
                                    </label>
                                    <textarea
                                        rows="4"
                                        value={data.descripcion}
                                        onChange={(e) => setData("descripcion", e.target.value)}
                                        className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                    />
                                </div>

                                {/* Botones */}
                                <div className="flex gap-4 pt-4">
                                    <Link
                                        href={route("actividads.index")}
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
                                        {processing ? "Guardando..." : "Crear Actividad"}
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