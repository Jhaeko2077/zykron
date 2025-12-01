import React, { useState } from "react";
import backgroundImage from '../../assets/background.svg';
import DownloadPDFButton from "../../components/DownloadPDFButton";
import { Head, Link, router } from '@inertiajs/react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ClienteIndex({ clientes = [], meses = [], cantidadClientes = [], empresas = {} }) {
  
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Clientes por página

  // ---- FORMATEAR DATOS PARA GRAFICOS ----
  const empresasData = Object.entries(empresas).map(([nombre, cantidad]) => ({
    nombre,
    cantidad,
  }));

  // ---- BUSQUEDA LOCAL ----
    // ---- BUSQUEDA LOCAL ----
  const filteredClientes = clientes.filter((c) =>
    [c.contact_name, c.company_name, c.email, c.phone, c.address]
      .some((v) => v?.toLowerCase().includes(search.toLowerCase()))
  );

  // ---- PAGINACION ----
  const totalPages = Math.ceil(filteredClientes.length / itemsPerPage);
  const paginatedClientes = filteredClientes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // ---- ELIMINAR CLIENTE ----
  const deleteClient = (id) => {
    if (!confirm("¿Estás seguro?")) return;
    router.delete(route('clientes.destroy', id));
  };

  return (
    <>
      <Head title="Gestión de Clientes" />
      {/* ========== BACKGROUND IGUAL AL WELCOME.JSX ========== */}
      <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
        <img
          id="background"
          className="absolute -left-20 top-0 max-w-[877px]"
          src={backgroundImage}
          alt=""
        />
        <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#51d1f6] selection:text-white">
          <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
            
            {/* ========== HEADER ========== */}
            <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
              <div className="flex lg:col-start-2 lg:justify-center">
                <h1 className="text-4xl font-semibold text-black dark:text-white">
                  Lista de Clientes
                </h1>
              </div>
              <nav className="-mx-3 flex flex-1 justify-end">
                <Link
                  href={route('dashboard')}
                  className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#51d1f6] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                >
                  Dashboard
                </Link>
              </nav>
            </header>

            <main className="mt-6">
              {/* ========== GRÁFICOS ========== */}
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                
                {/* GRÁFICO 1: BarChart */}
                <div className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#51d1f6] lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#51d1f6]">
                  <div className="relative flex items-center gap-6 lg:items-end w-full">
                    <div className="flex items-start gap-6 lg:flex-col">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#51d1f6]/10 sm:size-16">
                        <svg
                          className="size-5 sm:size-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#51d1f6"
                            d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
                          />
                        </svg>
                      </div>

                      <div className="pt-3 sm:pt-5 lg:pt-0">
                        <h2 className="text-xl font-semibold text-black dark:text-white">
                          Crecimiento de Clientes
                        </h2>
                        <p className="mt-4 text-sm/relaxed">
                          Visualiza la distribución de clientes por empresa en un gráfico de barras interactivo.
                        </p>
                      </div>
                    </div>

                    <svg
                      className="size-6 shrink-0 stroke-[#51d1f6]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg>
                  </div>

                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={empresasData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="nombre" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#18181b",
                          border: "none",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                      <Bar dataKey="cantidad" fill="#51d1f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* GRÁFICO 2: PieChart */}
                <div className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#51d1f6] lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#51d1f6]">
                  <div className="relative flex items-center gap-6 lg:items-end w-full">
                    <div className="flex items-start gap-6 lg:flex-col">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#51d1f6]/10 sm:size-16">
                        <svg
                          className="size-5 sm:size-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <g fill="#51d1f6">
                            <path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2 0v9h9c-.5-4.82-4.18-8.5-9-9zm0 11v9c4.82-.5 8.5-4.18 9-9h-9z" />
                          </g>
                        </svg>
                      </div>

                      <div className="pt-3 sm:pt-5 lg:pt-0">
                        <h2 className="text-xl font-semibold text-black dark:text-white">
                          Distribución por Empresa
                        </h2>
                        <p className="mt-4 text-sm/relaxed">
                          Observa la proporción de clientes de cada empresa en un gráfico circular.
                        </p>
                      </div>
                    </div>

                    <svg
                      className="size-6 shrink-0 stroke-[#51d1f6]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg>
                  </div>

                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={empresasData}
                        dataKey="cantidad"
                        nameKey="nombre"
                        outerRadius={120}
                        fill="#51d1f6"
                        label
                      >
                        {empresasData.map((_, i) => (
                          <Cell key={i} fill={`hsl(${190 + i * 30}, 80%, 65%)`} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#18181b",
                          border: "none",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* BUSCADOR */}
                <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#51d1f6] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#51d1f6] lg:col-span-2">                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#51d1f6]/10 sm:size-16">
                    <svg
                      className="size-5 sm:size-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#51d1f6"
                        d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                      />
                    </svg>
                  </div>

                  <div className="pt-3 sm:pt-5 flex-1">
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                      Buscar Cliente
                    </h2>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar por nombre, empresa o email..."
                      className="mt-4 w-full p-3 rounded-md bg-gray-50 border border-gray-200 text-black text-sm placeholder-black/50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#51d1f6] dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:placeholder-white/50"
                    />
                  </div>

                  <svg
                    className="size-6 shrink-0 self-center stroke-[#51d1f6]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </div>

                {/* TABLA DE CLIENTES */}
                <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 lg:col-span-2">
                  <div className="pt-3 sm:pt-5 w-full">
                    <h2 className="text-xl font-semibold text-black dark:text-white mb-6">
                      Clientes Registrados
                    </h2>

                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-50 text-black/70 font-semibold uppercase tracking-wide text-xs dark:bg-zinc-800 dark:text-white/70">
                          <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Empresa</th>
                            <th className="px-6 py-4">Nombre</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Celular</th>
                            <th className="px-6 py-4">Dirección</th>
                            <th className="px-6 py-4 text-center">Acciones</th>
                          </tr>
                        </thead>

                        <tbody>
                          {paginatedClientes.map((c) => (
                            <tr
                              key={c.id}
                              className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
                            >
                              <td className="px-6 py-4 text-black dark:text-white">{c.id}</td>
                              <td className="px-6 py-4 text-black dark:text-white">{c.company_name}</td>
                              <td className="px-6 py-4 text-black dark:text-white">{c.contact_name}</td>
                              <td className="px-6 py-4 text-black dark:text-white">{c.email}</td>
                              <td className="px-6 py-4 text-black dark:text-white">{c.phone}</td>
                              <td className="px-6 py-4 text-black dark:text-white">{c.address}</td>
                              <td className="px-6 py-4">
                                <div className="flex justify-center gap-2">
                                  <Link
                                    href={route('clientes.edit', c.id)}
                                    className="rounded-md px-3 py-1.5 text-xs font-semibold text-white bg-[#51d1f6] ring-1 ring-transparent transition hover:bg-[#3dbee0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#51d1f6]"
                                  >
                                    Editar
                                  </Link>

                                  <button
                                    onClick={() => deleteClient(c.id)}
                                    className="rounded-md px-3 py-1.5 text-xs font-semibold text-white bg-red-500 ring-1 ring-transparent transition hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                                  >
                                    Borrar
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="flex justify-end mt-4">
                        <DownloadPDFButton
                          data={paginatedClientes.map(c => ({
                            id: c.id,
                            empresa: c.company_name ?? "-",
                            nombre: c.contact_name ?? "-",
                            email: c.email ?? "-",
                            celular: c.phone ?? "-",
                            direccion: c.address ?? "-"
                          }))}
                          columns={[
                            { header: "ID", key: "id" },
                            { header: "Empresa", key: "empresa" },
                            { header: "Nombre", key: "nombre" },
                            { header: "Email", key: "email" },
                            { header: "Celular", key: "celular" },
                            { header: "Dirección", key: "direccion" },
                          ]}
                          fileName="clientes.pdf"
                        />
                      </div>
                  </div>
                {/* PAGINACIÓN */}
                {totalPages > 1 && (
                  <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 lg:col-span-2">
                    <div className="pt-3 sm:pt-5 w-full">
                      <h2 className="text-xl font-semibold text-black dark:text-white mb-6">
                        Paginación
                      </h2>
                      <div className="flex justify-center gap-2 flex-wrap">
                        {/* Botón Anterior */}
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="rounded-md px-4 py-2 text-sm font-semibold ring-1 transition disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#51d1f6] bg-white text-black ring-white/[0.05] hover:ring-black/20 dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:hover:ring-zinc-700"
                        >
                          ← Anterior
                        </button>

                        {/* Números de página */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`rounded-md px-4 py-2 text-sm font-semibold ring-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#51d1f6] ${
                              currentPage === page
                                ? "bg-[#51d1f6] text-white ring-[#51d1f6]"
                                : "bg-white text-black ring-white/[0.05] hover:ring-black/20 dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:hover:ring-zinc-700"
                            }`}
                          >
                            {page}
                          </button>
                        ))}

                        {/* Botón Siguiente */}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="rounded-md px-4 py-2 text-sm font-semibold ring-1 transition disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#51d1f6] bg-white text-black ring-white/[0.05] hover:ring-black/20 dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:hover:ring-zinc-700"
                        >
                          Siguiente →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* BOTONES DE ACCIÓN */}
                  </div>
                </div>
                

                {/* BOTONES DE ACCIÓN */}
                <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#51d1f6]/10 sm:size-16">
                    <svg
                      className="size-5 sm:size-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#51d1f6"
                        d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                      />
                    </svg>
                  </div>

                  <div className="pt-3 sm:pt-5 flex-1">
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                      Crear Nuevo Cliente
                    </h2>
                    <p className="mt-4 text-sm/relaxed">
                      Agrega un nuevo cliente al sistema haciendo clic en el botón de abajo.
                    </p>
                    <Link
                      href={route('clientes.create')}
                      className="mt-4 inline-block rounded-md px-6 py-3 text-sm font-semibold text-white bg-[#51d1f6] shadow-[0px_14px_34px_0px_rgba(81,209,246,0.3)] ring-1 ring-transparent transition hover:bg-[#3dbee0] hover:shadow-[0px_14px_34px_0px_rgba(81,209,246,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#51d1f6]"
                    >
                      Crear Cliente
                    </Link>
                  </div>

                  <svg
                    className="size-6 shrink-0 self-center stroke-[#51d1f6]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </div>

                <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#51d1f6]/10 sm:size-16">
                    <svg
                      className="size-5 sm:size-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#51d1f6"
                        d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
                      />
                    </svg>
                  </div>

                  <div className="pt-3 sm:pt-5 flex-1">
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                      Actualizar Lista
                    </h2>
                    <p className="mt-4 text-sm/relaxed">
                      Recarga la lista de clientes para ver los cambios más recientes.
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 rounded-md px-6 py-3 text-sm font-semibold text-black bg-white ring-1 ring-white/[0.05] shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] transition hover:ring-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#51d1f6] dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:hover:ring-zinc-700"
                    >
                      Actualizar
                    </button>
                  </div>

                  <svg
                    className="size-6 shrink-0 self-center stroke-[#51d1f6]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </div>
              </div>
            </main>

            <footer className="py-16 text-center text-sm text-black dark:text-white/70">
              Sistema de Gestión de Clientes v1.0
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}