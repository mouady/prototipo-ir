/**
 * Utilidades base para el store
 * Manejo de listeners para reactividad
 */

// ============================================
// LISTENERS (para reactividad)
// ============================================
type Listener = () => void;
const listeners: Set<Listener> = new Set();

/**
 * Notifica a todos los listeners de un cambio
 */
export function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

/**
 * Suscribe un listener para recibir notificaciones de cambios
 * @returns Función para desuscribirse
 */
export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
