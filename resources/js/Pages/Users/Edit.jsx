import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import backgroundImage from '../../assets/background.svg';

const PRIMARY = "#51d1f6";

export default function UserEdit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        last_name: user.last_name || '',
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        area: user.area || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id));
    };

    return (
        <>
            <Head title="Editar Usuario" />
            <div className="min-h-screen bg-black text-white relative overflow-hidden">
                <img src={backgroundImage} className="absolute -left-20 top-0 max-w-[877px]" alt="" />
                <div className="absolute inset-0 opacity-20 blur-xl pointer-events-none bg-[url('https://svgshare.com/i/14HD.svg')] bg-cover bg-center" />

                <header className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-[#51d1f6]/30 backdrop-blur-md">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider" style={{ color: PRIMARY }}>
                        ZYKRON CONTROL CENTER
                    </h1>
                </header>

                <main className="p-6 md:p-10">
                    <div className="max-w-2xl mx-auto">
                        <Link
                            href={route('users.index')}
                            className="text-sm text-gray-400 hover:text-[#51d1f6] mb-6 inline-block"
                        >
                            ← Volver a Usuarios
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#0b0b0b] border border-[#51d1f6]/30 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold mb-6" style={{ color: PRIMARY }}>
                                Editar Usuario
                            </h2>

                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Nombre *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Apellido *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.last_name}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                        />
                                        {errors.last_name && <p className="mt-1 text-sm text-red-400">{errors.last_name}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Usuario *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.username}
                                            onChange={(e) => setData('username', e.target.value)}
                                            className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                        />
                                        {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Teléfono
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                        />
                                    </div>

                                    <div>
                                       <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Área Profesional
                                        </label>
                                        <select
                                            value={data.area}
                                            onChange={(e) => setData('area', e.target.value)}
                                            className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition appearance-none cursor-pointer"
                                        >
                                            <option value="">Selecciona un área...</option>
                                            <option value="Developer Web - Backend">Developer Web - Backend</option>
                                            <option value="Developer Web - Frontend">Developer Web - Frontend</option>
                                            <option value="Developer Fullstack">Developer Fullstack</option>
                                            <option value="Ingeniero de Software">Ingeniero de Software</option>
                                            <option value="Ingeniero de Inteligencia Artificial">Ingeniero de Inteligencia Artificial</option>
                                            <option value="Auditor de Requerimientos">Auditor de Requerimientos</option>
                                            <option value="Diseñador@ Grafico">Diseñador@ Grafico</option>
                                        </select>
                                        {errors.area && <p className="mt-1 text-sm text-red-400">{errors.area}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Dirección
                                    </label>
                                    <input
                                        type="text"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                    />
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <Link
                                        href={route('users.index')}
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
                                        {processing ? 'Actualizando...' : 'Guardar Cambios'}
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