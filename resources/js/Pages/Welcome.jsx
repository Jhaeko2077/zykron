import React, { useState, useEffect } from "react";
import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: (
        <svg className="size-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Velocidad Extrema",
      description: "Procesamiento ultra rápido con tecnología de última generación"
    },
    {
      icon: (
        <svg className="size-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Seguridad Total",
      description: "Protección avanzada para tus datos más importantes"
    },
    {
      icon: (
        <svg className="size-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Análisis Inteligente",
      description: "Visualiza datos en tiempo real con dashboards interactivos"
    },
    {
      icon: (
        <svg className="size-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Cloud Integrado",
      description: "Accede desde cualquier lugar con sincronización automática"
    }
  ];

  const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "10K+", label: "Usuarios" },
    { value: "50M+", label: "Transacciones" },
    { value: "24/7", label: "Soporte" }
  ];

  return (
    <>
      <Head title="Bienvenido" />
      
      <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1400ms' }}></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(81,209,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(81,209,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10">
          {/* Navigation */}
          <nav className="border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur-lg opacity-50 animate-pulse"></div>
                    <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 p-2.5 rounded-xl">
                      <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path fill="white" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                      </svg>
                    </div>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    GestiónPro
                  </span>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                  <Link
                    href={route('login')}
                    className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    href={route('register')}
                    className="relative group px-6 py-2.5 rounded-lg text-sm font-semibold text-white overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <span className="relative">Registrarse</span>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="relative py-20 lg:py-32">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8 animate-fade-in">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-300">Versión 2.0 disponible ahora</span>
                </div>

                {/* Main Title */}
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                    Gestión Empresarial
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    TecnoSolutions-Zykron
                  </span>
                </h1>

                <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
                  Potencia tu negocio con la plataforma más avanzada de gestión empresarial.
                  Administra clientes, proyectos, tareas y más desde un solo lugar.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                  <Link
                    href={route('register')}
                    className="relative group px-8 py-4 rounded-xl text-lg font-semibold text-white overflow-hidden w-full sm:w-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative flex items-center justify-center gap-2">
                      Comenzar Gratis
                      <svg className="size-5 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>

                  <button className="px-8 py-4 rounded-xl text-lg font-semibold text-white hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2">
                    <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Ver Demo
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300"
                    >
                      <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Dashboard Preview */}
            <div className="max-w-6xl mx-auto px-6 mt-20">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/20 rounded-3xl p-2 overflow-hidden">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8">
                    {/* Mock Dashboard */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl animate-pulse"></div>
                      <div className="h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl animate-pulse" style={{ animationDelay: '200ms' }}></div>
                      <div className="h-24 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl animate-pulse" style={{ animationDelay: '400ms' }}></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-40 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl border border-white/10"></div>
                      <div className="h-40 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl border border-white/10"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-gradient-to-b from-transparent to-white/[0.02]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Características Revolucionarias
                  </span>
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  Todo lo que necesitas para llevar tu empresa al siguiente nivel
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`group relative bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border rounded-2xl p-8 transition-all duration-500 ${
                      activeFeature === index
                        ? 'border-cyan-500/50 scale-105'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="relative">
                      <div className={`inline-flex p-4 rounded-2xl mb-6 transition-all duration-500 ${
                        activeFeature === index
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 scale-110'
                          : 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500 group-hover:to-blue-500'
                      }`}>
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="max-w-5xl mx-auto px-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/20 rounded-3xl p-12 lg:p-16 text-center">
                  <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                      ¿Listo para transformar tu negocio?
                    </span>
                  </h2>
                  <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                    Únete a miles de empresas que ya confían en nosotros para gestionar sus operaciones
                  </p>
                  <Link
                    href={route('register')}
                    className="inline-block relative group px-10 py-5 rounded-xl text-lg font-semibold text-white overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative flex items-center gap-2">
                      Empieza Ahora - Es Gratis
                      <svg className="size-5 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-white/10 backdrop-blur-xl bg-white/5">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-xl">
                      <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path fill="white" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                      </svg>
                    </div>
                    <span className="text-xl font-bold">GestiónPro</span>
                  </div>
                  <p className="text-sm text-slate-400">
                    La solución definitiva para la gestión empresarial moderna
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Producto</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Características</a></li>
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Precios</a></li>
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Seguridad</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Empresa</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Nosotros</a></li>
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Carreras</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Soporte</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Centro de Ayuda</a></li>
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Contacto</a></li>
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Estado</a></li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-400">
                  © 2024 GestiónPro. Todos los derechos reservados.
                </p>
                <div className="flex gap-6">
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}