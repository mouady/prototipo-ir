# Mockups — Pantalla **Avisos** (iOS)

Este documento describe **de forma exhaustiva** dos mockups (dos estados) de una misma pantalla móvil titulada **“Avisos”**. El objetivo es que un agente (diseño, desarrollo o QA) pueda **reconstruir la interfaz y entender los estados/variaciones** sin ver las imágenes.

---

## 1) Contexto general del dispositivo y marco visual

- **Dispositivo:** iPhone con *Dynamic Island* (cápsula negra centrada en la parte superior).
- **Barra de estado (iOS):**
  - Hora en la esquina superior izquierda: **9:41**.
  - En la esquina superior derecha aparecen los iconos típicos (cobertura/señal, Wi‑Fi y batería).
- **Estilo visual:** monocromático / escala de grises (mockup tipo wireframe).
- **Fondo general de la pantalla:** blanco.
- **Tipografía:** estilo iOS (similar a San Francisco), con jerarquía clara (título grande y textos de lista más pequeños).

---

## 2) Estructura común de la pantalla (presente en ambos mockups)

### 2.1. Cabecera (header)
En la zona superior, debajo de la barra de estado:

- **Icono de menú hamburguesa** (tres líneas horizontales) alineado a la **izquierda**.
- **Título de pantalla:** **“Avisos”**
  - Texto grande, en negrita, alineado hacia el **lado izquierdo** y centrado verticalmente con el icono.
  - El título queda a la derecha del icono hamburguesa.

### 2.2. Campo de búsqueda
Debajo de la cabecera:

- **Search bar** con forma de cápsula/redondeada y fondo gris claro.
- **Icono de lupa** en el extremo izquierdo del campo.
- **Texto introducido (query):** **“Cruzcampo”**.
- El campo ocupa casi todo el ancho disponible, con márgenes laterales.

### 2.3. Lista de resultados/elementos seleccionables
Debajo del buscador:

- Se muestran **tres filas** horizontales (tipo lista):
  1. **“Botellín Cruzcampo”**
  2. **“Tercio Cruzcampo”**
  3. **“Caña Cruzcampo”**
- Cada fila:
  - Fondo gris claro.
  - Texto alineado a la izquierda.
  - Separación visual entre filas (líneas/espaciado).
  - **Indicador de selección** en el extremo derecho: un **check** (✓) cuando está seleccionada.
- La lista parece representar opciones a las que se pueden aplicar/crear “avisos” (o filtros de avisos).

---

## 3) Mockup 1 — Estado con comentarios y botones de acción (sin teclado)

### 3.1. Selección en la lista
En este estado:

- **“Botellín Cruzcampo”** aparece **sin check** (no seleccionada).
- **“Tercio Cruzcampo”** aparece **con check** a la derecha (seleccionada).
- **“Caña Cruzcampo”** aparece **con check** a la derecha (seleccionada).

> Interpretación funcional probable: lista multi‑selección (se pueden marcar varias opciones simultáneamente).

### 3.2. “Chip” / campo de selección adicional
Debajo de la lista, aparece un componente adicional:

- Un **campo tipo “chip”** o **selector** con borde gris suave y esquinas redondeadas.
- Contenido dentro:
  - Texto: **“Botellín Cruzcampo”** alineado a la izquierda dentro del chip.
  - Icono **X** (cerrar/eliminar) alineado a la derecha dentro del chip.

Esto sugiere un **elemento seleccionado** o **tag** que puede eliminarse rápidamente.

### 3.3. Sección de comentarios
Debajo del chip:

- Etiqueta en gris claro: **“Comentarios:”**
- **Caja de texto multilínea** (textarea):
  - Borde fino gris claro y esquinas redondeadas.
  - Contiene el texto (tal cual aparece):
    > “La harina es mejor adquirirla de  
    > CashAlternativo ya que la de  
    > CashSupremo es muy mala.”
  - El texto está alineado a la izquierda y ocupa varias líneas.
  - Da la impresión de ser un campo editable para adjuntar una nota asociada a los avisos seleccionados.

### 3.4. Botones de acción inferiores (footer)
En la parte inferior de la pantalla (por encima de la barra de gestos), hay **dos botones grandes** con estilo “pill”/rectángulo redondeado, en gris claro:

1. **Botón izquierdo:** “Confirmar avisos”
   - Icono circular con **+** (más) a la izquierda del texto.
2. **Botón derecho:** “Cancelar avisos”
   - Icono circular con **X** a la izquierda del texto.

Ambos botones:
- Tienen apariencia deshabilitada/neutral (gris claro), típica de wireframe.
- Están alineados horizontalmente en una fila, con separación entre ellos y márgenes laterales.

---

## 4) Mockup 2 — Estado con teclado visible (búsqueda activa)

Este segundo mockup muestra la misma pantalla, pero en un estado en el que **el teclado está abierto**, lo cual reduce el espacio visible del contenido.

### 4.1. Cabecera, buscador y lista (parte superior)
Se mantiene:

- Icono hamburguesa + título **“Avisos”**
- Search bar con “Cruzcampo”
- Lista de tres elementos.

### 4.2. Selección en la lista (diferencia clave respecto al Mockup 1)
En este estado:

- **Los tres elementos** tienen check (✓) a la derecha:
  - “Botellín Cruzcampo” ✅
  - “Tercio Cruzcampo” ✅
  - “Caña Cruzcampo” ✅

> Esto sugiere un cambio de estado: o bien el usuario marcó el primero, o el mockup representa un caso “todo seleccionado”.

### 4.3. Teclado en pantalla (iOS)
Ocupa aproximadamente la mitad inferior:

- Teclado iOS en modo oscuro/gris.
- Barra de sugerencias arriba del teclado con palabras sugeridas como:
  - **“The”**, **“the”**, **“to”** (tal como se ve).
- Teclas:
  - Letras en filas QWERTY.
  - Tecla de retorno (enter) en azul (destaca en la esquina inferior derecha).
  - Icono de micrófono en la parte inferior derecha (dictado).
  - Icono de emoji en la parte inferior izquierda.
- Este estado implica que **algún campo está enfocado** (muy probablemente el buscador “Cruzcampo”).

### 4.4. Elementos que NO se ven en este estado
A diferencia del Mockup 1, en el Mockup 2 no se aprecian (porque el teclado tapa la zona inferior y/o el mockup no los incluye en este estado visible):

- El chip “Botellín Cruzcampo” con X (campo de selección/tag).
- La sección **Comentarios** y su textarea.
- Los botones **Confirmar avisos** / **Cancelar avisos**.

> Es coherente con un comportamiento real: al abrir el teclado, el contenido inferior queda oculto o se desplaza.

---

## 5) Componentes y comportamientos inferidos (útiles para implementación)

> Nota: esto es inferencia a partir del mockup, no una afirmación definitiva del producto.

### 5.1. Búsqueda/filtrado
- El buscador con “Cruzcampo” parece filtrar el listado de productos/bebidas.
- Al estar el teclado abierto (Mockup 2), el usuario estaría editando esa query.

### 5.2. Lista de selección múltiple
- Cada fila tiene un check a la derecha cuando está activa.
- Se permite seleccionar **varias** opciones a la vez (se ve en ambos estados).

### 5.3. Chips/selecciones rápidas
- El chip “Botellín Cruzcampo” con X sugiere:
  - Mostrar selecciones activas como tags.
  - Posibilidad de eliminar una selección tocando la X.

### 5.4. Comentarios asociados
- Un textarea que permite añadir una nota textual.
- Podría asociarse a:
  - el conjunto de avisos confirmados,
  - o a un aviso concreto (no se puede asegurar con el mockup).

### 5.5. Acciones principales
- **Confirmar avisos**: acción primaria para guardar/aplicar.
- **Cancelar avisos**: acción secundaria para descartar.

---

## 6) Texto literal presente en UI (para QA / i18n)

- Título: **Avisos**
- Búsqueda: **Cruzcampo**
- Items de lista:
  - **Botellín Cruzcampo**
  - **Tercio Cruzcampo**
  - **Caña Cruzcampo**
- Sección: **Comentarios:**
- Texto en comentarios:
  - **“La harina es mejor adquirirla de CashAlternativo ya que la de CashSupremo es muy mala.”**
- Botones:
  - **Confirmar avisos**
  - **Cancelar avisos**

---

## 7) Resumen de diferencias entre los dos estados

- **Mockup 1 (sin teclado):**
  - Seleccionados: Tercio ✅, Caña ✅; Botellín ❌.
  - Visible: chip “Botellín Cruzcampo” con X, comentarios, botones de confirmar/cancelar.
- **Mockup 2 (con teclado):**
  - Seleccionados: los tres ✅✅✅.
  - Visible: teclado iOS; no se ven chip/comentarios/botones por falta de espacio.

---
