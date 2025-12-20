# Generador de Mensajes de Pedidos

## Descripción

El **Generador de Mensajes** es un sistema completo de generación automática de mensajes de reposición de inventario. Basado en el diagrama de clases del sistema IR, genera mensajes formateados en tres canales diferentes:

- **WhatsApp**: Formato con emojis y markdown para mensajería rápida
- **Email**: HTML formateado profesional con detalles completos
- **Contacto directo**: Formato de texto para contactar al manager

## Características

✅ **Flujo de 5 pasos intuitive**:
1. Seleccionar proveedor
2. Seleccionar productos (ingredientes, bebidas, recursos)
3. Especificar horario de entrega
4. Revisar pedido
5. Enviar (copiar/descargar)

✅ **Múltiples canales de envío**
- Generar mensajes en WhatsApp con formato de texto
- Generar HTML profesional para email
- Generar mensajes de contacto para el manager

✅ **Gestión de productos inteligente**
- Agrupación automática por tipo (ingredientes, bebidas, recursos)
- Control de cantidades y unidades de medida
- Soporte para todos los tipos definidos en el modelo

✅ **Resumen interactivo**
- Visualización clara del pedido antes de generar
- Detalles de proveedor, fecha y hora
- Lista organizada de productos

## Estructura de archivos

```
src/
├── lib/
│   ├── message-generator.ts         # Motor de generación
│   └── message-generator.test.ts    # Validaciones
├── components/
│   └── generador-mensajes/
│       ├── GeneradorMensajes.tsx    # Componente React
│       └── index.ts                 # Export
└── app/
    └── generador-mensajes/
        └── page.tsx                 # Página
```

## Tipos principales

### `MensajePedido`
```typescript
interface MensajePedido {
  proveedor: Proveedor;           // Proveedor seleccionado
  lineas: LineaPedido[];          // Productos a pedir
  fechaEntrega: Date;             // Fecha de entrega
  horaEntrega: string;            // Hora (formato HH:mm)
  observaciones?: string;         // Observaciones opcionales
  metodo: "whatsapp" | "email" | "contacto"; // Canal
}
```

### `LineaPedido`
```typescript
interface LineaPedido {
  producto: Producto;
  cantidad: number;
}
```

### `MensajeFormato`
```typescript
interface MensajeFormato {
  asunto?: string;      // Solo para email
  cuerpo: string;       // Contenido del mensaje
  formato: "whatsapp" | "email" | "contacto";
}
```

## Funciones principales

### `generarMensajeWhatsApp(mensaje: MensajePedido): string`

Genera un mensaje formateado para WhatsApp con:
- Encabezado profesional con información del proveedor
- Emojis para fácil identificación
- Agrupación de productos por tipo
- Observaciones si las hay

**Ejemplo:**
```
📋 *PEDIDO DE REPOSICIÓN*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Proveedor: Heineken España
📞 Teléfono: +34 900 123 456
...
🥬 *INGREDIENTES*
  • Lentejas: 5 kg
  • Espárragos: 3 kg
```

### `generarMensajeEmail(mensaje: MensajePedido): MensajeFormato`

Genera un email HTML profesional con:
- Asunto automático con fecha
- Diseño responsivo con colores
- Tablas expandibles por tipo de producto
- Información del proveedor destacada

### `generarMensajeContacto(mensaje: MensajePedido): string`

Genera un mensaje para contacto directo con:
- Información esencial sin formato
- Indicación de contactar al proveedor
- Texto plano fácil de copiar

### `generarMensaje(mensaje: MensajePedido): MensajeFormato`

Función principal que delega a la función correspondiente según el formato.

### `generarResumenPedido(mensaje: MensajePedido): ResumenPedido`

Genera un resumen estructurado del pedido para previsualización:
```typescript
{
  titulo: string;
  ingredientes: Array<{ nombre, cantidad, unidad }>;
  bebidas: Array<{ nombre, cantidad, unidad }>;
  recursos: Array<{ nombre, cantidad, unidad }>;
  observaciones?: string;
}
```

## Uso del componente

### En una página existente

```tsx
import { GeneradorMensajes } from "@/components/generador-mensajes";
import { SEED_PROVEEDORES, SEED_PRODUCTOS } from "@/mock/seed";

export default function MyPage() {
  return (
    <GeneradorMensajes 
      proveedores={SEED_PROVEEDORES}
      productos={SEED_PRODUCTOS}
    />
  );
}
```

### Acceso directo

La aplicación incluye una página dedicada en `/generador-mensajes`

## Integración con el modelo conceptual

El generador respeta completamente el modelo de datos definido en `mc-ir.iuml`:

### Entidades utilizadas:
- **Proveedor**: Información de contacto del proveedor
- **Producto**: Ingredientes, bebidas y recursos del inventario
- **AvisoReposicion**: Estructura base para solicitudes
- **LineaAvisoReposicion**: Líneas del aviso

### Enumeraciones utilizadas:
- **TipoProducto**: INGREDIENTE, BEBIDA, RECURSO
- **UnidadMedida**: kg, uds, l, g, ml

## Flujo de usuario completo

### 1️⃣ Seleccionar proveedor
- Lista visual de proveedores con contacto
- Selección intuitiva
- Validación antes de continuar

### 2️⃣ Seleccionar productos
- Pestañas por tipo de producto
- Búsqueda y selección inteligente
- Control de cantidades en tiempo real
- Eliminación de productos

### 3️⃣ Especificar entrega
- Selector de fecha
- Input de hora (por defecto 06:30)
- Campo de observaciones opcional

### 4️⃣ Revisar pedido
- Resumen visual completo
- Selector de método de envío
- Vista previa del mensaje

### 5️⃣ Enviar
- Visualización del mensaje generado
- Pestaña de vista previa
- Pestaña de código fuente
- Botones: Copiar, Descargar, Completar

## Estilos y componentes UI

Utiliza componentes de Radix UI + Tailwind CSS:
- `Card`: Para contenedores
- `Button`: Para acciones
- `Input`: Para entrada de datos
- `Tabs`: Para navegación entre secciones
- `Icons` (Lucide React): Para iconografía

## Validaciones

El componente incluye:
- ✅ Validación de proveedor seleccionado
- ✅ Validación de al menos un producto
- ✅ Validación de fecha de entrega
- ✅ Validación de formato de mensaje

## Exportación de mensajes

### Copiar al portapapeles
Copia el contenido completo del mensaje para pegar directamente en WhatsApp o email.

### Descargar archivo
- WhatsApp/Contacto: Desarga como `.txt`
- Email: Desarga como `.html`

## Ejemplos de uso

### Generar mensaje WhatsApp
```typescript
import { generarMensajeWhatsApp } from "@/lib/message-generator";

const mensaje = generarMensajeWhatsApp({
  proveedor: miProveedor,
  lineas: misProductos,
  fechaEntrega: new Date(),
  horaEntrega: "06:30",
  metodo: "whatsapp"
});

console.log(mensaje);
```

### Generar resumen para preview
```typescript
import { generarResumenPedido } from "@/lib/message-generator";

const resumen = generarResumenPedido(pedido);

console.log(`Ingredientes: ${resumen.ingredientes.length}`);
console.log(`Bebidas: ${resumen.bebidas.length}`);
```

## Extensiones futuras

- 📱 Integración directa con APIs de WhatsApp
- 📧 Integración con servicio de email
- 📊 Historial de pedidos generados
- 🔔 Confirmación automática de recepción
- 🔐 Firma digital de pedidos
- 📝 Plantillas personalizadas por proveedor

## Notas técnicas

- **Cliente únicamente**: El componente es de cliente (`use client`)
- **Sin dependencias externas**: Solo usa librerías ya incluidas
- **Type-safe**: Totalmente tipado con TypeScript
- **Accesibilidad**: Soporta navegación por teclado
- **Responsive**: Diseño móvil incluido

## Testing

El archivo `message-generator.test.ts` incluye validaciones que pueden ser ejecutadas con Jest:

```bash
npm install --save-dev jest @types/jest ts-jest
npm test
```

Las validaciones incluyen:
- Formateo correcto de líneas
- Generación de mensajes WhatsApp
- Generación de emails HTML
- Agrupación de productos
- Manejo de observaciones
