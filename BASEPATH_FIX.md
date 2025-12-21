# Configuración de basePath para las imágenes

## Problema
Al configurar `basePath: "/prototipo-ir"` en `next.config.ts`, las imágenes de la carpeta `public` dejaron de mostrarse correctamente porque Next.js no añade automáticamente el basePath a las rutas de assets estáticos.

## Solución
Se creó una función utilitaria `getPublicPath()` en `src/lib/path.ts` que añade automáticamente el basePath configurado a las rutas de imágenes.

### Archivos modificados:
1. **src/lib/path.ts** - Nueva función utilitaria
2. **src/components/Header.tsx** - Actualizado para usar `getPublicPath()`
3. **src/components/views/gerente/empleados/EmpleadoCard.tsx** - Actualizado
4. **src/components/views/gerente/empleados/DetalleEmpleadoModal.tsx** - Actualizado
5. **src/components/views/gerente/inventario/cards/PlatoCard.tsx** - Actualizado
6. **src/components/views/mobile/shared/SideMenu.tsx** - Actualizado
7. **.env.local** - Configuración de la variable de entorno
8. **.env.example** - Documentación de variables de entorno

### Uso:
```typescript
import { getPublicPath } from "@/lib/path";

// En lugar de:
<Image src="/logosuite.png" alt="Logo" />

// Usa:
<Image src={getPublicPath("/logosuite.png")} alt="Logo" />
```

La función maneja automáticamente:
- Añadir el basePath si no está presente
- Normalizar las rutas que empiezan con o sin `/`
- Evitar duplicación del basePath

### Variables de entorno:
- `NEXT_PUBLIC_BASE_PATH`: Define el basePath de la aplicación (por defecto: `/prototipo-ir`)
