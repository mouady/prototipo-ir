# Implementación de Trazas y Métricas en WelcomePage

## 📊 Resumen

Se ha implementado un sistema completo de telemetría para la página de bienvenida (`src/app/page.tsx`) que rastrea:

1. **Carga de la página**
2. **Interacciones del usuario con elementos de la interfaz**
3. **Métricas de rendimiento**

## 🎯 Puntos de Instrumentación

### 1. Carga de la Página

**¿Qué se rastrea?**
- Timestamp de carga
- Ruta de la página
- User Agent del navegador
- Tiempo de montaje del componente React

**Datos registrados:**
```typescript
{
  component: "WelcomePage",
  action: "Página cargada",
  timestamp: "2026-01-06T10:30:00.000Z",
  route: "/",
  userAgent: "Mozilla/5.0..."
}
```

### 2. Métricas de Rendimiento

**Métricas capturadas:**

- **Tiempo de montaje del componente**: Tiempo que tarda el componente React en montarse
- **DOM Content Loaded**: Tiempo hasta que el DOM está completamente cargado
- **Load Complete**: Tiempo total de carga de la página
- **DOM Interactive**: Tiempo hasta que el DOM es interactivo
- **Response Time**: Tiempo de respuesta del servidor

**Ejemplo de salida:**
```
[METRIC] WelcomePage: Tiempo de montaje del componente
{
  component: "WelcomePage",
  action: "Tiempo de montaje del componente",
  timestamp: "2026-01-06T10:30:00.100Z",
  value: "15.30ms"
}
```

### 3. Interacción con el Logo

**Cuándo se registra:**
- Al hacer clic en el logo de "Bar El Punto" en el header

**Datos registrados:**
```typescript
{
  component: "WelcomePage",
  action: "Interacción de usuario",
  interactionType: "click",
  target: "logo",
  location: "header",
  timestamp: "2026-01-06T10:30:15.000Z"
}
```

### 4. Clics en Enlaces de Roles

**Cuándo se registra:**
- Al hacer clic en cualquiera de las 4 tarjetas de roles:
  - 🤵 Vista Camarero (`/mobile/camarero`)
  - 🧑‍🍳 Vista Cocinero Móvil (`/mobile/cocinero`)
  - 🧑‍🍳 Vista Cocinero Escritorio (`/desktop/cocinero`)
  - 💼 Vista Gerente (`/desktop`)

**Datos registrados:**
```typescript
{
  component: "WelcomePage",
  action: "Click en enlace",
  linkName: "Camarero",
  destination: "/mobile/camarero",
  category: "navigation",
  roleType: "Camarero",
  timestamp: "2026-01-06T10:30:20.000Z"
}
```

## 🛠️ Arquitectura Implementada

### Módulo de Telemetría (`src/lib/telemetry.ts`)

Se creó un módulo centralizado con funciones reutilizables:

#### Funciones Principales

1. **`logTrace(component, action, data?, level?)`**
   - Función base para registrar cualquier traza
   - Acepta datos adicionales en formato clave-valor
   - Niveles: 'trace', 'metric', 'error'

2. **`logMetric(component, metricName, value, unit?, additionalData?)`**
   - Especializada para métricas de rendimiento
   - Formatea automáticamente el valor con unidades

3. **`logPageLoad(pageName, route)`**
   - Registra la carga de una página
   - Captura información del navegador automáticamente

4. **`logLinkClick(component, linkName, destination, additionalData?)`**
   - Registra clics en enlaces
   - Incluye metadatos sobre el enlace

5. **`logUserInteraction(component, interactionType, target, additionalData?)`**
   - Registra interacciones genéricas del usuario
   - Flexible para diferentes tipos de interacciones

6. **`logNavigationMetrics(component)`**
   - Obtiene y registra métricas de Performance API del navegador
   - Registra múltiples métricas de rendimiento

7. **`measureExecutionTime(component, operationName, fn)`**
   - Función de orden superior para medir tiempos de ejecución
   - Útil para operaciones asíncronas

## 📈 Ejemplo de Salida en Consola

Cuando un usuario carga la página y hace clic en "Vista Camarero":

```
[TRACE] WelcomePage: Página cargada
{
  component: "WelcomePage",
  action: "Página cargada",
  timestamp: "2026-01-06T10:30:00.000Z",
  route: "/",
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
}

[METRIC] WelcomePage: Tiempo de montaje del componente
{
  component: "WelcomePage",
  action: "Tiempo de montaje del componente",
  timestamp: "2026-01-06T10:30:00.100Z",
  value: "15.30ms"
}

[METRIC] WelcomePage: DOM Content Loaded
{
  component: "WelcomePage",
  action: "DOM Content Loaded",
  timestamp: "2026-01-06T10:30:00.200Z",
  value: "250.50ms"
}

[TRACE] WelcomePage: Click en enlace
{
  component: "WelcomePage",
  action: "Click en enlace",
  linkName: "Camarero",
  destination: "/mobile/camarero",
  category: "navigation",
  roleType: "Camarero",
  timestamp: "2026-01-06T10:30:05.000Z"
}
```

## 🔄 Integración con OpenTelemetry

Actualmente, las trazas se registran en la consola del navegador. Para integrar con OpenTelemetry Collector:

### Paso 1: Actualizar el módulo de telemetría

```typescript
// En src/lib/telemetry.ts
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('prototipo-ir-frontend');

export function logTrace(component: string, action: string, data?: TraceData) {
  const span = tracer.startSpan(`${component}.${action}`);
  
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      span.setAttribute(key, value);
    });
  }
  
  span.end();
  
  // Mantener console.log para desarrollo
  console.log(`[TRACE] ${component}: ${action}`, {
    component,
    action,
    timestamp: new Date().toISOString(),
    ...data,
  });
}
```

### Paso 2: Configurar el exportador en `instrumentation.ts`

```typescript
import { registerOTel } from '@vercel/otel';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

export function register() {
  registerOTel({ 
    serviceName: 'prototipo-ir-otel',
    traceExporter: new OTLPTraceExporter({
      url: 'http://localhost:4318/v1/traces',
    }),
  });
}
```

## 📊 Métricas Disponibles para Análisis

Con esta implementación, puedes analizar:

1. **Tiempo de carga de la página**
   - Identificar cuellos de botella en el rendimiento
   - Monitorear la experiencia del usuario

2. **Patrones de navegación**
   - Qué roles son más visitados
   - Rutas de navegación más comunes

3. **Engagement del usuario**
   - Interacciones con elementos de la UI
   - Tiempo en la página

4. **Rendimiento del navegador**
   - Métricas Core Web Vitals
   - Tiempos de respuesta del servidor

## 🎨 Mejoras Futuras

1. **Integrar Web Vitals**
   ```bash
   npm install web-vitals
   ```

2. **Agregar métricas personalizadas**
   - Tiempo hasta la primera interacción
   - Tasa de rebote
   - Conversión de clics por rol

3. **Dashboard de visualización**
   - Integrar con Grafana/Prometheus
   - Alertas automáticas para métricas críticas

4. **A/B Testing**
   - Rastrear variantes de UI
   - Medir impacto de cambios

## 🔍 Debugging

Para ver las trazas en la consola del navegador:

1. Abre las DevTools (F12)
2. Ve a la pestaña "Console"
3. Filtra por `[TRACE]` o `[METRIC]`
4. Inspecciona los objetos de datos para análisis detallado

## 📚 Referencias

- [OpenTelemetry JavaScript](https://opentelemetry.io/docs/languages/js/)
- [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
- [Web Vitals](https://web.dev/vitals/)
- [Vercel OpenTelemetry](https://vercel.com/docs/observability/otel-overview)
