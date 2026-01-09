/**
 * Hook personalizado para telemetría en componentes React
 * 
 * Facilita la implementación de trazas y métricas en cualquier componente
 */

import { useEffect, useCallback, useRef } from 'react';
import {
  logPageLoad,
  logLinkClick,
  logUserInteraction,
  logMetric,
  logNavigationMetrics,
  logTrace,
} from './telemetry';

interface UseTelemetryOptions {
  componentName: string;
  route?: string;
  autoTrackPageLoad?: boolean;
  autoTrackNavigationMetrics?: boolean;
}

/**
 * Hook para facilitar la telemetría en componentes React
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { trackClick, trackInteraction, trackMetric } = useTelemetry({
 *     componentName: 'MyComponent',
 *     route: '/my-route',
 *   });
 * 
 *   return (
 *     <button onClick={() => trackClick('Save Button', '/api/save')}>
 *       Guardar
 *     </button>
 *   );
 * }
 * ```
 */
export function useTelemetry({
  componentName,
  route,
  autoTrackPageLoad = true,
  autoTrackNavigationMetrics = true,
}: UseTelemetryOptions) {
  const mountTimeRef = useRef<number>(0);

  useEffect(() => {
    mountTimeRef.current = performance.now();

    if (autoTrackPageLoad && route) {
      logPageLoad(componentName, route);
    }

    // Registrar tiempo de montaje
    const mountTime = performance.now() - mountTimeRef.current;
    logMetric(componentName, 'Tiempo de montaje', mountTime);

    // Registrar métricas de navegación
    if (autoTrackNavigationMetrics) {
      setTimeout(() => {
        logNavigationMetrics(componentName);
      }, 100);
    }
  }, [componentName, route, autoTrackPageLoad, autoTrackNavigationMetrics]);

  /**
   * Rastrea un clic en un enlace
   */
  const trackClick = useCallback(
    (linkName: string, destination: string, additionalData?: Record<string, string | number | boolean>) => {
      logLinkClick(componentName, linkName, destination, additionalData);
    },
    [componentName]
  );

  /**
   * Rastrea una interacción del usuario
   */
  const trackInteraction = useCallback(
    (interactionType: string, target: string, additionalData?: Record<string, string | number | boolean>) => {
      logUserInteraction(componentName, interactionType, target, additionalData);
    },
    [componentName]
  );

  /**
   * Registra una métrica personalizada
   */
  const trackMetric = useCallback(
    (metricName: string, value: number, unit: string = 'ms', additionalData?: Record<string, string | number | boolean>) => {
      logMetric(componentName, metricName, value, unit, additionalData);
    },
    [componentName]
  );

  /**
   * Registra una traza personalizada
   */
  const trackTrace = useCallback(
    (action: string, data?: Record<string, string | number | boolean | undefined>) => {
      logTrace(componentName, action, data);
    },
    [componentName]
  );

  /**
   * Mide el tiempo de una operación
   */
  const measureOperation = useCallback(
    async <T,>(operationName: string, fn: () => T | Promise<T>): Promise<T> => {
      const startTime = performance.now();
      
      try {
        const result = await fn();
        const duration = performance.now() - startTime;
        
        trackMetric(operationName, duration, 'ms', { status: 'success' });
        
        return result;
      } catch (error) {
        const duration = performance.now() - startTime;
        
        trackMetric(operationName, duration, 'ms', { status: 'error' });
        
        throw error;
      }
    },
    [trackMetric]
  );

  return {
    trackClick,
    trackInteraction,
    trackMetric,
    trackTrace,
    measureOperation,
  };
}

/**
 * Hook para rastrear tiempo en la página
 */
export function usePageViewDuration(componentName: string) {
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = performance.now();

    return () => {
      const duration = performance.now() - startTimeRef.current;
      logMetric(componentName, 'Duración de vista', duration / 1000, 's');
    };
  }, [componentName]);
}

/**
 * Hook para rastrear visibilidad de la página
 */
export function usePageVisibility(componentName: string) {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        logTrace(componentName, 'Página oculta');
      } else {
        logTrace(componentName, 'Página visible');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [componentName]);
}

/**
 * Hook para rastrear errores en componentes
 */
export function useErrorTracking(componentName: string) {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      logTrace(componentName, 'Error capturado', {
        error: event.message,
        filename: event.filename,
        lineno: event.lineno?.toString(),
        colno: event.colno?.toString(),
      }, 'error');
    };

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, [componentName]);
}
