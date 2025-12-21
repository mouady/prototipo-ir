"use client";

import Link from "next/link";
import Image from "next/image";
import { Users, BarChart3, ChefHat, Info, Database, Clock, Bell, Package, Calendar, Utensils } from "lucide-react";
import { getPublicPath } from "@/lib/path";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="p-6 text-center border-b border-slate-700/50">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-lg mb-4 overflow-hidden">
          <Image
            src={getPublicPath("/logoFinal.jpg")}
            alt="Bar El Punto Logo"
            width={96}
            height={96}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          ¡Bienvenid@ al prototipo funcional de Bar El Punto! 
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Sistema de gestión integral para restaurantes. Selecciona un rol para explorar las diferentes interfaces y funcionalidades disponibles.
        </p>
      </header>

      {/* Sección informativa */}
      <div className="bg-slate-800/50 border-b border-slate-700/50 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <Info className="w-5 h-5" />
            <span className="font-semibold">¿Cómo funciona este prototipo?</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-300">
            <div className="flex items-start gap-2">
              <Database className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Datos simulados:</strong> Todos los datos son de prueba y se reinician al recargar la página.</span>
            </div>
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Múltiples roles:</strong> Explora las interfaces de Camarero, Cocinero y Gerente.</span>
            </div>
            <div className="flex items-start gap-2">
              <Utensils className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Interactivo:</strong> Crea comandas, gestiona empleados, revisa estadísticas y más.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Opciones de acceso */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">Selecciona una vista para comenzar</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Opción Camarero */}
          <Link 
            href="/mobile/camarero"
            className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-xl border border-slate-700 p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden hover:from-slate-700 hover:to-slate-600"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs font-medium rounded-full border border-orange-500/30">
                  📱 Móvil
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-white mb-2">
                🤵 Vista Camarero
              </h2>
              
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                Interfaz móvil para la gestión de sala y atención al cliente.
              </p>
              
              {/* Funcionalidades disponibles */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded-md">Mesas</span>
                <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded-md">Comandas</span>
                <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded-md">Fichajes</span>
              </div>
              
              <div className="flex items-center gap-2 text-orange-400 font-semibold text-sm group-hover:gap-3 transition-all">
                <span>Explorar vista</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Opción Cocinero Móvil */}
          <Link 
            href="/mobile/cocinero"
            className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-xl border border-slate-700 p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden hover:from-slate-700 hover:to-slate-600"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <ChefHat className="w-7 h-7 text-white" />
                </div>
                <div className="px-3 py-1 bg-red-500/20 text-red-300 text-xs font-medium rounded-full border border-red-500/30">
                  📱 Móvil
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-white mb-2">
                🧑‍🍳 Vista Cocinero
              </h2>
              
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                Interfaz móvil para personal de cocina y control de presencia.
              </p>
              
              {/* Funcionalidades disponibles */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded-md">Avisos</span>
                <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded-md">Fichajes</span>
              </div>
              
              <div className="flex items-center gap-2 text-red-400 font-semibold text-sm group-hover:gap-3 transition-all">
                <span>Explorar vista</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Opción Cocinero Escritorio */}
          <Link 
            href="/desktop/cocinero"
            className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-xl border border-slate-700 p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden hover:from-slate-700 hover:to-slate-600"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                  <ChefHat className="w-7 h-7 text-white" />
                </div>
                <div className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-medium rounded-full border border-amber-500/30">
                  🖥️ Escritorio
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-white mb-2">
                🧑‍🍳 Vista Cocinero
              </h2>
              
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                Panel de cocina con visión ampliada para gestión de pedidos.
              </p>
              
              {/* Funcionalidades disponibles */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded-md">Comandas</span>
                <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded-md">Historial</span>
              </div>
              
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm group-hover:gap-3 transition-all">
                <span>Explorar vista</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
          

          {/* Opción Gerente */}
          <Link 
            href="/desktop"
            className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-xl border border-slate-700 p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden hover:from-slate-700 hover:to-slate-600"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <div className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30">
                  🖥️ Escritorio
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-white mb-2">
                💼 Vista Gerente
              </h2>
              
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                Panel completo de administración con todas las funcionalidades.
              </p>
              
              {/* Funcionalidades disponibles */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded-md">Empleados</span>
                <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded-md">Inventario</span>
                <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded-md">Horarios</span>
                <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded-md">Estadísticas</span>
                <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded-md">+3 más</span>
              </div>
              
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all">
                <span>Explorar vista</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
        </div>
      </main>

      {/* Sección de funcionalidades */}
      <div className="bg-slate-800/30 border-t border-slate-700/50 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg font-semibold text-white mb-6 text-center">✨ Funcionalidades disponibles en el prototipo</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 text-orange-400 mb-2">
                <Utensils className="w-5 h-5" />
                <span className="font-medium">Comandas</span>
              </div>
              <p className="text-sm text-slate-400">Crea, visualiza y gestiona pedidos. Marca platos como listos y organiza la cocina.</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <Users className="w-5 h-5" />
                <span className="font-medium">Empleados</span>
              </div>
              <p className="text-sm text-slate-400">Gestiona la plantilla completa: perfiles, roles, contratos y datos de contacto.</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">Horarios</span>
              </div>
              <p className="text-sm text-slate-400">Calendario semanal con turnos de trabajo. Asigna y modifica horarios fácilmente.</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <Package className="w-5 h-5" />
                <span className="font-medium">Inventario</span>
              </div>
              <p className="text-sm text-slate-400">Control de platos, productos y stock. Gestiona el menú y los ingredientes.</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 text-red-400 mb-2">
                <Bell className="w-5 h-5" />
                <span className="font-medium">Avisos</span>
              </div>
              <p className="text-sm text-slate-400">Sistema de notificaciones para comunicación interna entre el personal.</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <BarChart3 className="w-5 h-5" />
                <span className="font-medium">Estadísticas</span>
              </div>
              <p className="text-sm text-slate-400">Dashboard con métricas, gráficos y análisis del rendimiento del negocio.</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 text-yellow-400 mb-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Fichajes</span>
              </div>
              <p className="text-sm text-slate-400">Registro de entradas y salidas del personal con historial completo.</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 text-pink-400 mb-2">
                <Package className="w-5 h-5" />
                <span className="font-medium">Proveedores</span>
              </div>
              <p className="text-sm text-slate-400">Gestión de proveedores, pedidos y relaciones comerciales.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 text-center border-t border-slate-700/50">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
            <span>Grupo IR2526-G1-BB-06</span>
            <span>•</span>
            <span>v2.0.0</span>
          </div>
          <p className="text-xs text-slate-500">
            Desarrollado con Next.js 15, TypeScript y Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
