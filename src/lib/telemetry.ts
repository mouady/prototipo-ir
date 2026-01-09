/**
 * Utilidades para trazas y métricas de telemetría
 * 
 * Este módulo proporciona funciones para registrar trazas y métricas
 * de la aplicación utilizando console.log con formato estructurado.
 */

export type TraceLevel = 'trace' | 'metric' | 'error';

interface TraceData {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Registra una traza estructurada en la consola
 */
export function logTrace(
  component: string,
  action: string,
  data?: TraceData,
  level: TraceLevel = 'trace'
) {
  const logData = {
    component,
    action,
    timestamp: new Date().toISOString(),
    ...data,
  };

  const prefix = `[${level.toUpperCase()}]`;
  console.log(`${prefix} ${component}: ${action}`, logData);
}

/**
 * Registra una métrica de rendimiento
 */
export function logMetric(
  component: string,
  metricName: string,
  value: number,
  unit: string = 'ms',
  additionalData?: TraceData
) {
  logTrace(
    component,
    metricName,
    {
      value: `${value.toFixed(2)}${unit}`,
      ...additionalData,
    },
    'metric'
  );
}

/**
 * Registra un error
 */
export function logError(
  component: string,
  error: Error | string,
  additionalData?: TraceData
) {
  const errorMessage = typeof error === 'string' ? error : error.message;
  const errorStack = typeof error === 'string' ? undefined : error.stack;

  logTrace(
    component,
    'Error',
    {
      error: errorMessage,
      stack: errorStack,
      ...additionalData,
    },
    'error'
  );
}

/**
 * Registra la carga de una página
 */
export function logPageLoad(pageName: string, route: string) {
  logTrace(pageName, 'Página cargada', {
    route,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
  });
}

/**
 * Registra un clic en un enlace
 */
export function logLinkClick(
  component: string,
  linkName: string,
  destination: string,
  additionalData?: TraceData
) {
  logTrace(component, 'Click en enlace', {
    linkName,
    destination,
    ...additionalData,
  });
}

/**
 * Registra una interacción del usuario
 */
export function logUserInteraction(
  component: string,
  interactionType: string,
  target: string,
  additionalData?: TraceData
) {
  logTrace(component, 'Interacción de usuario', {
    interactionType,
    target,
    ...additionalData,
  });
}

/**
 * Mide el tiempo de ejecución de una función
 */
export async function measureExecutionTime<T>(
  component: string,
  operationName: string,
  fn: () => T | Promise<T>
): Promise<T> {
  const startTime = performance.now();
  
  try {
    const result = await fn();
    const duration = performance.now() - startTime;
    
    logMetric(component, operationName, duration, 'ms', {
      status: 'success',
    });
    
    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    
    logMetric(component, operationName, duration, 'ms', {
      status: 'error',
    });
    
    logError(component, error as Error);
    throw error;
  }
}

/**
 * Obtiene métricas de navegación del navegador
 */
export function getNavigationMetrics() {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
  
  if (navigationEntries.length === 0) {
    return null;
  }

  const nav = navigationEntries[0];
  
  return {
    domContentLoaded: nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart,
    loadComplete: nav.loadEventEnd - nav.loadEventStart,
    domInteractive: nav.domInteractive - nav.fetchStart,
    responseTime: nav.responseEnd - nav.requestStart,
  };
}

/**
 * Registra métricas de rendimiento de navegación
 */
export function logNavigationMetrics(component: string) {
  const metrics = getNavigationMetrics();
  
  if (metrics) {
    logMetric(component, 'DOM Content Loaded', metrics.domContentLoaded, 'ms');
    logMetric(component, 'Load Complete', metrics.loadComplete, 'ms');
    logMetric(component, 'DOM Interactive', metrics.domInteractive, 'ms');
    logMetric(component, 'Response Time', metrics.responseTime, 'ms');
  }
}
