# Descripción de Interfaz de Usuario: Panel de Control de Restaurante

Este documento describe cinco capturas de pantalla de una aplicación web de gestión de restaurantes. La interfaz mantiene un diseño consistente (layout) con variaciones en el contenido principal según la sección seleccionada.

## 1. Estructura Global (Común a todas las vistas)

* **Encabezado (Header):**
    * **Logo:** Situado en la esquina superior izquierda (icono circular abstracto).
    * **Menú de Navegación Superior:**
        * Horarios
        * Comandas
        * Empleados
        * Inventario
        * *Estadísticas* (Elemento activo en todas las imágenes, con fondo gris claro).
    * **Perfil de Usuario:** Botón en la esquina superior derecha con el texto "Gerente 1".

* **Barra Lateral Izquierda (Sub-navegación de Estadísticas):**
    * Título: "Estadísticas".
    * Opciones del menú (la selección cambia según la imagen):
        * Proveedores
        * Camareros
        * Reservas
        * Ticket
        * Platos

* **Área de Contenido Principal:** Ocupa el centro y derecha de la pantalla. Contiene filtros (Mes/Año), tarjetas de resumen (KPIs) y visualizaciones de datos (gráficos).

---

## 2. Análisis Detallado por Imagen

### Imagen 1: Estadísticas de Platos (`image_ff1be5.png`)

* **Navegación Activa:** Barra lateral -> **Platos** (resaltado en gris).
* **Filtros Seleccionados:**
    * Mes: Agosto (Desplegable muestra lista: Septiembre, Octubre, Noviembre, Diciembre).
    * Año: 2025 (Desplegable muestra lista: 2024, 2023, 2022, 2021).
* **Título del Gráfico:** "Top 5 platos más vendidos".
* **Tarjeta de Resumen (Derecha):**
    * Total platos Top 5: **963**
    * Día con más platos vendidos: **9**
    * Media de platos diaria: **28.4**
* **Visualización de Datos:**
    * **Tipo:** Gráfico de barras horizontales.
    * **Color:** Verde brillante a verde pálido (gradiente descendente).
    * **Datos (Plato: Cantidad):**
        1.  **Papas bravas:** 234
        2.  **Croquetas caseras:** 208
        3.  **Tortillita de camarones:** 197
        4.  **Gambas al ajillo:** 169
        5.  **Ensaladilla de pulpo:** 155
    * **Eje X:** "Nº de platos vendidos".

---

### Imagen 2: Estadísticas de Ticket Medio (`image_ff1bdf.png`)

* **Navegación Activa:** Barra lateral -> **Ticket** (resaltado en gris).
* **Filtros Seleccionados:**
    * Año: 2024 (Mes no aplicable/visible en esta vista anual).
* **Título del Gráfico:** "Ticket medio por mes".
* **Tarjeta de Resumen (Derecha):**
    * Media anual: **29.83**
    * Mejor mes: **Agosto**
* **Visualización de Datos:**
    * **Tipo:** Gráfico de barras verticales.
    * **Color:** Gradiente de rosa pálido a morado intenso (indicando intensidad de valor).
    * **Datos (Mes: Valor en Euros):**
        * Enero: 21.66
        * Febrero: 20.5
        * Marzo: 24.78
        * Abril: 22.65
        * Mayo: 27.32
        * Junio: 32.8 (Barra magenta)
        * Julio: 44.9 (Barra morada)
        * **Agosto: 45.45** (Pico máximo, barra morada oscura)
        * Septiembre: 38.32
        * Octubre: 31.12
        * Noviembre: 28.67
        * Diciembre: 19.78
    * **Eje Y:** "Ticket medio".
    * **Eje X:** Meses (Enero - Dic.).

---

### Imagen 3: Estadísticas de Camareros (`image_ff1bbf.png`)

* **Navegación Activa:** Barra lateral -> **Camareros** (resaltado en gris).
* **Filtros Seleccionados:**
    * Mes: Agosto.
    * Año: 2025.
    * **Filtro Adicional (Ordenar por):** "Horas trabajadas" (Desplegable muestra: Mesas atendidas, Nº de días trabajados, Propinas, Importe vendido).
* **Visualización de Datos:**
    * **Tipo:** Lista ordenada con barras de progreso visuales (sin ejes numéricos explícitos en la barra).
    * **Diseño:** Nombre a la izquierda, barra negra al centro, valor numérico a la derecha.
    * **Datos (Nombre: Horas):**
        1.  **Alba Martín:** 124 horas (Barra más larga).
        2.  **Juan Ferrol:** 118 horas.
        3.  **Pedro López:** 107 horas.
        4.  **Rocío Vélez:** 102 horas.
        5.  **Ana Carrasco:** 101 horas.
* **Elemento de UI:** Botón "Ver más" en la parte inferior de la lista.

---

### Imagen 4: Estadísticas de Proveedores (`image_ff1c00.png`)

* **Navegación Activa:** Barra lateral -> **Proveedores** (resaltado en gris).
* **Filtros Seleccionados:**
    * Mes: Agosto.
    * Año: 2025.
* **Título del Gráfico:** "Top 5 proveedores".
* **Tarjeta de Resumen (Derecha):**
    * Total gastado: **6132.43**
* **Visualización de Datos:**
    * **Tipo:** Gráfico de barras horizontales.
    * **Color:** Azul intenso a azul pálido (gradiente descendente).
    * **Datos (Proveedor: Importe en Euros):**
        1.  **LasRefrescosas:** 1244.78
        2.  **Heineken España:** 1176.32
        3.  **CashSupremo:** 1049.66
        4.  **CashAlternativo:** 987.65
        5.  **Pimientos Juanito:** 910.22
    * **Eje X:** Escala numérica (311, 622, 933, 1244).

---

### Imagen 5: Estadísticas de Reservas (`image_ff1bc5.png`)

* **Navegación Activa:** Barra lateral -> **Reservas** (resaltado en gris).
* **Filtros Seleccionados:**
    * Mes: Agosto.
    * Año: 2025.
* **Título del Gráfico:** "Reservas del mes".
* **Tarjeta de Resumen (Derecha):**
    * Reservas totales: **106**
    * Dia con más reservas: **31**
    * Media diaria: **3.4**
* **Visualización de Datos:**
    * **Tipo:** Gráfico de barras verticales agrupadas por día.
    * **Color:** Barras multicolores (Naranja, Azul, Rojo, Amarillo, Verde) sin una leyenda de color específica visible (posiblemente codificación aleatoria o por categoría de mesa).
    * **Eje Y:** "Nº de reservas".
    * **Eje X:** Días del mes (1, 5, 10, 15, 20, 25, 30).
    * **Observaciones de Datos (Valores visibles etiquetados sobre las barras):**
        * Día ~1-2: Valores 4, 6, 5.
        * Día ~8-9: Valores 3, 7, 6, 1.
        * Día ~12-14: Valores 1, 2.
        * Día ~17-18: Valores 5, 4, 9 (pico local).
        * Día ~21-23: Valores 2, 1, 7, 8 (pico local).
        * Día ~27-30: Valores 2, 1, 9, 10 (pico máximo visible el día 30).