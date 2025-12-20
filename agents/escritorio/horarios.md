# Descripción exhaustiva de los mockups (pantalla **Horarios**) — Sistema de gestión de restaurante

Este documento describe con detalle **4 mockups** de una interfaz web para gestión de un restaurante. El objetivo es que un agente (humano o IA) pueda reconstruir la UI y sus estados/acciones **solo leyendo este texto**.

---

## 1) Contexto general: qué es esta pantalla

- Es una **aplicación web** de backoffice (gestión).
- La sección activa es **“Horarios”**, donde un **gerente** gestiona:
  - El calendario (vista **Week / semana**).
  - Asignación de personal a turnos (cocina y sala).
  - Horario general (por día de la semana).
  - Horarios especiales (días concretos que sobrescriben el horario general).

---

## 2) Estructura global fija (presente en todos los mockups)

### 2.1 Encabezado superior (header)

**Alineación general:**
- Fondo blanco, layout limpio, centrado y con mucha “respiración” (espacios amplios).
- Elementos principales:
  1. **Logo** (esquina superior izquierda): icono circular monocromo (negro).
  2. **Barra de navegación** centrada (tabs):
     - `Horarios` (activo)
     - `Comandas`
     - `Camareros`
     - `Inventario`
     - `Estadísticas`
  3. **Perfil/rol** (esquina superior derecha): botón/píldora oscura con texto `Gerente 1`.

**Estado activo de la pestaña:**
- La pestaña seleccionada aparece con fondo claro (gris suave) y texto oscuro.
- En los mockups mostrados, **Horarios** está resaltado.

---

## 3) Layout principal (debajo del header)

La pantalla se divide en **dos zonas**:

1. **Zona principal izquierda/central:** un calendario con rejilla horaria (semanal).
2. **Panel lateral derecho:** controles del horario general y acciones de “día especial”.

### 3.1 Zona principal: calendario semanal (Week view)

**Componentes visibles:**
- Un botón/píldora a la izquierda: `Today` (o, en otra variante, una píldora con una fecha corta tipo `21-05`).
- Un encabezado central del calendario:
  - Flecha izquierda (navegar a la semana anterior).
  - Rango de fechas centrado (ej: `May 21 – 26, 2045`).
  - Flecha derecha (navegar a la semana siguiente).
- Un selector de vistas (pestañas pequeñas) en la parte superior derecha del calendario:
  - `Year`
  - `Week` (seleccionada)
  - `Month`
  - `Day`

**Rejilla horaria:**
- Columna izquierda fija con marcas de hora: `0:00` hasta `23:00`.
- 7 columnas (días de la semana):
  - Normalmente: `Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo`.
  - En un mockup aparece “Sábado” dos veces (probable placeholder/bug visual donde el segundo debería ser “Domingo”).
- Cada cabecera de día incluye:
  - El nombre del día (texto).
  - Un icono de **lápiz** (editar) alineado a la derecha de cada cabecera.
- La rejilla tiene líneas horizontales suaves (gris claro) para separar horas.

### 3.2 Panel lateral derecho: “Horario general”

**Título:** `Horario general`

**Contenido:**
- Lista de días (Lunes a Domingo) con:
  - Icono de lápiz (editar ese día del horario general).
  - Texto del rango horario del día.
- Ejemplos de rangos mostrados:
  - `Lunes: 8:00-00:00`
  - `Martes: 8:00-00:00`
  - `Miércoles: 8:00-00:00`
  - `Jueves: 8:00-00:00`
  - `Viernes: 8:00-00:00`
  - `Sábado: 00:00-02:00 & 10:00-00:00`
  - `Domingo: 00:00-02:00 & 10:00-18:00`

**Acción superior del panel derecho:**
- Botón destacado con icono `+` y texto:
  - `Añadir día especial`
- Se ubica cerca de la parte superior del panel derecho (sobre el listado o al inicio del panel).

---

## 4) Representación de turnos dentro del calendario

En la rejilla semanal, los turnos se representan con **bloques grandes** tipo tarjeta dentro de cada día.

### 4.1 Bloques (tarjetas) de turno

**Estilo del bloque:**
- Rectángulo grande con:
  - Fondo gris claro.
  - Borde negro (notable).
  - Esquinas redondeadas.
- Los bloques “encajan” en el día, cubriendo un rango vertical (horario) según su duración.
- En la mayoría de días se ven **dos bloques** principales:
  - Bloque de mañana/mediodía (aprox. entre 8:00–15:00).
  - Bloque de tarde/noche (aprox. entre 16:00–23:00 o 00:00).

**Contenido interno del bloque:**
- “Chips” (etiquetas redondeadas) con nombres de empleados:
  - Chips verdes (ej.: `Pablo Pérez`, `Esteban González`, `Mario Fernández`, `Carmen García`).
  - Chips naranjas (ej.: `Pablo Pérez`, `María Suárez` en algunos turnos).
- Los chips se apilan verticalmente dentro del bloque.
- Hay variaciones por día:
  - Algunos días muestran más personas en el turno.
  - En el sábado se ven turnos extra (por ejemplo un bloque nocturno pequeño arriba en la madrugada).

### 4.2 Día seleccionado / resaltado

En el primer mockup:
- El día **Miércoles** aparece con cabecera en rojo (fondo rojo intenso).
- Toda la columna del miércoles tiene un **tinte rojo muy suave** (overlay) indicando selección/foco.
- Dentro del miércoles aparece un bloque central con fondo rojizo (más saturado) que sugiere:
  - Un turno “especial”
  - O un turno actualmente en edición/selección.

---

## 5) Mockup 1 — Vista semanal “Horarios” con un día resaltado

**Qué se ve:**
- Pestaña `Horarios` activa.
- Vista semanal con columnas de días y horas.
- Miércoles está seleccionado:
  - Cabecera roja con texto `Miércoles`.
  - Columna con sombreado rojo claro.
  - Un bloque de turno principal en rojo claro (diferente del gris estándar).
- En el sábado se aprecian bloques en la parte superior (madrugada), con chips:
  - `Mario Fernández`
  - `Carmen García`
  - `Pablo Pérez`
- Panel derecho con `Horario general` y el botón `Añadir día especial`.

**Interpretación funcional (lo que sugiere):**
- El usuario puede seleccionar un día (por click en la columna o cabecera).
- Puede editar (icono lápiz) la configuración de ese día o sus turnos.

---

## 6) Mockup 2 — Modal de edición de un día especial (Martes 22/07)

Este mockup muestra un **modal centrado** que se superpone al calendario (fondo atenuado).

### 6.1 Modal: estructura visual

- Caja blanca grande con bordes redondeados.
- Sombra suave (elevación).
- Título enorme:
  - `Martes 22/07`
- El fondo (calendario y panel derecho) queda visible pero desenfocado/atenuado.

### 6.2 Sección “Horario especial”

- Texto: `Horario especial`
- Un **toggle** (interruptor) a la derecha:
  - En el mockup está **activado** (verde).

**Campos de hora:**
- Dos columnas:
  - Izquierda: **Apertura**
  - Derecha: **Cierre**
- Inputs tipo “time” o campo corto con borde suave.
- Valores mostrados:
  - Apertura: `9:00`
  - Cierre: `00:00`

### 6.3 Definición de turnos del día

Debajo se define la estructura de turnos (en este caso 2 turnos):

**Turno 1**
- Etiquetas:
  - `Inicio primer turno` → valor `9:00`
  - `Fin primer turno` → valor `16:00`

**Turno 2**
- Etiquetas:
  - `Inicio segundo turno` → valor `16:00`
  - `Fin segundo turno` → valor `00:00`

### 6.4 Asignación de personal por turno (Primer turno y Segundo turno)

Cada turno se divide en dos columnas/tipos de rol:

- **Cocineros**
- **Camareros**

Cada rol tiene:
- Título del rol (subrayado o destacado).
- Icono `+` a la derecha del título (para añadir persona).
- Lista de personas asignadas, cada una con:
  - Icono `x` (eliminar) a la izquierda.
  - Nombre completo.

**Primer turno:**
- Cocineros:
  - Pablo Pérez
  - María Suárez
- Camareros:
  - Mario Fernandez
  - Esteban Gonzalez

**Segundo turno:**
- Cocineros:
  - Pedro Jimenez
  - Antonio Lobato
- Camareros:
  - Mario Hernández
  - Blanca García

### 6.5 Acciones del modal (parte inferior)

- Botón izquierdo: `Añadir nuevo turno`
  - Estilo secundario (gris claro).
  - Icono `+` a la izquierda del texto.
  - Sugiere que el día puede tener más de 2 turnos (por ejemplo 3 o más).
- Botón derecho principal: `Confirmar cambios`
  - Estilo primario (verde claro).
  - Icono de check `✓` a la izquierda.
  - Acción esperada: guardar y aplicar el horario especial del día.

---

## 7) Mockup 3 — Dropdown/selector al añadir personal (modal abierto)

Este mockup es una extensión del modal anterior, mostrando un **desplegable** al pulsar algún `+` de añadir personal.

### 7.1 Dropdown (lista de selección)

- Se despliega cerca del botón `+` (encima del modal).
- Caja gris clara con sombra.
- Opciones en lista vertical:
  - `Francisco Siba`
  - `Ana Cuesta`
  - `Carmen García`

**Interpretación funcional:**
- Al hacer click en un nombre:
  - Se añade al rol/turno correspondiente (Cocineros o Camareros del turno donde se pulsó `+`).
- El dropdown parece un selector simple (sin búsqueda visible en este estado).

---

## 8) Mockup 4 — Vista semanal con detalle de horas por empleado (y estado “alerta” en rojo)

Este mockup vuelve a la vista semanal sin modal, pero con un contenido diferente dentro de los bloques.

### 8.1 Diferencia clave vs Mockup 1

Dentro de cada bloque del turno, además de los chips con el nombre, aparece un **rango de horas** por persona.

**Formato de hora:**
- `HH:MM-HH:MM`
- Ejemplos en el turno de mañana:
  - `7:59-15:02`
  - `8:01-15:02`
  - `8:34-15:02`
  - `8:01-14:02`
- Ejemplos en el turno de tarde/noche:
  - `15:49-00:01`
  - `15:59-00:02`
  - `15:59-00:02`

### 8.2 Colores y semántica de “alerta”

- Algunas líneas de horas aparecen en **rojo** (texto rojo).
- En el mockup se ven en rojo, por ejemplo, rangos como:
  - `8:34-15:02`
  - `8:01-14:02`
- Esto sugiere un estado de validación o incidencia, por ejemplo:
  - Llegadas tardías vs inicio esperado.
  - Turnos no alineados con el horario general.
  - Conflictos / desajustes / registro real vs planificado.
  - (El mockup no explica la regla exacta; solo deja claro que el rojo = “algo a revisar”.)

### 8.3 Encabezado del calendario en este mockup

- La pestaña `Week` sigue seleccionada.
- A la izquierda, en vez de “Today”, aparece una píldora con `21-05` (posible indicador de día/mes o shortcut a la semana actual).

---

## 9) Inventario de elementos UI (para reconstrucción rápida)

### 9.1 Componentes interactivos principales

- Tabs del header (navegación por módulos):
  - Horarios / Comandas / Camareros / Inventario / Estadísticas
- Botón/selector de usuario:
  - `Gerente 1`
- Botón:
  - `Añadir día especial`
- Selector de vista:
  - Year / Week / Month / Day
- Navegación de semana:
  - Flecha izquierda / derecha
- Botón:
  - `Today` (o píldora con fecha)
- En cada día del calendario:
  - Icono lápiz (editar día)
- En el panel “Horario general”:
  - Icono lápiz por cada día (editar rango)
- Modal de día especial:
  - Toggle “Horario especial”
  - Inputs de hora: apertura/cierre + inicio/fin de cada turno
  - `+` para añadir personal en cada rol y turno
  - `x` para quitar personal asignado
  - Botón `Añadir nuevo turno`
  - Botón `Confirmar cambios`
- Dropdown de selección de personal (lista de nombres)

### 9.2 Tipos de datos visibles (strings/formatos)

- Rangos de fecha de semana: `May 21 – 26, 2045`
- Día concreto: `Martes 22/07`
- Horas:
  - Formato simple: `9:00`, `16:00`, `00:00`
  - Formato con minutos: `7:59-15:02`, etc.
- Empleados (ejemplos):
  - Pablo Pérez
  - Esteban González
  - María Suárez
  - Mario Fernández
  - Carmen García
  - Pedro Jimenez
  - Antonio Lobato
  - Mario Hernández
  - Blanca García
  - Francisco Siba
  - Ana Cuesta

---

## 10) Comportamiento sugerido (derivado visualmente)

> Nota: esto describe lo que la UI **parece** permitir por su diseño; no afirma reglas de negocio internas.

- **Editar un día**:
  - Click en lápiz del encabezado del día o click en el bloque abre modal.
- **Horario especial ON**:
  - Permite definir apertura/cierre y la estructura de turnos para esa fecha concreta.
  - Sobrescribe (para ese día) el horario general del panel derecho.
- **Añadir personal**:
  - Click en `+` abre dropdown con lista de empleados disponibles.
- **Eliminar personal**:
  - Click en `x` junto al nombre lo quita del turno/rol.
- **Añadir nuevo turno**:
  - Crea un bloque adicional de configuración (Turno 3, etc.) con inicio/fin y asignación de personal.
- **Confirmar cambios**:
  - Guarda y actualiza la vista semanal.

---

## 11) Notas de consistencia / detalles observados

- En un mockup la última columna aparece etiquetada como “Sábado” dos veces; en otro mockup sí aparece “Domingo”.
- Hay variación de contenido dentro de los turnos:
  - Un modo “simple” (solo chips con nombres).
  - Un modo “detallado” (chips + horas por persona) con alertas en rojo.

---

**Fin del documento.**
