import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

const PRIMARY = "#51d1f6";

export default function ClienteEdit({ cliente }) {
    const { data, setData, put, processing, errors } = useForm({
        company_name: cliente.company_name || '',
        contact_name: cliente.contact_name || '',
        email: cliente.email || '',
        phone: cliente.phone || '',
        address: cliente.address || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('clientes.update', cliente.id));
    };

    return (
        <>
            <Head title="Editar Cliente" />
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
                            href={route('clientes.index')}
                            className="text-sm text-gray-400 hover:text-[#51d1f6] mb-6 inline-block"
                        >
                            ← Volver a Clientes
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#0b0b0b] border border-[#51d1f6]/30 rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold mb-6" style={{ color: PRIMARY }}>
                                Editar Cliente
                            </h2>

                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Nombre de Empresa *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.company_name}
                                            onChange={(e) => setData('company_name', e.target.value)}
                                            className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                        />
                                        {errors.company_name && <p className="mt-1 text-sm text-red-400">{errors.company_name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Persona de Contacto *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.contact_name}
                                            onChange={(e) => setData('contact_name', e.target.value)}
                                            className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                        />
                                        {errors.contact_name && <p className="mt-1 text-sm text-red-400">{errors.contact_name}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
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
                                            Dirección
                                        </label>
                                        <input
                                            type="text"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            className="w-full px-4 py-2 bg-black border border-[#51d1f6]/20 rounded-lg text-white focus:border-[#51d1f6]/60 outline-none transition"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <Link
                                        href={route('clientes.index')}
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