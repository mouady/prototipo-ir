# 🍽️ Prototipo Funcional - Bar El Punto

Prototipo funcional interactivo para la gestión integral de un restaurante, desarrollado con Next.js 15 y TypeScript. Este proyecto demuestra un sistema completo de administración de restaurantes con interfaces diferenciadas para distintos roles de usuario.

## 🔥 ¿Cómo probarlo de la manera más sencilla posible?

La forma más rápida de probar el prototipo es acceder directamente a la **versión desplegada**:

🌐 **[https://mdserver.es/prototipo-ir](https://mdserver.es/prototipo-ir)**

⏰ **Disponibilidad**: El servidor está activo desde las **7:00 de la mañana** hasta las **12:00 de la noche**.

## 🚀 Inicio Rápido en el caso de que no este disponible la versión desplegada

### Prerequisitos
- Node.js 18+ 
- npm, yarn, pnpm o bun

### Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd prototipo-ir
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env.local
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

5. Abre [http://localhost:3000/prototipo-ir](http://localhost:3000/prototipo-ir) en tu navegador.

> **Nota**: Este proyecto usa `basePath: "/prototipo-ir"` configurado en `next.config.ts`

## 📋 Descripción del Proyecto

Este prototipo simula un sistema de gestión completo para "Bar El Punto", incluyendo tres interfaces principales adaptadas a las necesidades específicas de cada rol:

- **Vista Móvil Camarero**: Gestión de comandas y mesas en tiempo real
- **Vista Móvil Cocinero**: Gestión de pedidos de cocina y avisos
- **Vista Escritorio Gerente**: Panel completo de administración del restaurante

## ✨ Características Principales

### 👨‍🍳 Vista Camarero (Móvil)
- 📱 Interfaz optimizada para dispositivos móviles
- 🍽️ Gestión de mesas y reservas
- 📝 Creación y seguimiento de comandas
- ⏰ Registro de fichajes de entrada/salida
- 🎨 UI intuitiva con colores naranjas distintivos

### 🧑‍🍳 Vista Cocinero (Móvil)
- 📱 Interfaz móvil adaptada para cocina
- 📋 Visualización de avisos y pedidos pendientes
- ✅ Marcado de platos como completados
- ⏰ Sistema de fichajes
- 🎨 UI distintiva con colores rojos

### 💼 Vista Gerente (Escritorio)
- 🖥️ Panel de administración completo
- 👥 **Gestión de Empleados**: CRUD completo con perfiles, roles, contratos y horarios
- 📊 **Inventario**: Control de platos, productos y stock
- 📅 **Horarios**: Calendario semanal con gestión de turnos
- 🛎️ **Comandas**: Visualización y seguimiento de pedidos
- 📈 **Estadísticas**: Dashboard con métricas y análisis del negocio
- 🔔 **Avisos**: Sistema de notificaciones para el personal
- 📦 **Proveedores**: Gestión de proveedores y pedidos

## 🛠️ Tecnologías Utilizadas

- **Framework**: [Next.js 15](https://nextjs.org/) con App Router
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI**: [shadcn/ui](https://ui.shadcn.com/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **State Management**: Zustand (stores locales para mock data)
- **Calendario**: react-big-calendar
- **Optimización**: React Compiler habilitado

## 📁 Estructura del Proyecto

```
prototipo-ir/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── page.tsx           # Página de bienvenida
│   │   ├── desktop/           # Vista gerente
│   │   └── mobile/            # Vistas móviles (camarero/cocinero)
│   ├── components/            # Componentes React
│   │   ├── ui/               # Componentes base de shadcn/ui
│   │   └── views/            # Componentes específicos por vista
│   ├── mock/                 # Mock data y stores de Zustand
│   │   ├── empleados/
│   │   ├── inventario/
│   │   ├── horarios/
│   │   ├── comandas/
│   │   └── avisos/
│   ├── hooks/                # Custom hooks
│   └── lib/                  # Utilidades y helpers
├── public/                   # Assets estáticos
│   ├── empleados/           # Imágenes de empleados
│   ├── platos/             # Imágenes de platos
│   └── logoFinal.jpg       # Logo del restaurante
└── agents/                  # Documentación del proyecto
```

## 🎨 Sistema de Mock Data

El prototipo utiliza datos simulados (mock data) almacenados en stores de Zustand para demostrar todas las funcionalidades sin necesidad de un backend:

- **Empleados**: 6 empleados de ejemplo con diferentes roles
- **Inventario**: Platos y productos precargados
- **Horarios**: Calendario con turnos de ejemplo
- **Comandas**: Sistema de pedidos simulado
- **Fichajes**: Registro de entradas/salidas

## 📦 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Ejecutar ESLint
```

## 🎯 Características Técnicas Destacadas

- ✅ **TypeScript** con tipado estricto
- ✅ **React Compiler** habilitado para mejor rendimiento
- ✅ **Output Standalone** para deployments optimizados
- ✅ **Responsive Design** adaptado a móvil y escritorio
- ✅ **Mock Data** completamente funcional
- ✅ **Gestión de rutas** con basePath para subdirectorios
- ✅ **Componentes reutilizables** con shadcn/ui

## 📱 Acceso a las Vistas

Desde la página principal puedes acceder a:

- **Vista Camarero**: `/mobile/camarero`
- **Vista Cocinero**: `/mobile/cocinero`
- **Vista Gerente**: `/desktop`


