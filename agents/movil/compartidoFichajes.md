# Mockups — Pantalla “Registro de horario” (2 estados)

Este documento describe **de forma exhaustiva** dos mockups móviles (iPhone) de la misma pantalla, mostrando **dos estados** del registro de jornada:  
- **Estado A (izquierda):** jornada **no iniciada**.  
- **Estado B (derecha):** jornada **en curso**.

> **Idioma de la UI:** Español.  
> **Estética:** minimalista, fondo blanco, contenedores tipo “card” con borde fino gris y esquinas redondeadas.  
> **Tipografía:** estilo iOS/SF Pro (aprox.), con jerarquía clara (títulos en negrita, secundarios en gris).

---

## 1) Contexto general y marco del dispositivo

Ambos mockups están dentro del marco de un iPhone moderno con “Dynamic Island” arriba.

### 1.1 Barra de estado (iOS)
- Hora (izquierda): **9:41**
- Indicadores (derecha): señal móvil, Wi‑Fi y batería.
- Fondo blanco, elementos en negro.

---

## 2) Estructura global de la pantalla (común a ambos estados)

La pantalla se compone de:

1. **App bar / encabezado**  
2. **Card de jornada (estado del día actual)**  
3. **Card de historial** (lista paginada de jornadas anteriores)

La disposición es vertical (scrollable en un producto real, aunque aquí cabe casi todo en vista).

---

## 3) Encabezado (App bar)

### 3.1 Elementos
- **Icono “hamburguesa”** (☰) alineado a la izquierda.
- **Título de pantalla:** `Registro de horario`  
  - Peso: **negrita**  
  - Color: negro  
  - Tamaño: grande (título principal)

### 3.2 Separador
Bajo el encabezado aparece una **línea horizontal fina** (divider) de color gris muy claro, que separa el app bar del contenido.

### 3.3 Comportamiento esperado (semántica)
- Pulsar el **hamburguesa** abriría un menú lateral / navegación.
- El título es estático (no interactivo).

---

## 4) Card 1 — Jornada del día (común)

Es la primera tarjeta bajo el encabezado. Presenta:
- Icono de reloj a la izquierda.
- Fecha y hora grandes (fecha en línea 1, hora en línea 2).
- Contenido variable según el estado (A o B).
- Un botón principal de acción en la parte inferior de la tarjeta.

### 4.1 Estilo del contenedor
- Fondo blanco.
- **Borde**: 1px aprox., gris claro.
- **Esquinas redondeadas**: radio medio (aprox. 10–14 px).
- Padding interno generoso (aprox. 16–20 px).
- Elementos alineados principalmente a la izquierda, excepto algunos textos/botón en el estado A donde se percibe centrado.

### 4.2 Cabecera interna (común)
- **Icono**: reloj/clock outline (negro) a la izquierda.
- **Texto principal** (a la derecha del icono):
  - Línea 1 (negrita): `Lunes, 17 de noviembre`
  - Línea 2 (negrita): `9:41`

---

## 5) Estado A (mockup izquierdo) — Jornada no iniciada

### 5.1 Mensaje de estado
Debajo de la cabecera (fecha/hora):
- Texto informativo en gris:  
  `No has iniciado aún tu jornada`
- Apariencia: texto secundario (gris medio), tamaño menor que el título.

### 5.2 Botón principal
Ubicado debajo del mensaje, centrado dentro de la card.
- Texto: `Iniciar jornada`
- A la izquierda del texto hay un **icono circular** pequeño con un **triángulo de “play”** dentro (indicando iniciar).
- Estilo del botón:
  - Fondo gris claro (relleno suave).
  - Borde gris algo más oscuro.
  - Esquinas redondeadas (pill/rectángulo redondeado).
  - Altura típica de botón táctil (aprox. 40–44 px).
  - Texto negro o gris oscuro.

### 5.3 Semántica esperada
- Pulsar **Iniciar jornada** cambia el estado de la pantalla al **Estado B (jornada en curso)**.
- El mensaje “No has iniciado…” desaparece al iniciar.

---

## 6) Estado B (mockup derecho) — Jornada en curso

En este estado la card 1 mantiene la cabecera (fecha/hora) y cambia el bloque central.

### 6.1 Indicador “en curso”
Justo debajo de la hora:
- Pequeño icono tipo **triángulo/play** apuntando a la derecha.
- Texto en gris: `Jornada en curso`
- Se muestra como “estado” o “badge textual” de baja jerarquía.

### 6.2 Detalles de la jornada
A continuación aparecen dos líneas informativas (gris medio), alineadas a la izquierda:
- `Inicio: 9:38`
- `Duración: 00:03:20`

Notas:
- `Inicio:` y `Duración:` actúan como etiquetas.
- Los valores están en el mismo renglón que su etiqueta.
- Formato de duración: `HH:MM:SS` (con ceros a la izquierda).

### 6.3 Botón principal
Ubicado debajo de los detalles, centrado o ligeramente alineado al centro dentro de la card:
- Texto: `Detener jornada`
- Icono a la izquierda: **círculo con símbolo de “pausa”** (dos barras verticales).
- Estilo similar al botón del Estado A:
  - Fondo gris claro.
  - Borde gris.
  - Esquinas redondeadas.
  - Tamaño táctil.

### 6.4 Semántica esperada
- Pulsar **Detener jornada** finalizaría la jornada actual.
- Posible resultado:
  - La jornada se añade al **Historial**.
  - El estado vuelve al **Estado A** (o a un estado “jornada finalizada” no mostrado).

---

## 7) Card 2 — Historial (común)

Segunda tarjeta, situada bajo la card de jornada. Incluye:
- Cabecera “Historial” con icono de calendario.
- Lista de registros (3 visibles).
- Menú de opciones por registro (ellipsis).
- Paginación al pie.

### 7.1 Cabecera de la card
- Icono: **calendario** (negro) a la izquierda.
- Título: `Historial` en negrita, negro, grande.

### 7.2 Lista de registros (3 filas visibles)

Cada fila tiene la misma estructura:

**(A) Indicador circular a la izquierda**
- Un círculo tipo “radio” (contorno) con un punto/centro marcado (parece un “radio seleccionado” o un marcador de evento).
- Color: negro/gris muy oscuro.

**(B) Bloque de texto central-izquierdo**
- Línea 1 (negro/gris oscuro): fecha en formato `YY/MM/DD`:
  - `25/11/13`
  - `25/11/10`
  - `25/11/07`
- Línea 2 (gris): rango horario `HH:MM–HH:MM`:
  - `9:22–16:05`
  - `9:30–16:00`
  - `9:35–16:14`

**(C) Duración alineada a la derecha**
- Texto gris medio, alineado aproximadamente en una columna derecha:
  - `6h43m`
  - `6h30m`
  - `6h39m`

**(D) Menú contextual (más opciones)**
- A la derecha del todo en cada fila:
  - Icono de **tres puntos horizontales** `...`
- Semántica: abrir acciones del registro (editar, ver detalle, borrar, exportar, etc. — no se especifica).

### 7.3 Separación entre filas
- Espaciado vertical consistente.
- No se aprecian líneas divisorias fuertes; el espaciado funciona como separador principal (si hay divisores, son muy sutiles).

---

## 8) Paginación del historial (común)

En la parte inferior de la card Historial aparece un control de paginación horizontal.

### 8.1 Elementos visibles
- A la izquierda: `← Previous`
  - En gris claro (parece **deshabilitado** en la página 1).
- Centro:
  - Un “chip” oscuro (rectángulo redondeado) con el número **`1`** en blanco: página actual seleccionada.
  - El número **`2`** en texto normal (no seleccionado).
  - Un **ellipsis** `...` indicando más páginas intermedias o salto.
- A la derecha: `Next →`
  - En negro (parece **habilitado**).

### 8.2 Semántica esperada
- `Previous`:
  - Deshabilitado cuando estás en la primera página.
  - Si estuviera habilitado, iría a la página anterior.
- `1`, `2`:
  - Navegan directamente a una página concreta.
- `...`:
  - Indica páginas adicionales (posible salto a un listado más amplio).
- `Next`:
  - Avanza a la página siguiente.

---

## 9) Jerarquía visual y estilos (resumen)

### 9.1 Jerarquía de texto
1. **Título de pantalla**: `Registro de horario` (negrita, grande)
2. **Cabeceras de cards**:
   - Fecha + hora (`Lunes, 17 de noviembre` / `9:41`) (negrita, grande)
   - `Historial` (negrita, grande)
3. **Textos de estado y detalle** (gris):
   - `No has iniciado aún tu jornada`
   - `Jornada en curso`
   - `Inicio: 9:38`
   - `Duración: 00:03:20`
   - Rangos horarios en historial (`9:22–16:05`, etc.)
4. **Metadatos laterales**:
   - Duraciones (`6h43m`, etc.)

### 9.2 Iconografía
- Hamburguesa (navegación)
- Reloj (estado de jornada)
- Play (iniciar / indicador de curso)
- Pausa (detener)
- Calendario (historial)
- Radio bullet (marcador de cada registro)
- Ellipsis (menú contextual)

### 9.3 Colores y contraste (aprox.)
- Fondo: blanco.
- Texto principal: negro.
- Texto secundario: gris medio.
- Bordes de cards: gris muy claro.
- Botones: relleno gris claro + borde gris (estilo “neutral”, no color primario).

---

## 10) Árbol de componentes (aproximación)

```
Screen: Registro de horario
├─ StatusBar (iOS)
├─ AppBar
│  ├─ IconButton: hamburger
│  └─ Title: "Registro de horario"
├─ Divider (thin)
├─ Card: Jornada del día
│  ├─ Row
│  │  ├─ Icon: clock
│  │  └─ Column
│  │     ├─ Text (bold): "Lunes, 17 de noviembre"
│  │     └─ Text (bold): "9:41"
│  └─ (State-dependent content)
│     ├─ Estado A:
│     │  ├─ Text (secondary): "No has iniciado aún tu jornada"
│     │  └─ Button: "Iniciar jornada" + play icon
│     └─ Estado B:
│        ├─ Row: play icon + "Jornada en curso"
│        ├─ Text: "Inicio: 9:38"
│        ├─ Text: "Duración: 00:03:20"
│        └─ Button: "Detener jornada" + pause icon
└─ Card: Historial
   ├─ Row
   │  ├─ Icon: calendar
   │  └─ Title (bold): "Historial"
   ├─ List (3 items visible)
   │  ├─ Item
   │  │  ├─ Radio indicator
   │  │  ├─ Column: date + time-range
   │  │  ├─ Duration (right column)
   │  │  └─ Ellipsis menu
   │  └─ (repite por cada fila)
   └─ Pagination
      ├─ "← Previous" (disabled on page 1)
      ├─ Page chip: "1" (selected)
      ├─ "2"
      ├─ "..."
      └─ "Next →" (enabled)
```

---

## 11) Diferencias clave entre los dos mockups

- **La única variación funcional está en la Card 1 (jornada del día):**
  - Izquierda: mensaje “No has iniciado…” + botón **Iniciar jornada** (play).
  - Derecha: estado “Jornada en curso” + inicio/duración + botón **Detener jornada** (pausa).
- **La Card de Historial es igual** en ambos: mismas filas, misma paginación, mismas duraciones.

---

## 12) Texto exacto presente (para implementación / i18n)

**Pantalla**
- `Registro de horario`

**Card Jornada**
- `Lunes, 17 de noviembre`
- `9:41`

**Estado A**
- `No has iniciado aún tu jornada`
- `Iniciar jornada`

**Estado B**
- `Jornada en curso`
- `Inicio: 9:38`
- `Duración: 00:03:20`
- `Detener jornada`

**Historial**
- `Historial`
- `25/11/13` — `9:22–16:05` — `6h43m`
- `25/11/10` — `9:30–16:00` — `6h30m`
- `25/11/07` — `9:35–16:14` — `6h39m`
- `← Previous`
- `1`
- `2`
- `...`
- `Next →`
