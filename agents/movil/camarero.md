# Especificación de UI/UX: Aplicación de Gestión de Restaurante (POS)

## 1. Visión General del Diseño (Design System)
* **Estilo Visual:** Minimalista, limpio, utilizando componentes nativos de iOS (Human Interface Guidelines).
* **Tipografía:** San Francisco (iOS System Font). Pesos variados para jerarquía (Bold para encabezados, Regular para cuerpo).
* **Paleta de Colores:**
    * **Fondo:** Blanco (`#FFFFFF`) y gris muy claro (`#F2F2F7` para fondos de listas/modales).
    * **Texto Principal:** Negro (`#000000`).
    * **Texto Secundario:** Gris oscuro (`#8E8E93`).
    * **Acentos/Acción:** Negro (Botones primarios) y Gris claro (Botones secundarios).
    * **Estados (Badges):** Gris claro (Neutro), Rojo (Alerta/Acción requerida).
* **Navegación:** Menú tipo "Hamburguesa" en la esquina superior izquierda.

---

## 2. Detalle por Pantalla

### 2.1. Vista de Detalle de Mesa - Gestión de Comandas (Estado Mixto)
**Archivo:** `image_18276d.png`

* **Cabecera:**
    * Icono de Menú (Hamburguesa) a la izquierda.
    * Título: "Mesa 1" (Grande, Bold, alineado a la izquierda junto al icono).
* **Notificación (Toast):**
    * Elemento flotante superior: "2 platos listos de comanda 2 mesa 1". Fondo gris claro, esquinas redondeadas, icono de campana pequeño a la izquierda.
* **Cuerpo (Lista de Comandas):**
    * **Comanda 1 (Implícita/Anterior):**
        * Lista de items (ej. "Cocacola 50 cl", "Botellín Cruzcampo").
        * Columnas: Nombre del producto, Cantidad, Precio Unitario, Precio Total.
    * **Comanda 2 (Activa):**
        * Cabecera de sección: Título "Comanda 2" alineado a la izquierda.
        * **Badge de Estado:** Etiqueta "Realizada" (Fondo gris, texto gris oscuro) junto al título.
        * Hora: "9:31" alineada a la derecha.
        * **Items:**
            * "Papas Bravas": Casilla de verificación (Checkbox) marcada, cantidad 2, precios.
            * "Chocos Fritos Plato": Texto en **Rojo** (indica atención), Casilla de verificación desmarcada, cantidad 1, precios.
* **Pie de Página (Sticky Footer):**
    * Dos botones de igual ancho, esquinas redondeadas (radio aprox. 12px), fondo gris claro (`#E5E5EA`).
    * Botón Izquierdo: Icono `(+)` en círculo + Texto "Añadir comanda".
    * Botón Derecho: Icono `(x)` en círculo + Texto "Cerrar cuenta".

---

### 2.2. Vista de Detalle de Mesa - Resumen de Cuenta
**Archivo:** `image_1827ac.png`

* **Estructura:** Similar a la cabecera anterior ("Mesa 1").
* **Cuerpo (Resumen):**
    * Listado simplificado de todos los items acumulados por "Comanda 1" y "Comanda 2".
    * Formato de lista: Nombre | Cantidad | Precio Unit. | Precio Total.
    * **Sección de Totales:**
        * Separador: Línea discontinua horizontal.
        * Fila "Cuenta": Alineada a la derecha, valor "26.4 €".
        * Fila "Propina": Alineada a la derecha, valor "1.6 €".
        * Separador: Línea discontinua horizontal.
        * Fila "Total": Texto en **Bold**, alineado a la derecha, valor "28.0 €".
* **Pie de Página:**
    * Botón Izquierdo: Icono `(+)` + Texto "Añadir Propina" (Fondo gris claro).
    * Botón Derecho: Icono `(x)` + Texto "Confirmar cierre" (Fondo gris claro).

---

### 2.3. Vista de Detalle de Mesa - Modal de Propina
**Archivo:** `image_1827a8.png`

* **Contexto:** Es la misma pantalla que el resumen de cuenta (2.2), pero con un modal/hoja de acción inferior activa.
* **Panel Inferior (Action Sheet):**
    * Contenedor blanco con sombra o borde sutil, esquinas superiores redondeadas.
    * Título del campo: "Importe:".
    * **Input:** Campo de texto con borde redondeado gris claro. Valor prellenado "2,50" alineado a la izquierda, símbolo "€" alineado a la derecha dentro del input.
    * **Botón de Acción:** Botón de ancho completo, color **Negro** (Primary), texto blanco "Agregar propina".

---

### 2.4. Vista de Detalle de Mesa - Estado de Cocina/Entrega
**Archivo:** `image_182771.png`

* **Variación de Estado:** Similar a la pantalla 2.1 pero muestra diferentes estados de los pedidos.
* **Comanda 1:**
    * Badge de Estado: "Entregada" (Fondo gris).
    * Hora: "9:23".
    * Items mostrados con texto tachado (strikethrough) indicando completitud.
* **Comanda 2:**
    * Badge de Estado: "En cocina" (Fondo gris).
    * Item "Papas Bravas": Texto en **Rojo**, Icono de cuadrado (checkbox) vacío.
    * Item "Chocos Fritos Plato": Icono de **Reloj** (indica espera/tiempo), cantidad 1.
* **Nota Funcional:** Esta vista permite al camarero ver qué platos están pendientes de salir de cocina vs. los entregados.

---

### 2.5. Dashboard Principal - Lista de Mesas
**Archivo:** `image_182754.png`

* **Cabecera:** Título "Mesas", Icono de Menú Hamburguesa.
* **Lista de Mesas:**
    * Filas alternas con fondo blanco y fondo gris muy tenue para distinguir (zebra striping sutil o agrupación).
    * **Anatomía de la Fila:**
        * **Icono de Estado (Izquierda):**
            * Campana sobre mano (Servicio solicitado/Atención).
            * Campana negra llena (Mesa ocupada/activa).
            * Campana contorneada (Mesa libre/inactiva).
        * **Información Central:**
            * Nombre: "Mesa X" (donde X es el número).
            * Subtítulo: "Responsable: [Nombre]" (ej. Tú, Antonio, Pablo). Si no hay responsable asignado, no aparece.
        * **Icono de Tipo de Mesa:**
            * Mesa con sillas (Interior).
            * Sombrilla con mesa (Terraza/Exterior).
        * **Botón de Acción (Derecha):**
            * "Crear cuenta" (Botón gris, contorno suave): Para mesas nuevas.
            * "Abrir cuenta" (Botón blanco/transparente, texto oscuro): Para mesas ya activas.
* **Paginación/Scroll:** Lista continua hasta Mesa 12 visible.

---

### 2.6. Crear Comanda - Búsqueda y Selección
**Archivo:** `image_18278b.png`

* **Cabecera:** Título "Mesa - Crear comanda".
* **Barra de Búsqueda:**
    * Input superior con fondo gris claro, icono de lupa. Texto introducido: "Cruzcampo".
* **Resultados de Búsqueda (Dropdown/Lista):**
    * Aparece debajo de la barra de búsqueda sobre el contenido.
    * Items: "Botellín Cruzcampo" (1.4€), "Tercio Cruzcampo" (2€). Fondo gris claro resaltado.
* **Lista de Selección (Carrito):**
    * Items añadidos debajo: Icono de papelera (eliminar) a la izquierda.
    * Nombre del producto ("Tapa Lagrimitas de pollo", "Tapa Carrillera").
    * Precio unitario.
    * **Stepper/Input de Cantidad:** Caja cuadrada con número ("2", "1") a la derecha.
* **Teclado:** Teclado nativo de iOS desplegado en la parte inferior, cubriendo parte de la pantalla.

---

### 2.7. Crear Comanda - Revisión (Carrito)
**Archivo:** `image_18278f.png`

* **Estado:** Vista de la comanda antes de confirmar, sin teclado y sin búsqueda activa.
* **Barra de Búsqueda:** Texto "Buscar" (placeholder).
* **Lista de Items:**
    * Disposición limpia de los items seleccionados.
    * Icono Papelera | Nombre | Precio | Input Cantidad.
* **Pie de Página:**
    * Botón Izquierdo: Icono `(+)` + Texto "Confirmar comanda" (Fondo gris claro).
    * Botón Derecho: Icono `(x)` + Texto "Cancelar Comanda" (Fondo gris claro).

---

### 2.8. Gestión de Reservas (Doble Vista)
**Archivo:** `image_1827b0.jpg`

Esta imagen muestra dos estados de la misma pantalla "Reservas".

**Estado A (Izquierda - Lista):**
* **Cabecera:** Título "Reservas", Menú Hamburguesa.
* **Tarjeta de Fecha:**
    * Contenedor blanco con sombra.
    * Icono Calendario + "Lunes, 17 nov.".
    * Botón cuadrado `(+)` a la derecha (Añadir reserva).
* **Tarjetas de Reserva:**
    * Icono de usuario/grupo.
    * Nombre del cliente + (nº personas).
    * Icono de reloj + Hora (ej. 14:00).
    * **Acciones:** Botón "Editar" (Gris claro) y "Eliminar" (Negro/Gris oscuro).
    * **Estado "Terminado":** Tarjeta desactivada (opacity reducida), botón "Terminada" deshabilitado.
* **Paginación:** Controles "Previous", Números de página (1 activo, 2, 3), "Next" en el pie.

**Estado B (Derecha - Formulario de Creación):**
* **Interacción:** Al pulsar el botón `(+)` en la tarjeta de fecha.
* **Formulario Expandido:**
    * Se despliega un panel dentro de la tarjeta de fecha o justo debajo.
    * Campo "Anfitrión": Placeholder "Nombre y apellido".
    * Campo "Hora": Placeholder "12:00".
    * Botón "Añadir reserva": Fondo **Negro** (Primary), texto blanco, icono `+`.
* **Contexto:** El resto de la lista de reservas se desplaza hacia abajo pero sigue visible.