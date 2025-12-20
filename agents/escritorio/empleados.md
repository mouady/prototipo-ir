# Documentación de Análisis de UI: Sistema de Gestión de Empleados

Este documento detalla los componentes visuales, flujos de estado y lógica de negocio inferida de las capturas de pantalla proporcionadas. El sistema es una aplicación web para la gestión de Recursos Humanos en el sector de la hostelería.

---

## 1. Estructura Global (Layout)
**Presente en todas las pantallas:**
* **Header (Barra de Navegación):**
    * **Logo:** Esquina superior izquierda (isotipo abstracto).
    * **Menú de Navegación:**
        * Horarios
        * Comandas
        * **Empleados** (Seleccionado/Activo)
        * Inventario
        * Estadísticas
    * **Perfil de Usuario:** Botón en la esquina superior derecha ("Gerente 1").

---

## 2. Análisis por Pantalla

### A. Vista Principal (Dashboard)
**Archivo de referencia:** `image_ff3a43.jpg`

* **Título:** "Listado de empleados".
* **Descripción:** "Información relevante sobre camareros y cocineros".
* **Componente Grid:** Diseño de cuadrícula que muestra tarjetas de empleados.
    * **Tarjeta de Empleado:**
        * Foto de perfil (cuadrada).
        * **Estado:** Indicador visual (Punto Verde = Activo / Punto Rojo = Inactivo).
        * **Datos:** Nombre completo y Rol (Ej. "Antonio García López", "Cocinero").
        * **Acción:** Icono de edición (lápiz) en la esquina superior derecha.
    * **Tarjeta de Creación ("Añadir"):**
        * Última tarjeta de la lista.
        * Diseño minimalista con icono `+` grande.
        * Texto: "Añadir nuevo empleado".

---

### B. Modal: Creación de Empleado
Ventana modal superpuesta con formulario para dar de alta nuevos registros.

#### Estado 1: Formulario Base (Contrato Definido)
**Archivo de referencia:** `image_ff3a49.jpg`
* **Cabecera:** Icono "Atrás" (flecha izquierda).
* **Campos del Formulario (Vacíos):**
    * `Nombre de usuario` (Input Text).
    * `Nombre y Apellidos` (Input Text).
    * `Género` (Input Text - *Nota: Placeholder sugiere entrada manual "Ej.: Femenino"*).
    * `Fecha de nacimiento` (Input Date - Placeholder: dd/mm/aaaa).
    * `DNI` (Input Text).
    * **`Indefinido` (Toggle Switch): APAGADO (Gris).**
    * **`Fin del contrato` (Input Text): VISIBLE.**
    * `Foto de perfil` (Botón "Subir").
* **Acción Principal:** Botón "Crear empleado".

#### Estado 2: Formulario Contrato Indefinido
**Archivo de referencia:** `image_ff3a88.jpg`
* **Cambio Lógico:**
    * **`Indefinido` (Toggle Switch): ENCENDIDO (Verde).**
    * **Resultado:** El campo `Fin del contrato` desaparece de la interfaz.

---

### C. Modal: Vista de Detalle (Read-only)
**Archivo de referencia:** `image_ff3a83.jpg`
* **Diseño:** Layout de dos columnas (Imagen izquierda / Datos derecha).
* **Funcionalidad:**
    * Iconos de "Copiar al portapapeles" junto a cada dato.
    * Visualización clara de datos sensibles (DNI, Usuario).
* **Acciones de Gestión:**
    * Icono **Lápiz**: Navega al modo Edición.
    * Icono **Papelera**: Navega al modo Eliminación.

---

### D. Modal: Edición de Empleado
Formulario precargado con datos de un usuario existente.

#### Estado 1: Edición con Fecha de Fin
**Archivo de referencia:** `image_ff3aa2.jpg`
* **Diferencias con Creación:**
    * **Datos:** Los inputs contienen valores (Ej. "Antonio García López").
    * **Componente Género:** Parece cambiar a un **Dropdown/Select** (flecha visible), a diferencia del input de texto en creación.
    * **Foto de Perfil:** Muestra el nombre del archivo cargado (`antonio.jpg`) y opción de eliminar (`x`).
    * **Botón Principal:** Texto cambia a "Guardar cambios".
* **Lógica de Contrato:** Toggle `Indefinido` **APAGADO** -> Campo `Fin del contrato` **VISIBLE** con fecha "12/03/2026".

#### Estado 2: Edición Indefinida
**Archivo de referencia:** `image_ff8c1f.jpg`
* **Lógica de Contrato:** Toggle `Indefinido` **ENCENDIDO** -> Campo `Fin del contrato` **OCULTO**.

---

### E. Modal: Confirmación de Eliminación
**Archivo de referencia:** `image_ff8c24.jpg`
* **Tipo:** Alerta / Diálogo de confirmación.
* **Mensaje:**
    * Título: "Vas a eliminar a un cocinero".
    * Subtítulo: "¿Deseas eliminar a [Nombre del empleado]?".
* **Acción:** Botón rojo destacado "Eliminar".

---

## 3. Lógica de Negocio y Comportamiento UI

### Reglas de Visibilidad Condicional
Para el desarrollo, se debe implementar la siguiente lógica reactiva:
```javascript
SI (Toggle_Indefinido == TRUE) {
    Ocultar(Campo_Fin_Contrato);
    Limpiar o ignorar valor de Fin_Contrato;
}
SINO {
    Mostrar(Campo_Fin_Contrato);
    Validar que Fin_Contrato sea obligatorio;
}