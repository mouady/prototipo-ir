"use client";

import Link from "next/link";
import { Users, BarChart3, Utensils, ChefHat, Flame } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="p-6 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-lg mb-4">
          <Utensils className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Prototipo Funcional IR
        </h1>
        <p className="text-slate-300 max-w-md mx-auto">
          Sistema integral de gestión para restaurantes. Selecciona tu perfil para comenzar.
        </p>
      </header>

      {/* Opciones de acceso */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl w-full">
          
          {/* Opción Camarero */}
          <Link 
            href="/camarero"
            className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-xl border border-slate-700 p-8 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden hover:from-slate-700 hover:to-slate-600"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform" />
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3">
                Vista Camarero
              </h2>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                Interfaz móvil optimizada para gestionar comandas en tiempo real. 
                Visualiza pedidos pendientes y márcalos como completados.
              </p>
              
              <div className="flex items-center gap-2 text-orange-400 font-semibold group-hover:gap-3 transition-all">
                <span>Acceder</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
            
            {/* Badge móvil */}
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-orange-500/20 text-orange-300 text-xs font-medium rounded-full border border-orange-500/30">
              📱 Móvil
            </div>
          </Link>

          {/* Opción Cocinero */}
          <Link 
            href="/cocinero"
            className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-xl border border-slate-700 p-8 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden hover:from-slate-700 hover:to-slate-600"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform" />
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <Flame className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3">
                Vista Cocinero
              </h2>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                Interfaz móvil para gestionar la cocina. Visualiza las órdenes 
                pendientes, prioridades y marca platos como completados.
              </p>
              
              <div className="flex items-center gap-2 text-red-400 font-semibold group-hover:gap-3 transition-all">
                <span>Acceder</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
            
            {/* Badge móvil */}
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-red-500/20 text-red-300 text-xs font-medium rounded-full border border-red-500/30">
              📱 Móvil
            </div>
          </Link>
          

          {/* Opción Gerente */}
          <Link 
            href="/gerente"
            className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-xl border border-slate-700 p-8 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden hover:from-slate-700 hover:to-slate-600"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform" />
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3">
                Vista Gerente
              </h2>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                Panel completo de administración. Gestiona inventario, empleados, 
                estadísticas, comandas y horarios del restaurante.
              </p>
              
              <div className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-3 transition-all">
                <span>Acceder</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
            
            {/* Badge escritorio */}
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30">
              🖥️ Escritorio
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center">
        <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Demo interactiva</span>
          </div>
          <span>•</span>
          <span>v1.0.0</span>
        </div>
      </footer>
    </div>
  );
}
