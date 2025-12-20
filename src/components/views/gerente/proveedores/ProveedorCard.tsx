"use client";

import { Proveedor, TipoProducto, useProductos } from "@/mock";
import { Phone, Mail, Copy, Apple, GlassWater, Package } from "lucide-react";

interface ProveedorCardProps {
  proveedor: Proveedor;
  onCall?: (proveedor: Proveedor) => void;
  onEmail?: (proveedor: Proveedor) => void;
}

/**
 * Tarjeta de proveedor que muestra:
 * - Información básica (nombre, CIF, teléfono, email)
 * - Métricas/badges con conteos de productos asociados
 * - Acciones rápidas (llamar, email)
 * 
 * Según especificación de UI/UX en proveedores.md
 */
export function ProveedorCard({ proveedor, onCall, onEmail }: ProveedorCardProps) {
  const { productos } = useProductos();

  // Calcular métricas de productos asociados al proveedor
  const productosDelProveedor = productos.filter(p => p.proveedor === proveedor.nombre);
  const metricas = {
    pedidos: productosDelProveedor.length, // Total de productos como proxy de pedidos
    bebidas: productosDelProveedor.filter(p => p.tipoProducto === TipoProducto.BEBIDA).length,
    recursos: productosDelProveedor.filter(p => p.tipoProducto === TipoProducto.RECURSO).length,
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleCall = () => {
    onCall?.(proveedor);
    // Fallback: abrir aplicación de teléfono
    window.open(`tel:${proveedor.tlf}`, "_blank");
  };

  const handleEmail = () => {
    onEmail?.(proveedor);
    // Fallback: abrir cliente de correo
    window.open(`mailto:${proveedor.email}`, "_blank");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        {/* Columna Izquierda: Información Básica */}
        <div className="flex-1 min-w-0 space-y-1">
          {/* Nombre del proveedor */}
          <h3 className="font-semibold text-gray-900 text-base truncate">
            {proveedor.nombre}
          </h3>
          
          {/* CIF */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="truncate">{proveedor.cif}</span>
            <button
              onClick={() => copyToClipboard(proveedor.cif)}
              className="p-0.5 hover:bg-gray-100 rounded transition-colors"
              title="Copiar CIF"
            >
              <Copy className="h-3 w-3" />
            </button>
          </div>
          
          {/* Teléfono */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="truncate">{proveedor.tlf}</span>
            <button
              onClick={() => copyToClipboard(proveedor.tlf)}
              className="p-0.5 hover:bg-gray-100 rounded transition-colors"
              title="Copiar teléfono"
            >
              <Copy className="h-3 w-3" />
            </button>
          </div>
          
          {/* Email */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="truncate max-w-[180px]">{proveedor.email}</span>
            <button
              onClick={() => copyToClipboard(proveedor.email)}
              className="p-0.5 hover:bg-gray-100 rounded transition-colors"
              title="Copiar email"
            >
              <Copy className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Columna Central: Métricas/Badges - Más grandes y centradas */}
        <div className="flex items-center justify-center gap-3 px-4">
          {/* Badge de pedidos/facturas */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              metricas.pedidos > 0
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-400"
            }`}
            title={`${metricas.pedidos} producto(s)`}
          >
            <Apple className="h-5 w-5" />
            <span className="text-base">{metricas.pedidos}</span>
          </div>
          
          {/* Badge de bebidas */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              metricas.bebidas > 0
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-400"
            }`}
            title={`${metricas.bebidas} bebida(s)`}
          >
            <GlassWater className="h-5 w-5" />
            <span className="text-base">{metricas.bebidas}</span>
          </div>
          
          {/* Badge de recursos */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              metricas.recursos > 0
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-400"
            }`}
            title={`${metricas.recursos} recurso(s)`}
          >
            <Package className="h-5 w-5" />
            <span className="text-base">{metricas.recursos}</span>
          </div>
        </div>

        {/* Columna Derecha: Acciones Rápidas */}
        <div className="flex items-center gap-2">
          {/* Botón Llamar */}
          <button
            onClick={handleCall}
            className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
            title="Llamar"
          >
            <Phone className="h-4 w-4" />
          </button>
          
          {/* Botón Email */}
          <button
            onClick={handleEmail}
            className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
            title="Enviar email"
          >
            <Mail className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
