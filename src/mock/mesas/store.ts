/**
 * Store del módulo de mesas, cuentas y reservas
 * Maneja el estado en memoria
 * 
 * IMPORTANTE: Este store está sincronizado con el store de comandas.
 * Las comandas creadas aquí se registran en el store de comandas
 * y los cambios del cocinero se reflejan aquí.
 */

import type { Mesa, Cuenta, Propina, Reserva, MesaConEstado, NuevaReserva, NuevaPropina } from "./types";
import { Zona, EstadoMesa } from "./types";
import {
  SEED_MESAS,
  SEED_CUENTAS,
  SEED_PROPINAS,
  SEED_RESERVAS,
  SEED_COMANDAS_MESA,
  PRODUCTOS_VENDIBLES,
  ComandaMesa,
  LineaComandaMesa,
  ProductoVendibleSimple,
  FormatoPlato,
} from "./seed";
import { notifyListeners } from "../shared/store-base";
import { Estado } from "../shared/types";
import { FormatoPlato as FormatoEnum } from "../comandas/types";

// ============================================
// MAPEO DE FORMATOS
// ============================================

/** Mapea el formato de mesa al enum de comandas */
function mapFormatoToEnum(formato: FormatoPlato): FormatoEnum {
  const mapping: Record<FormatoPlato, FormatoEnum> = {
    ESTANDAR: FormatoEnum.ESTANDAR,
    TAPA: FormatoEnum.TAPA,
    MEDIA: FormatoEnum.MEDIA,
    RACION: FormatoEnum.RACION,
  };
  return mapping[formato];
}

// ============================================
// SINCRONIZACIÓN CON COMANDAS (GERENTE/COCINERO)
// ============================================

/**
 * Mapeo entre IDs de comandas del store de gerente y comandas de mesa.
 * Para las comandas seed, los IDs ya coinciden (comanda-mesaX-Y).
 * Para las comandas runtime, se registran al crear.
 */
const comandasMapeadas: Map<string, string> = new Map();

// Inicializar mapeo para comandas seed que tienen platos
// Los IDs ya coinciden entre SEED_COMANDAS (gerente) y SEED_COMANDAS_MESA
SEED_COMANDAS_MESA.forEach((comanda) => {
  // Solo mapear si tiene platos (las que aparecen en vista gerente)
  if (comanda.lineas.some((l) => l.esPlato)) {
    comandasMapeadas.set(comanda.id, comanda.id);
  }
});

/**
 * Sincroniza el estado de una comanda desde la vista del gerente.
 * Cuando el cocinero marca una comanda como lista, actualiza
 * las líneas correspondientes en las comandas de mesa.
 */
export function sincronizarEstadoDesdeGerente(comandaId: string, estado: Estado): void {
  // Buscar la comanda de mesa correspondiente
  // Para seed, el ID es el mismo; para runtime, buscar en el mapeo
  const comandaMesaId = comandasMapeadas.get(comandaId) || comandaId;

  const comanda = getComandaMesaById(comandaMesaId);
  if (!comanda) return;

  // Actualizar estado de las líneas de platos
  const estadoLinea = estado === Estado.REALIZADO ? "REALIZADO" : "EN_PREPARACION";
  const estadoComanda = estado === Estado.REALIZADO ? "REALIZADA" : "EN_COCINA";

  const comandaActualizada: ComandaMesa = {
    ...comanda,
    estado: estadoComanda,
    lineas: comanda.lineas.map((linea) => ({
      ...linea,
      estado: linea.esPlato ? estadoLinea : linea.estado,
    })),
  };

  // Guardar cambios
  if (runtimeComandasMesa.find((c) => c.id === comandaMesaId)) {
    const idx = runtimeComandasMesa.findIndex((c) => c.id === comandaMesaId);
    runtimeComandasMesa[idx] = comandaActualizada;
  } else {
    modificacionesComandasMesa.set(comandaMesaId, comandaActualizada);
  }

  notifyListeners();
}

/**
 * Sincroniza el estado de una línea específica desde la vista del gerente.
 * Cuando el cocinero marca un plato individual como listo.
 */
export function sincronizarLineaDesdeGerente(comandaId: string, lineaId: string, estado: Estado): void {
  const comandaMesaId = comandasMapeadas.get(comandaId) || comandaId;

  const comanda = getComandaMesaById(comandaMesaId);
  if (!comanda) return;

  const estadoLinea = estado === Estado.REALIZADO ? "REALIZADO" : "EN_PREPARACION";

  const comandaActualizada: ComandaMesa = {
    ...comanda,
    lineas: comanda.lineas.map((linea) => 
      linea.id === lineaId ? { ...linea, estado: estadoLinea } : linea
    ),
  };

  // Recalcular estado de la comanda
  const todasServidas = comandaActualizada.lineas.every((l) => l.estado === "SERVIDO");
  const todasRealizadasOServidas = comandaActualizada.lineas.every(
    (l) => l.estado === "REALIZADO" || l.estado === "SERVIDO"
  );
  
  if (todasServidas) {
    comandaActualizada.estado = "ENTREGADA";
  } else if (todasRealizadasOServidas) {
    comandaActualizada.estado = "REALIZADA";
  } else {
    comandaActualizada.estado = "EN_COCINA";
  }

  // Guardar cambios
  if (runtimeComandasMesa.find((c) => c.id === comandaMesaId)) {
    const idx = runtimeComandasMesa.findIndex((c) => c.id === comandaMesaId);
    runtimeComandasMesa[idx] = comandaActualizada;
  } else {
    modificacionesComandasMesa.set(comandaMesaId, comandaActualizada);
  }

  notifyListeners();
}

// ============================================
// ESTADO EN MEMORIA (Runtime)
// ============================================
let runtimeCuentas: Cuenta[] = [];
let runtimePropinas: Propina[] = [];
let runtimeReservas: Reserva[] = [];
let runtimeComandasMesa: ComandaMesa[] = [];

const modificacionesCuentas: Map<string, Cuenta> = new Map();
const modificacionesReservas: Map<string, Reserva> = new Map();
const modificacionesComandasMesa: Map<string, ComandaMesa> = new Map();

let nextCuentaId = 1;
let nextPropinaId = 1;
let nextReservaId = 100;
let nextComandaMesaId = 100;

// ============================================
// GETTERS: MESAS
// ============================================

/** Obtiene todas las mesas */
export function getMesas(): Mesa[] {
  return SEED_MESAS;
}

/** Obtiene una mesa por ID */
export function getMesaById(id: string): Mesa | undefined {
  return SEED_MESAS.find((m) => m.id === id);
}

/** Obtiene mesas por zona */
export function getMesasByZona(zona: Zona): Mesa[] {
  return SEED_MESAS.filter((m) => m.zona === zona);
}

/** Obtiene todas las mesas con su estado actual */
export function getMesasConEstado(): MesaConEstado[] {
  return SEED_MESAS.map((mesa) => {
    const cuenta = getCuentaActivaByMesa(mesa.id);
    const comandas = getComandasByMesa(mesa.id);
    
    // Contar platos listos (REALIZADO) no servidos
    const platosListos = comandas.reduce((total, comanda) => {
      return total + comanda.lineas.filter(
        (l) => l.esPlato && l.estado === "REALIZADO"
      ).length;
    }, 0);

    let estado = EstadoMesa.LIBRE;
    if (cuenta) {
      estado = platosListos > 0 ? EstadoMesa.ATENCIÓN_REQUERIDA : EstadoMesa.OCUPADA;
    }

    return {
      ...mesa,
      estado,
      cuentaActiva: cuenta || undefined,
      camareroResponsable: cuenta?.camareroNombre,
      tieneNuevosPlatosListos: platosListos > 0,
      platosListosCount: platosListos,
    };
  });
}

// ============================================
// GETTERS: CUENTAS
// ============================================

/** Obtiene todas las cuentas */
export function getCuentas(): Cuenta[] {
  const seedCuentas = SEED_CUENTAS.map((c) =>
    modificacionesCuentas.has(c.id) ? modificacionesCuentas.get(c.id)! : c
  );
  return [...seedCuentas, ...runtimeCuentas];
}

/** Obtiene cuenta activa por mesa */
export function getCuentaActivaByMesa(mesaId: string): Cuenta | null {
  const cuentas = getCuentas();
  return cuentas.find((c) => c.mesaId === mesaId && !c.cerrada) || null;
}

/** Obtiene una cuenta por ID */
export function getCuentaById(id: string): Cuenta | undefined {
  return getCuentas().find((c) => c.id === id);
}

// ============================================
// GETTERS: COMANDAS DE MESA
// ============================================

/** Obtiene todas las comandas de mesa */
export function getComandasMesa(): ComandaMesa[] {
  const seedComandas = SEED_COMANDAS_MESA.map((c) =>
    modificacionesComandasMesa.has(c.id) ? modificacionesComandasMesa.get(c.id)! : c
  );
  return [...seedComandas, ...runtimeComandasMesa];
}

/** Obtiene comandas por mesa */
export function getComandasByMesa(mesaId: string): ComandaMesa[] {
  return getComandasMesa().filter((c) => c.mesaId === mesaId);
}

/** Obtiene una comanda por ID */
export function getComandaMesaById(id: string): ComandaMesa | undefined {
  return getComandasMesa().find((c) => c.id === id);
}

// ============================================
// GETTERS: PROPINAS
// ============================================

/** Obtiene propina por cuenta */
export function getPropinaByIdCuenta(cuentaId: string): Propina | null {
  const propinas = [...SEED_PROPINAS, ...runtimePropinas];
  return propinas.find((p) => p.cuentaId === cuentaId) || null;
}

// ============================================
// GETTERS: RESERVAS
// ============================================

/** Obtiene todas las reservas */
export function getReservas(): Reserva[] {
  const seedReservas = SEED_RESERVAS.map((r) =>
    modificacionesReservas.has(r.id) ? modificacionesReservas.get(r.id)! : r
  );
  return [...seedReservas, ...runtimeReservas];
}

/** Obtiene reservas por fecha */
export function getReservasByFecha(fecha: Date): Reserva[] {
  const fechaStr = fecha.toISOString().split("T")[0];
  return getReservas().filter((r) => {
    const reservaFechaStr = r.fechaHora.toISOString().split("T")[0];
    return reservaFechaStr === fechaStr;
  });
}

/** Obtiene reservas activas (no terminadas) por fecha */
export function getReservasActivasByFecha(fecha: Date): Reserva[] {
  return getReservasByFecha(fecha).filter((r) => !r.terminada);
}

/** Obtiene una reserva por ID */
export function getReservaById(id: string): Reserva | undefined {
  return getReservas().find((r) => r.id === id);
}

// ============================================
// GETTERS: PRODUCTOS VENDIBLES
// ============================================

export function getProductosVendibles(): ProductoVendibleSimple[] {
  return PRODUCTOS_VENDIBLES;
}

export function buscarProductosVendibles(query: string): ProductoVendibleSimple[] {
  const q = query.toLowerCase();
  return PRODUCTOS_VENDIBLES.filter((p) =>
    p.nombre.toLowerCase().includes(q)
  );
}

// ============================================
// MUTATIONS: CUENTAS
// ============================================

/** Crea una nueva cuenta para una mesa */
export function crearCuenta(mesaId: string, camareroId?: string, camareroNombre?: string): Cuenta {
  const mesa = getMesaById(mesaId);
  if (!mesa) throw new Error(`Mesa ${mesaId} no encontrada`);

  // Verificar que no haya cuenta activa
  const cuentaActiva = getCuentaActivaByMesa(mesaId);
  if (cuentaActiva) throw new Error(`Mesa ${mesa.numMesa} ya tiene cuenta activa`);

  const cuenta: Cuenta = {
    id: `cuenta-runtime-${nextCuentaId++}`,
    mesaId,
    numMesa: mesa.numMesa,
    fecha: new Date(),
    cobrada: false,
    cerrada: false,
    comandaIds: [],
    camareroId,
    camareroNombre,
  };

  runtimeCuentas.push(cuenta);
  notifyListeners();
  return cuenta;
}

/** Cierra una cuenta */
export function cerrarCuenta(cuentaId: string): Cuenta | null {
  // Buscar en runtime
  const runtimeIndex = runtimeCuentas.findIndex((c) => c.id === cuentaId);
  if (runtimeIndex !== -1) {
    runtimeCuentas[runtimeIndex] = {
      ...runtimeCuentas[runtimeIndex],
      cerrada: true,
      cobrada: true,
    };
    notifyListeners();
    return runtimeCuentas[runtimeIndex];
  }

  // Buscar en seed
  const seedCuenta = SEED_CUENTAS.find((c) => c.id === cuentaId);
  if (seedCuenta) {
    const modificada: Cuenta = {
      ...(modificacionesCuentas.get(cuentaId) || seedCuenta),
      cerrada: true,
      cobrada: true,
    };
    modificacionesCuentas.set(cuentaId, modificada);
    notifyListeners();
    return modificada;
  }

  return null;
}

// ============================================
// MUTATIONS: PROPINAS
// ============================================

/** Agrega propina a una cuenta */
export function agregarPropina(datos: NuevaPropina): Propina {
  const propina: Propina = {
    ...datos,
    id: `propina-${nextPropinaId++}`,
  };
  runtimePropinas.push(propina);
  notifyListeners();
  return propina;
}

// ============================================
// MUTATIONS: COMANDAS DE MESA
// ============================================

// Importación dinámica del store de comandas para evitar dependencia circular
let comandasStore: typeof import("../comandas/store") | null = null;

async function getComandaStore() {
  if (!comandasStore) {
    comandasStore = await import("../comandas/store");
  }
  return comandasStore;
}

/** Crea una nueva comanda para una mesa */
export function crearComandaMesa(
  mesaId: string,
  lineas: Array<{ productoId: string; cantidad: number; formato?: FormatoPlato }>
): ComandaMesa {
  const mesa = getMesaById(mesaId);
  if (!mesa) throw new Error(`Mesa ${mesaId} no encontrada`);

  // Obtener número de comanda
  const comandasMesa = getComandasByMesa(mesaId);
  const numComanda = comandasMesa.length + 1;

  // ID único para la comanda (usado en ambos stores)
  const comandaId = `comanda-${Date.now()}-${nextComandaMesaId}`;

  // Crear líneas
  const lineasComanda: LineaComandaMesa[] = lineas.map((l, index) => {
    const producto = PRODUCTOS_VENDIBLES.find((p) => p.id === l.productoId);
    if (!producto) throw new Error(`Producto ${l.productoId} no encontrado`);
    return {
      id: `linea-${comandaId}-${index}`,
      productoId: l.productoId,
      productoNombre: producto.nombre,
      cantidad: l.cantidad,
      precioUnitario: producto.precio,
      estado: producto.esPlato ? "EN_PREPARACION" : "SERVIDO",
      esPlato: producto.esPlato,
      formato: producto.esPlato ? l.formato : undefined,
    };
  });

  const comanda: ComandaMesa = {
    id: comandaId,
    numComanda,
    mesaId,
    horaCreacion: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
    estado: lineasComanda.some((l) => l.esPlato) ? "EN_COCINA" : "ENTREGADA",
    lineas: lineasComanda,
  };

  runtimeComandasMesa.push(comanda);
  nextComandaMesaId++;

  // Mapear esta comanda para sincronización
  comandasMapeadas.set(comandaId, comandaId);

  // Registrar en el store de comandas del gerente (solo platos)
  const lineasPlatos = lineasComanda.filter((l) => l.esPlato);
  if (lineasPlatos.length > 0) {
    getComandaStore().then((store) => {
      store.agregarComandaDesdeCarmarero({
        id: comandaId,
        numComanda,
        mesaId,
        numMesa: mesa.numMesa,
        fechaCreacion: new Date(),
        lineas: lineasPlatos.map((l) => ({
          id: l.id,
          productoVendibleId: l.productoId,
          productoNombre: l.productoNombre,
          cantidad: l.cantidad,
          estado: Estado.EN_PREPARACION,
          formato: l.formato ? mapFormatoToEnum(l.formato) : undefined,
        })),
      });
    });
  }

  // Agregar a la cuenta activa
  const cuenta = getCuentaActivaByMesa(mesaId);
  if (cuenta) {
    if (runtimeCuentas.find((c) => c.id === cuenta.id)) {
      const idx = runtimeCuentas.findIndex((c) => c.id === cuenta.id);
      runtimeCuentas[idx].comandaIds.push(comanda.id);
    } else {
      const mod = modificacionesCuentas.get(cuenta.id) || SEED_CUENTAS.find((c) => c.id === cuenta.id)!;
      modificacionesCuentas.set(cuenta.id, {
        ...mod,
        comandaIds: [...mod.comandaIds, comanda.id],
      });
    }
  }

  notifyListeners();
  return comanda;
}

/** Marcar línea como servida */
export function marcarLineaServida(comandaId: string, lineaId: string): ComandaMesa | null {
  const comanda = getComandaMesaById(comandaId);
  if (!comanda) return null;

  const lineasActualizadas = comanda.lineas.map((l) =>
    l.id === lineaId ? { ...l, estado: "SERVIDO" as const } : l
  );

  // Actualizar estado de comanda
  const todasServidas = lineasActualizadas.every((l) => l.estado === "SERVIDO");
  const algunaRealizada = lineasActualizadas.some((l) => l.estado === "REALIZADO");
  let estadoComanda: ComandaMesa["estado"] = "EN_COCINA";
  if (todasServidas) estadoComanda = "ENTREGADA";
  else if (algunaRealizada) estadoComanda = "REALIZADA";

  const comandaActualizada: ComandaMesa = {
    ...comanda,
    lineas: lineasActualizadas,
    estado: estadoComanda,
  };

  // Guardar
  if (runtimeComandasMesa.find((c) => c.id === comandaId)) {
    const idx = runtimeComandasMesa.findIndex((c) => c.id === comandaId);
    runtimeComandasMesa[idx] = comandaActualizada;
  } else {
    modificacionesComandasMesa.set(comandaId, comandaActualizada);
  }

  notifyListeners();
  return comandaActualizada;
}

// ============================================
// MUTATIONS: RESERVAS
// ============================================

/** Crea una nueva reserva */
export function crearReserva(datos: NuevaReserva): Reserva {
  // RN-12: Verificar que no haya reserva activa para la mesa en esa fecha/hora
  const reservasExistentes = getReservasByFecha(datos.fechaHora);
  const conflicto = reservasExistentes.find(
    (r) => r.mesaId === datos.mesaId && !r.terminada
  );
  if (conflicto) {
    throw new Error(`Mesa ${datos.numMesa} ya tiene una reserva a esa hora`);
  }

  const reserva: Reserva = {
    ...datos,
    id: `reserva-${nextReservaId++}`,
  };

  runtimeReservas.push(reserva);
  notifyListeners();
  return reserva;
}

/** Marca una reserva como terminada */
export function terminarReserva(id: string): Reserva | null {
  // Buscar en runtime
  const runtimeIndex = runtimeReservas.findIndex((r) => r.id === id);
  if (runtimeIndex !== -1) {
    runtimeReservas[runtimeIndex] = {
      ...runtimeReservas[runtimeIndex],
      terminada: true,
    };
    notifyListeners();
    return runtimeReservas[runtimeIndex];
  }

  // Buscar en seed
  const seedReserva = SEED_RESERVAS.find((r) => r.id === id);
  if (seedReserva) {
    const modificada: Reserva = {
      ...(modificacionesReservas.get(id) || seedReserva),
      terminada: true,
    };
    modificacionesReservas.set(id, modificada);
    notifyListeners();
    return modificada;
  }

  return null;
}

/** Edita una reserva existente */
export function editarReserva(
  id: string,
  datos: Partial<Pick<Reserva, "anfitrion" | "numPersonas" | "fechaHora" | "mesaId" | "numMesa">>
): Reserva | null {
  // Buscar en runtime
  const runtimeIndex = runtimeReservas.findIndex((r) => r.id === id);
  if (runtimeIndex !== -1) {
    // Verificar conflictos si cambia mesa o fecha
    if (datos.mesaId || datos.fechaHora) {
      const reserva = runtimeReservas[runtimeIndex];
      const nuevaFechaHora = datos.fechaHora || reserva.fechaHora;
      const nuevaMesaId = datos.mesaId || reserva.mesaId;
      const reservasExistentes = getReservasByFecha(nuevaFechaHora);
      const conflicto = reservasExistentes.find(
        (r) => r.mesaId === nuevaMesaId && !r.terminada && r.id !== id
      );
      if (conflicto) {
        throw new Error(`Mesa ya tiene una reserva a esa hora`);
      }
    }
    runtimeReservas[runtimeIndex] = {
      ...runtimeReservas[runtimeIndex],
      ...datos,
    };
    notifyListeners();
    return runtimeReservas[runtimeIndex];
  }

  // Buscar en seed
  const seedReserva = SEED_RESERVAS.find((r) => r.id === id);
  if (seedReserva) {
    const reservaActual = modificacionesReservas.get(id) || seedReserva;
    // Verificar conflictos
    if (datos.mesaId || datos.fechaHora) {
      const nuevaFechaHora = datos.fechaHora || reservaActual.fechaHora;
      const nuevaMesaId = datos.mesaId || reservaActual.mesaId;
      const reservasExistentes = getReservasByFecha(nuevaFechaHora);
      const conflicto = reservasExistentes.find(
        (r) => r.mesaId === nuevaMesaId && !r.terminada && r.id !== id
      );
      if (conflicto) {
        throw new Error(`Mesa ya tiene una reserva a esa hora`);
      }
    }
    const modificada: Reserva = {
      ...reservaActual,
      ...datos,
    };
    modificacionesReservas.set(id, modificada);
    notifyListeners();
    return modificada;
  }

  return null;
}

/** Elimina una reserva */
export function eliminarReserva(id: string): boolean {
  // Solo permitir eliminar reservas runtime
  const idx = runtimeReservas.findIndex((r) => r.id === id);
  if (idx !== -1) {
    runtimeReservas.splice(idx, 1);
    notifyListeners();
    return true;
  }
  return false;
}

// ============================================
// UTILIDADES: CÁLCULO DE TOTALES
// ============================================

export interface TotalesCuenta {
  subtotal: number;
  propina: number;
  total: number;
}

export function calcularTotalesCuenta(mesaId: string): TotalesCuenta {
  const comandas = getComandasByMesa(mesaId);
  const subtotal = comandas.reduce((total, comanda) => {
    return total + comanda.lineas.reduce((t, l) => t + l.cantidad * l.precioUnitario, 0);
  }, 0);

  const cuenta = getCuentaActivaByMesa(mesaId);
  let propina = 0;
  if (cuenta) {
    const propinaObj = getPropinaByIdCuenta(cuenta.id);
    propina = propinaObj?.abono || 0;
  }

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    propina: Math.round(propina * 100) / 100,
    total: Math.round((subtotal + propina) * 100) / 100,
  };
}

// ============================================
// RESET
// ============================================

export function resetMesasRuntime(): void {
  runtimeCuentas = [];
  runtimePropinas = [];
  runtimeReservas = [];
  runtimeComandasMesa = [];
  modificacionesCuentas.clear();
  modificacionesReservas.clear();
  modificacionesComandasMesa.clear();
  comandasMapeadas.clear();
  nextCuentaId = 1;
  nextPropinaId = 1;
  nextReservaId = 100;
  nextComandaMesaId = 100;
}

export function getMesasDebugInfo() {
  return {
    mesas: SEED_MESAS.length,
    cuentasActivas: getCuentas().filter((c) => !c.cerrada).length,
    reservasActivas: getReservas().filter((r) => !r.terminada).length,
    comandasMesa: getComandasMesa().length,
    runtimeCuentas: runtimeCuentas.length,
    runtimeReservas: runtimeReservas.length,
  };
}
