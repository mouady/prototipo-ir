# 🍽️ Bar El Punto - Prototipo Funcional

Prototipo funcional interactivo desarrollado para la asignatura de **Ingeniería de Requisitos 2025/2026** (Grupo **IR2526-G1-BB-06**).

## 🔥 ¿Cómo probar el prototipo?

### Opción 1: Versión desplegada (Recomendada) ⭐

La forma más rápida es acceder directamente a la versión online:

🌐 **[https://mdserver.es/prototipo-ir](https://mdserver.es/prototipo-ir)**

⏰ **Disponibilidad**: El servidor que aloja el prototipo está disponible desde las **6:00** hasta las **24:00** (hora peninsular española).

---

### Opción 2: Instalación local

Si la versión desplegada no está disponible, puedes ejecutar el prototipo en tu propio ordenador.

#### Prerequisitos
- [Node.js](https://nodejs.org/) versión 18 o superior
- npm, yarn, pnpm o bun (gestores de paquetes)

#### Pasos de instalación

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/mouady/prototipo-ir
   cd prototipo-ir
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   # o alternativamente: yarn install / pnpm install
   ```

3. **Configura las variables de entorno**:
   ```bash
   cp .env.example .env
   ```

4. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   # o alternativamente: yarn dev / pnpm dev
   ```

5. **Abre en tu navegador**:
   
   👉 [http://localhost:3000/prototipo-ir](http://localhost:3000/prototipo-ir)

> **Nota técnica**: Este proyecto usa `basePath: "/prototipo-ir"` configurado en `next.config.ts`, por lo que la ruta incluye este prefijo.

---

## 👥 Roles de Usuario

El sistema ofrece interfaces específicas para tres tipos de usuario:

| Rol | Dispositivo | Descripción |
|-----|-------------|-------------|
| 🤵 **Camarero** | 📱 Móvil | Gestión de mesas, toma de comandas y control de asistencia |
| 🧑‍🍳 **Cocinero** | 📱 Móvil | Recepción de avisos y control de fichajes |
| 🧑‍🍳 **Cocinero** | 🖥️ Escritorio | Panel ampliado para visualizar y gestionar pedidos en cocina |
| 💼 **Gerente** | 🖥️ Escritorio | Panel completo de administración con todas las funcionalidades |

---

## ✨ Funcionalidades Principales

### 📝 Gestión de Comandas
- Crear nuevas comandas desde las mesas
- Añadir platos y bebidas al pedido
- Visualizar el estado de cada comanda (pendiente, en preparación, lista)
- Marcar platos como preparados desde cocina
- Histórico de comandas completadas

### 👨‍💼 Gestión de Empleados
- Alta, baja y modificación de empleados
- Gestión de perfiles con datos personales
- Asignación de roles (camarero, cocinero, gerente)
- Configuración de tipos de contrato
- Datos de contacto y documentación

### 📅 Gestión de Horarios
- Calendario semanal interactivo
- Asignación de turnos de trabajo
- Visualización por empleado o por día
- Modificación de horarios de forma sencilla

### 📦 Control de Inventario
- Gestión del menú: platos y bebidas
- Control de stock de ingredientes
- Categorización de productos
- Alertas de stock bajo
- Precios y disponibilidad

### 🔔 Sistema de Avisos
- Notificaciones internas entre el personal
- Comunicación cocina-sala
- Alertas de platos listos
- Mensajes entre empleados

### 📊 Panel de Estadísticas
- Dashboard con métricas clave del negocio
- Gráficos de ventas y rendimiento
- Análisis de productos más vendidos
- Indicadores de productividad
- Informes visuales

### ⏰ Control de Fichajes
- Registro de entrada y salida de empleados
- Historial completo de fichajes
- Control de asistencia
- Visualización de horas trabajadas

### 🚚 Gestión de Proveedores
- Alta y mantenimiento de proveedores
- Gestión de pedidos a proveedores
- Información de contacto
- Histórico de relaciones comerciales

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| [Next.js 15](https://nextjs.org/) | Framework de React para la aplicación web |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático para JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | Framework de estilos CSS |
| [Lucide React](https://lucide.dev/) | Iconos |

---

## 📂 Estructura del Proyecto

```
prototipo-ir/
├── src/
│   ├── app/                    # Páginas de la aplicación
│   │   ├── desktop/           # Vistas de escritorio
│   │   │   └── cocinero/     # Vista cocinero (escritorio)
│   │   └── mobile/           # Vistas móviles
│   │       ├── camarero/     # Vista camarero
│   │       └── cocinero/     # Vista cocinero (móvil)
│   ├── components/            # Componentes React
│   │   ├── views/
│   │   │   ├── gerente/      # Módulos del gerente
│   │   │   └── mobile/       # Componentes móviles
│   │   └── ui/               # Componentes de interfaz
│   ├── mock/                  # Datos simulados
│   └── lib/                   # Utilidades
├── public/                    # Archivos estáticos
└── package.json
```

---

## 📄 Créditos

Proyecto desarrollado por el **Grupo IR2526-G1-BB-06** para la asignatura de Ingeniería de Requisitos, curso 2025/2026.

**Versión actual**: v2.0.1