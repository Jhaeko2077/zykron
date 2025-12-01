import React, { useState, useEffect } from "react";
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

export default function ProyectoIndex({ proyectos = [] }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [filteredProyectos, setFilteredProyectos] = useState([]);

  if (!Array.isArray(proyectos)) {
    console.error("Los proyectos NO están llegando como array:", proyectos);
    return <div>Error cargando proyectos</div>;
  }

  useEffect(() => {
    const filtered = (proyectos || []).filter((p) =>
      (p.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (p.status ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (p.cliente?.company_name ?? "").toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProyectos(filtered);
    setCurrentPage(1);
  }, [search, proyectos]);

  const totalPages = Math.ceil(filteredProyectos.length / perPage);
  const paginatedProyectos = filteredProyectos.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const deleteProyecto = (id) => {
    if (confirm("¿Seguro quieres eliminar este proyecto?")) {
      router.delete(route("proyectos.destroy", id), {
        onSuccess: () => window.location.reload(),
      });
    }
  };

  return (
    <>
      <Head title="Gestión de Proyectos" />
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
                  Lista de Proyectos
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
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
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
                      Buscar Proyecto
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

                {/* TABLA DE ACTIVIDADES */}
                <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 lg:col-span-2">
                  <div className="pt-3 sm:pt-5 w-full">
                    <h2 className="text-xl font-semibold text-black dark:text-white mb-6">
                      Actividades Registradas
                    </h2>

                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-50 text-black/70 font-semibold uppercase tracking-wide text-xs dark:bg-zinc-800 dark:text-white/70">
                          <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Nombre</th>
                            <th className="px-6 py-4">Cliente</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4">Inicio</th>
                            <th className="px-6 py-4">Fin</th>
                            <th className="px-6 py-4 text-center">Acciones</th>
                          </tr>
                        </thead>

                        <tbody>
                          {paginatedProyectos.map((p) => (
                            <tr
                              key={p.id}
                              className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
                            >
                               <td className="px-6 py-4">{p.id}</td>
                                <td className="px-6 py-4">{p.name}</td>
                                <td className="px-6 py-4">{p.cliente?.company_name ?? "-"}</td>
                                <td className="px-6 py-4 capitalize">{p.status}</td>
                                <td className="px-6 py-4">{p.start_date ?? "-"}</td>
                                <td className="px-6 py-4">{p.end_date ?? "-"}</td>

                                <td className="px-6 py-4">
                                <div className="flex justify-center gap-2">
                                  <Link
                                    href={route("proyectos.edit", p.id)}
                                    className="rounded-md px-3 py-1.5 text-xs font-semibold text-white bg-[#51d1f6] ring-1 ring-transparent transition hover:bg-[#3dbee0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#51d1f6]"
                                  >
                                    Editar
                                  </Link>

                                  <button
                                    onClick={() => deleteProyecto(p.id)}
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
                            data={paginatedProyectos.map(p => ({
                            id: p.id,
                            nombre: p.name ?? "-",
                            cliente: p.cliente?.company_name ?? "-",
                            estado: p.status ?? "-",
                            inicio: p.start_date ?? "-",
                            fin: p.end_date ?? "-"
                            }))}
                            columns={[
                            { header: "ID", key: "id" },
                            { header: "Nombre", key: "nombre" },
                            { header: "Cliente", key: "cliente" },
                            { header: "Estado", key: "estado" },
                            { header: "Inicio", key: "inicio" },
                            { header: "Fin", key: "fin" },
                            ]}
                            fileName="proyectos.pdf"
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
                           onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
                          className="rounded-md px-4 py-2 text-sm font-semibold ring-1 transition disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#51d1f6] bg-white text-black ring-white/[0.05] hover:ring-black/20 dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:hover:ring-zinc-700"
                        >
                          ← Anterior
                        </button>
                         <span className="px-3 py-2">
                            Página {currentPage} de {totalPages}
                        </span>
                        {/* Números de página */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                             onClick={() => handlePageChange(page)} disabled={currentPage === totalPages}
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
                      Crear Nuevo Proyecto
                    </h2>
                    <p className="mt-4 text-sm/relaxed">
                      Agrega una nuevo proyecto al sistema haciendo clic en el botón de abajo.
                    </p>
                    <Link
                      href={route('proyectos.create')}
                      className="mt-4 inline-block rounded-md px-6 py-3 text-sm font-semibold text-white bg-[#51d1f6] shadow-[0px_14px_34px_0px_rgba(81,209,246,0.3)] ring-1 ring-transparent transition hover:bg-[#3dbee0] hover:shadow-[0px_14px_34px_0px_rgba(81,209,246,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#51d1f6]"
                    >
                      Crear Proyecto
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
                      Recarga la lista de proyectos para ver los cambios más recientes.
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
              Sistema de Gestión de Proyectos v1.0
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}