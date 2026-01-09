# 📊 Guía de Telemetría - Implementación en Componentes

## 🚀 Inicio Rápido

### Implementación Básica con el Hook

La forma más sencilla de agregar telemetría a un componente es usando el hook `useTelemetry`:

```tsx
import { useTelemetry } from '@/lib/useTelemetry';

function MiComponente() {
  const { trackClick, trackInteraction } = useTelemetry({
    componentName: 'MiComponente',
    route: '/mi-ruta',
  });

  return (
    <button onClick={() => trackClick('Botón Guardar', '/api/save')}>
      Guardar
    </button>
  );
}
```

## 📚 Ejemplos de Uso

### 1. Rastrear Carga de Página

```tsx
import { useTelemetry } from '@/lib/useTelemetry';

export default function Dashboard() {
  // Automáticamente registra la carga de la página
  const telemetry = useTelemetry({
    componentName: 'Dashboard',
    route: '/dashboard',
    autoTrackPageLoad: true,        // ✅ Rastrea carga automáticamente
    autoTrackNavigationMetrics: true, // ✅ Rastrea métricas de navegación
  });

  return <div>Dashboard</div>;
}
```

**Salida en consola:**
```
[TRACE] Dashboard: Página cargada
[METRIC] Dashboard: Tiempo de montaje - 15.30ms
[METRIC] Dashboard: DOM Content Loaded - 250.50ms
```

### 2. Rastrear Clics en Enlaces

```tsx
import Link from 'next/link';
import { useTelemetry } from '@/lib/useTelemetry';

function Navigation() {
  const { trackClick } = useTelemetry({
    componentName: 'Navigation',
  });

  return (
    <nav>
      <Link 
        href="/empleados"
        onClick={() => trackClick('Empleados', '/empleados', {
          section: 'main-nav',
        })}
      >
        Empleados
      </Link>
      
      <Link 
        href="/inventario"
        onClick={() => trackClick('Inventario', '/inventario', {
          section: 'main-nav',
        })}
      >
        Inventario
      </Link>
    </nav>
  );
}
```

### 3. Rastrear Interacciones del Usuario

```tsx
import { useTelemetry } from '@/lib/useTelemetry';

function ModalEmpleado({ empleado }) {
  const { trackInteraction } = useTelemetry({
    componentName: 'ModalEmpleado',
  });

  const handleOpen = () => {
    trackInteraction('open', 'modal', {
      empleadoId: empleado.id,
      empleadoNombre: empleado.nombre,
    });
  };

  const handleClose = () => {
    trackInteraction('close', 'modal', {
      empleadoId: empleado.id,
    });
  };

  const handleEdit = () => {
    trackInteraction('edit', 'empleado-form', {
      empleadoId: empleado.id,
      action: 'edit',
    });
  };

  return (
    <Dialog onOpenChange={(open) => open ? handleOpen() : handleClose()}>
      <button onClick={handleEdit}>Editar</button>
    </Dialog>
  );
}
```

### 4. Medir Tiempo de Operaciones

```tsx
import { useTelemetry } from '@/lib/useTelemetry';

function FormularioEmpleado() {
  const { measureOperation } = useTelemetry({
    componentName: 'FormularioEmpleado',
  });

  const handleSubmit = async (data) => {
    // Mide automáticamente el tiempo de la operación
    const result = await measureOperation('Guardar empleado', async () => {
      const response = await fetch('/api/empleados', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return response.json();
    });

    // measureOperation registra:
    // - Tiempo de ejecución
    // - Estado (success/error)
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

**Salida en consola:**
```
[METRIC] FormularioEmpleado: Guardar empleado
{
  value: "235.50ms",
  status: "success"
}
```

### 5. Rastrear Métricas Personalizadas

```tsx
import { useTelemetry } from '@/lib/useTelemetry';

function ListaEmpleados({ empleados }) {
  const { trackMetric } = useTelemetry({
    componentName: 'ListaEmpleados',
  });

  useEffect(() => {
    // Registrar cantidad de empleados mostrados
    trackMetric('Cantidad de empleados', empleados.length, 'items', {
      filter: 'activos',
    });
  }, [empleados]);

  return <div>...</div>;
}
```

### 6. Rastrear Duración en la Página

```tsx
import { usePageViewDuration } from '@/lib/useTelemetry';

function Estadisticas() {
  // Registra automáticamente cuánto tiempo el usuario está en esta vista
  usePageViewDuration('Estadisticas');

  return <div>Estadísticas</div>;
}
```

**Al salir de la página:**
```
[METRIC] Estadisticas: Duración de vista
{
  value: "45.30s"
}
```

### 7. Rastrear Trazas Personalizadas

```tsx
import { useTelemetry } from '@/lib/useTelemetry';

function InventarioPage() {
  const { trackTrace } = useTelemetry({
    componentName: 'InventarioPage',
  });

  const handleFilterChange = (filter) => {
    trackTrace('Filtro aplicado', {
      filterType: filter.type,
      filterValue: filter.value,
      resultCount: filteredItems.length,
    });
  };

  return <div>...</div>;
}
```

### 8. Uso Directo de Funciones de Telemetría (sin Hook)

Si prefieres no usar el hook, puedes usar las funciones directamente:

```tsx
import { 
  logTrace, 
  logMetric, 
  logLinkClick, 
  logUserInteraction 
} from '@/lib/telemetry';

function MiComponente() {
  const handleClick = () => {
    logLinkClick('MiComponente', 'Botón Acción', '/accion');
  };

  useEffect(() => {
    logTrace('MiComponente', 'Componente montado', {
      timestamp: Date.now(),
    });
  }, []);

  return <button onClick={handleClick}>Acción</button>;
}
```

## 🎯 Patrones Recomendados

### Patrón 1: Componente de Página Completa

```tsx
import { useTelemetry, usePageViewDuration } from '@/lib/useTelemetry';

export default function EmpleadosPage() {
  const { trackClick, trackInteraction, trackMetric } = useTelemetry({
    componentName: 'EmpleadosPage',
    route: '/empleados',
    autoTrackPageLoad: true,
    autoTrackNavigationMetrics: true,
  });

  usePageViewDuration('EmpleadosPage');

  // ... resto del componente
}
```

### Patrón 2: Componente Modal/Dialog

```tsx
import { useTelemetry } from '@/lib/useTelemetry';

function ModalDetalles({ isOpen, onClose, empleado }) {
  const { trackInteraction } = useTelemetry({
    componentName: 'ModalDetalles',
    autoTrackPageLoad: false, // ❌ No es una página
  });

  useEffect(() => {
    if (isOpen) {
      trackInteraction('open', 'modal', {
        empleadoId: empleado.id,
      });
    }
  }, [isOpen]);

  return <Dialog>...</Dialog>;
}
```

### Patrón 3: Componente de Lista

```tsx
import { useTelemetry } from '@/lib/useTelemetry';

function ListaItems({ items, onItemClick }) {
  const { trackClick, trackMetric } = useTelemetry({
    componentName: 'ListaItems',
  });

  useEffect(() => {
    trackMetric('Items renderizados', items.length, 'items');
  }, [items.length]);

  const handleClick = (item) => {
    trackClick(item.name, `/item/${item.id}`, {
      itemType: item.type,
    });
    onItemClick(item);
  };

  return <ul>...</ul>;
}
```

## 🔍 Formato de Salida

### Trazas (Logs)
```
[TRACE] ComponentName: Action
{
  component: "ComponentName",
  action: "Action",
  timestamp: "2026-01-06T10:30:00.000Z",
  ...additionalData
}
```

### Métricas
```
[METRIC] ComponentName: Metric Name
{
  component: "ComponentName",
  action: "Metric Name",
  timestamp: "2026-01-06T10:30:00.000Z",
  value: "123.45ms",
  ...additionalData
}
```

### Errores
```
[ERROR] ComponentName: Error
{
  component: "ComponentName",
  action: "Error",
  timestamp: "2026-01-06T10:30:00.000Z",
  error: "Error message",
  stack: "Error stack trace",
  ...additionalData
}
```

## 📊 Métricas Automáticas Capturadas

Cuando usas `autoTrackNavigationMetrics: true`, se capturan automáticamente:

- **DOM Content Loaded**: Tiempo hasta que el DOM está completamente cargado
- **Load Complete**: Tiempo total de carga de la página
- **DOM Interactive**: Tiempo hasta que el DOM es interactivo
- **Response Time**: Tiempo de respuesta del servidor

## 🛠️ API Completa

### `useTelemetry(options)`

```typescript
interface UseTelemetryOptions {
  componentName: string;              // Nombre del componente
  route?: string;                     // Ruta de la página (opcional)
  autoTrackPageLoad?: boolean;        // Auto-rastrear carga (default: true)
  autoTrackNavigationMetrics?: boolean; // Auto-rastrear métricas (default: true)
}

// Retorna:
{
  trackClick: (linkName, destination, data?) => void,
  trackInteraction: (type, target, data?) => void,
  trackMetric: (name, value, unit?, data?) => void,
  trackTrace: (action, data?) => void,
  measureOperation: (name, fn) => Promise<T>
}
```

### Hooks Adicionales

- `usePageViewDuration(componentName)` - Rastrea tiempo en la página
- `usePageVisibility(componentName)` - Rastrea cuando la página está visible/oculta
- `useErrorTracking(componentName)` - Rastrea errores automáticamente

## 💡 Tips y Mejores Prácticas

1. **Nombres consistentes**: Usa nombres descriptivos y consistentes para componentes
   ```tsx
   // ✅ Bien
   componentName: 'EmpleadosPage'
   componentName: 'ModalDetalles'
   
   // ❌ Evitar
   componentName: 'Component1'
   componentName: 'modal'
   ```

2. **Datos adicionales útiles**: Incluye contexto relevante
   ```tsx
   // ✅ Bien
   trackClick('Editar Empleado', '/empleado/123', {
     empleadoId: '123',
     rol: 'gerente',
     seccion: 'detalles',
   });
   
   // ❌ Menos útil
   trackClick('Click', '/empleado/123');
   ```

3. **No sobre-instrumentar**: Rastrea acciones significativas
   ```tsx
   // ✅ Rastrear esto
   - Navegación entre páginas
   - Acciones críticas (guardar, eliminar)
   - Operaciones largas (API calls)
   
   // ❌ No rastrear esto
   - Hover en elementos
   - Scroll de página
   - Cada keystroke
   ```

4. **Medir operaciones asíncronas**: Usa `measureOperation`
   ```tsx
   const result = await measureOperation('Cargar datos', async () => {
     return await fetchData();
   });
   ```

## 🔗 Referencias

- [Documentación completa](./telemetria-welcome-page.md)
- [API de Telemetría](../src/lib/telemetry.ts)
- [Hooks de Telemetría](../src/lib/useTelemetry.ts)
- [Ejemplo: WelcomePage](../src/app/page.tsx)
