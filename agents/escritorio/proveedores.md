# Especificación de UI/UX: Gestión de Proveedores

Este documento describe cuatro pantallas (vistas) diseñadas para una aplicación de gestión de inventario y proveedores. El diseño es limpio, minimalista y orientado a escritorio o tablet, con un estilo visual similar a "Material Design".

---

## 1. Vista Principal: Lista de Proveedores
**Archivo de referencia:** `image_361d2a.png`

Esta es la pantalla principal (`Dashboard`) donde se visualizan las tarjetas de los proveedores existentes.

### Cabecera (Header)
* **Izquierda:** Botón `Filtrar` (con icono de embudo).
* **Derecha:**
    * Botón `+ Crear` (Abre el Modal de Creación).
    * Botón de `Edición` (Icono de lápiz dentro de un cuadrado): Al hacer clic, cambia la vista al "Modo Edición".

### Cuerpo (Lista de Tarjetas)
La lista se compone de tarjetas (Cards) individuales por proveedor. Cada tarjeta contiene:

1.  **Columna Izquierda (Información Básica):**
    * **Nombre del Proveedor:** Texto en negrita (ej. "CashSupremo").
    * **ID/CIF:** Texto gris con icono de copiar (ej. "A46375821").
    * **Teléfono:** Texto gris con icono de copiar (ej. "+34 612...").
    * **Email:** Texto gris con icono de copiar (ej. "cash@supremo.com").

2.  **Columna Central (Métricas/Badges):**
    * Tres "pills" o insignias redondeadas que muestran conteos asociados al proveedor.
    * **Icono 1 (Ticket/Factura):** Fondo oscuro si > 0, gris claro si 0. Muestra cantidad de pedidos/facturas.
    * **Icono 2 (Bebida/Vaso):** Fondo oscuro si > 0, gris claro si 0. Muestra cantidad de bebidas suministradas.
    * **Icono 3 (Caja/Recurso):** Fondo oscuro si > 0, gris claro si 0. Muestra cantidad de recursos/items físicos.

3.  **Columna Derecha (Acciones Rápidas):**
    * **Botón Llamar:** Círculo oscuro con icono de teléfono blanco.
    * **Botón Email:** Círculo oscuro con icono de sobre (carta) blanco.

---

## 2. Modo Edición (Bulk Edit)
**Archivo de referencia:** `image_362029.png`

Esta vista se activa al presionar el botón de "Lápiz" en la vista principal. Transforma las tarjetas de lectura en filas de formulario editables.

### Cabecera de Edición
* **Izquierda:** Botón `Filtrar`.
* **Derecha:**
    * Botón `Guardar cambios` (Icono de disquete): Guarda las modificaciones y vuelve a la vista principal.
    * Botón `X` (Cerrar): Cancela la edición y vuelve a la vista principal sin guardar.

### Filas Editables
Cada fila representa un proveedor y contiene los siguientes campos (Inputs) de izquierda a derecha:

1.  **Botón Eliminar:** Círculo rojo con una "X" blanca. Al hacer clic, dispara el "Modal de Confirmación de Borrado".
2.  **Input Nombre:** Campo de texto (ej. "CashSupremo").
3.  **Input ID/CIF:** Campo de texto (ej. "A46375821").
    * *Nota visual:* Algunos campos tienen fondo amarillo pálido, indicando posiblemente autocompletado del navegador o estado "dirty" (modificado).
4.  **Input Teléfono:** Campo de texto con icono de teléfono a la derecha (ej. "+34 612...").
5.  **Input Email:** Campo de texto con icono de sobre a la derecha (ej. "cash@...").

---

## 3. Modal: Añadir Proveedor
**Archivo de referencia:** `image_361d80.png`

Un modal flotante o "bottom sheet" (dependiendo del dispositivo) para dar de alta un nuevo registro.

### Estructura
* **Cabecera:** Icono de flecha hacia atrás (`<-`) para cerrar/volver.
* **Formulario:**
    1.  **Label:** "Nombre"
        * **Input:** Placeholder "Ej: Naranjas Antonio"
    2.  **Label:** "CIF"
        * **Input:** Placeholder "Ej: A12345678"
    3.  **Label:** "Teléfono"
        * **Input:** Placeholder "Ej: +34 123 45 67 89"
    4.  **Label:** "Email"
        * **Input:** Placeholder "Ej: abc@defg.com"
* **Footer (Acción):**
    * Botón primario ancho completo (Full width).
    * Color: Gris muy oscuro / Negro (`#333` o similar).
    * Texto: `+ Añadir proveedor`.

---

## 4. Modal: Confirmación de Borrado
**Archivo de referencia:** `image_36202f.png`

Este modal aparece al hacer clic en el botón rojo de eliminar en el "Modo Edición". Es una alerta crítica.

### Estructura
* **Cabecera:** Icono de flecha hacia atrás (`<-`) para cancelar.
* **Título:** "¿Deseas eliminar a [Nombre del Proveedor]?"
    * *Texto dinámico:* El nombre cambia según la selección (ej. "CashSupremo").
* **Cuerpo del mensaje:**
    * Texto explicativo que detalla las consecuencias: "Este proveedor suministra **[X] bebidas** y **[Y] recursos** que se eliminarán del inventario."
    * Los números X e Y deben corresponder a las métricas mostradas en la Vista Principal.
* **Botón de Acción:**
    * Color: Rojo intenso (`#FF0000` aprox).
    * Texto: `Eliminar`.
    * Ubicación: Alineado a la derecha.

---

## Guía de Estilos (Design Tokens implícitos)

* **Tipografía:** Sans-serif (probablemente Inter, Roboto o similar). Legible y moderna.
* **Colores:**
    * **Fondo:** Blanco (`#FFFFFF`) y Gris muy claro (`#F9F9F9`) para fondos de pantalla.
    * **Bordes:** Gris suave (`#E0E0E0`) para separar tarjetas e inputs.
    * **Texto Principal:** Negro o Gris muy oscuro (`#111111`).
    * **Texto Secundario/Placeholders:** Gris medio (`#999999`).
    * **Botones Primarios:** Gris oscuro/Negro.
    * **Acciones Destructivas:** Rojo.
* **Iconografía:** Estilo lineal (outline) simple para acciones generales, iconos sólidos para botones circulares de acción.
* **Radios de borde (Border Radius):**
    * Tarjetas y Modales: aprox 8px - 12px.
    * Inputs: aprox 6px - 8px.
    * Botones (Pills): Borde completamente redondeado (aprox 20px).