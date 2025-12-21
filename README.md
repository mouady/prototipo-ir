# 🍽️ Bar El Punto - Prototipo Funcional

Prototipo funcional interactivo para la asignatura de **Ingeniería de Requisitos 2025/2026** del grupo **IR2526-G1-BB-06**. El prototipo simula un sistema de gestión para **Bar El Punto**, con interfaces específicas para camareros, cocineros y gerentes.

## 🔥 ¿Cómo probarlo de la manera más sencilla posible?

La forma más rápida de probar el prototipo es acceder directamente a la **versión desplegada**:

🌐 **[https://mdserver.es/prototipo-ir](https://mdserver.es/prototipo-ir)**

⏰ **Disponibilidad**: Está asegurada la disponibilidad del servidor desde las **6:00 de la mañana** hasta las **12:00 de la noche**.

## 🚀 Inicio Rápido en el caso de que no esté disponible la versión desplegada

### Prerequisitos
- Node.js 18+ 
- npm, yarn, pnpm o bun

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/mouady/prototipo-ir
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
cp .env.example
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