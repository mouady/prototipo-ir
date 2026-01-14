# DELIVERABLES - DevDays 2025-26

## ⚠️ Importante

> **ADVERTENCIA**: Los retos han sido desarrollados en **dos repositorios separados**. Esto es debido a que para realizar la propuesta 1 de nivel 2 se instrumentó un frontend llamado 'Prototipo-IR'. A continuación se especifica dónde encontrar cada grupo de retos:

| Repositorio | Contenido | URL |
|:---|:---|:---|
| **Proyecto Base** | Nivel 0 (N0-1) + Nivel 1 (N1-2, N1-3) | [mouady/devdays](https://github.com/mouady/devdays) |
| **Prototipo-IR** | Nivel 2 Propuesta 1 (N2-P1-A, N2-P1-B, N2-P1-C) + Extra (N2-EX-1) | [mouady/prototipo-ir](https://github.com/mouady/prototipo-ir) |

---

## 📊 Retos Realizados

| NIVEL 0 | NIVEL 1 | NIVEL 2 | EXTRA |
|:---:|:---:|:---:|:---:|
| Completado con las modificaciones propuestas. | **N1-2**  | **N2-P1-A**  | **N2-EX-1** |
| | **N1-3** | **N2-P1-B**  | |
| | | **N2-P1-C**  | |


## Sobre cómo se han completado los retos en este proyecto:

## NIVEL 2 - Propuesta 1

Para la realización de esta propuesta he decidido instrumentar un prototipo funcional vibe-codeado que realicé para la asignatura de Ingeniería de Requisitos. Con esto pretendemos demostrar cómo de bueno puede llegar a ser el rendimiento de este tipo de aplicaciones al medir los tiempos de renderizado mediante trazas.

#### ¿Cómo podemos instrumentar un frontend hecho con NextJS?

Mediante `@vercel/otel` podemos obtener información sobre las trazas a la hora de acceder a distintas rutas de forma automática.

> ⚠️ **IMPORTANTE**
>
> - **Prototipo-ir** es un frontend que no realiza peticiones a ningún backend. Todos los datos que usa son simulados.
> - El directorio `backend`, en prototipo-ir hace referencia a una API en Express.js similar a la del proyecto base que nos sirve para realizar los retos de esta propuesta.
> - De cara a iniciar los contenedores necesarios, se usa el `docker-compose.yaml` del directorio `opentelemetry-collector-dev-setup-main`.
> - Se proporciona colección de pruebas Postman + documentación en Swagger en el repositorio para replicar los resultados que se describen a continuación.

## 1️⃣ N2-P1-A: Generar trazas con @vercel/otel

**Implementación**: Se configuró OpenTelemetry en el frontend Next.js 15 utilizando `@vercel/otel`, y se creó una API en Express.js para consultar las trazas almacenadas en Zipkin.

**Archivos modificados/creados**:
- [instrumentation.ts](instrumentation.ts) - Configuración de OpenTelemetry para Next.js
- [backend/src/routes/traces.routes.js](backend/src/routes/traces.routes.js) - Definición de rutas para consultar trazas
- [backend/src/controllers/traces.controller.js](backend/src/controllers/traces.controller.js) - Controladores `getServices()` y `getTracesByService()`
- [backend/src/services/zipkin.service.js](backend/src/services/zipkin.service.js) - Lógica de integración con Zipkin API
- [backend/src/middlewares/traces.middleware.js](backend/src/middlewares/traces.middleware.js) - Middleware `validateDates` para validación de parámetros

**Configuración de OpenTelemetry en Next.js**:

En [instrumentation.ts](instrumentation.ts) se registra OpenTelemetry con un nombre de servicio:

```typescript
import { registerOTel } from '@vercel/otel'
 
export function register() {
  console.log('[OPENTELEMETRY] Registering instrumentation')
  registerOTel({ serviceName: 'prototipo-ir' })
}
```

Esta configuración permite que Next.js automáticamente genere trazas cada vez que navegamos entre rutas. Para visualizar las trazas:
1. Acceder a `http://localhost:3000/prototipo-ir`
2. Navegar entre las distintas rutas del prototipo (camarero, cocinero, gerente, etc.)
3. Ver las trazas generadas en `http://localhost:9411/zipkin/`

**API para consultar trazas**:

Se crearon dos endpoints principales:

- `GET /api/v1/traces/services` - Lista todos los servicios registrados en Zipkin
- `GET /api/v1/traces/service/:serviceName` - Obtiene trazas de un servicio específico con filtros

**Middleware de validación `validateDates`**:

El middleware utiliza `express-validator` para validar los parámetros de consulta y garantiza que:
- Las fechas estén en formato ISO8601 válido
- La `endDate` sea posterior a `startDate`, evitando rangos temporales inválidos

```javascript
.custom((endDate, { req }) => {
    if (req.query.startDate && endDate) {
        const start = new Date(req.query.startDate);
        const end = new Date(endDate);
        if (start >= end) {
            throw new Error('endDate debe ser posterior a startDate');
        }
    }
    return true;
})
```

**Lógica de `getTracesByService` y filtros disponibles**:

El servicio [zipkin.service.js](backend/src/services/zipkin.service.js) implementa la lógica para consultar trazas con dos modos de operación:

1. **Con rango de fechas explícito** (`startDate` y `endDate`):
   ```javascript
   filters = {
     serviceName,
     limit,
     endTs: new Date(endDate).getTime(),
     lookback: new Date(endDate).getTime() - new Date(startDate).getTime()
   };
   ```

2. **Con tiempo relativo** (si no se especifican fechas):
   ```javascript
   filters = {
     serviceName,
     limit,
     lookback: lookbackMinutes * 60 * 1000
   };
   ```

**Parámetros de consulta disponibles**:
- `startDate` (opcional): Fecha de inicio en formato ISO8601
- `endDate` (opcional): Fecha de fin en formato ISO8601
- `limit` (opcional): Número máximo de trazas a retornar (por defecto: 10)
- `lookbackMinutes` (opcional): Minutos hacia atrás desde ahora (por defecto: 15, solo si no se especifican fechas)

**Pruebas y documentación**:

Se proporciona en el repositorio:
- Colección de Postman ([mouady_prototipo_ir.postman_collection.json](mouady_prototipo_ir.postman_collection.json)) con ejemplos de todas las peticiones
- Documentación Swagger en [backend/src/docs/openapi.yaml](backend/src/docs/openapi.yaml) accesible en el endpoint `/api-docs`

**Justificación**: La instrumentación automática con `@vercel/otel` permite medir los tiempos de renderizado de rutas en Next.js sin código adicional. Los filtros variados de `getTracesByService` permiten generar diferentes auditorías sobre los datos recopilados.

## 2️⃣ N2-P1-B: Auditoría sobre ANS/SLA

**Implementación**: Se construyó un servicio de auditoría que analiza trazas de Zipkin y valida su duración frente a un umbral (`thresholdMs`) para evaluar el cumplimiento de ANS/SLA.

**Archivos involucrados**:
- [backend/src/services/audit.service.js](backend/src/services/audit.service.js) – Lógica principal `auditTraces()`
- [backend/src/controllers/audit.controller.js](backend/src/controllers/audit.controller.js) – Endpoints y manejo de peticiones
- [backend/src/repositories/audit.repository.js](backend/src/repositories/audit.repository.js) – Persistencia en MongoDB
- [backend/src/models/audit.model.js](backend/src/models/audit.model.js) – Esquema del documento `Audit`
- [backend/src/routes/audit.routes.js](backend/src/routes/audit.routes.js) – Rutas REST (`/audits`, `/audits/:auditId`, `/audits/traces`)

**Servicio `auditTraces()`**:
- Obtiene trazas del servicio por defecto `prototipo-ir` utilizando `getTracesByService()` de [backend/src/services/zipkin.service.js](backend/src/services/zipkin.service.js).
- Filtra spans relevantes de rutas HTTP (`span.tags['http.target']` que empiezan por `/`).
- Calcula el número total de spans y los que están por debajo del umbral de duración (`thresholdMs`, convertido a microsegundos). También calcula el ratio de cumplimiento.
- Genera un `auditRecord` con:
  - `auditId`, `createdAt`, `compliant` (true si todas las trazas cumplen)
  - `metadata`: `totalTraces`, `tracesBelowThreshold`, `ratioBelowThreshold`, `thresholdMs`, `operation` (descripción), `filters` aplicados
  - `evidences`: lista de spans que cumplen el criterio
- Persiste el `auditRecord` mediante el repositorio y devuelve el documento creado.

**Validación de fechas**:
- El endpoint `POST /api/v1/audits/traces` usa `validateDates` de [backend/src/middlewares/traces.middleware.js](backend/src/middlewares/traces.middleware.js) para asegurar que `endDate` sea posterior a `startDate` y que las fechas sean ISO8601.

**Pruebas y documentación**:
- Colección Postman: [mouady_prototipo_ir.postman_collection.json](mouady_prototipo_ir.postman_collection.json)
- Swagger: [backend/src/docs/openapi.yaml](backend/src/docs/openapi.yaml) con endpoints:
  - `GET /api/v1/audits`
  - `GET /api/v1/audits/{auditId}`
  - `POST /api/v1/audits/traces`

## 3️⃣ N2-P1-C: Chatbot

**Implementación**: Se integró la Conversations API de OpenAI para mantener el contexto entre mensajes y se habilitó Function/Tool Calling para que el asistente invoque funciones de negocio (consultar trazas, crear audits, etc.).

**Archivos involucrados**:
- [backend/src/services/openai.service.js](backend/src/services/openai.service.js) – Servicios `createConversation()`, `generateTextWithConversation()` y utilidades adicionales
- [backend/src/controllers/ai.controller.js](backend/src/controllers/ai.controller.js) – Endpoints REST
- [backend/src/routes/ai.routes.js](backend/src/routes/ai.routes.js) – Rutas: creación, generación, recuperación de conversación y estructuración de diagramas
- [backend/src/utils/tools.js](backend/src/utils/tools.js) – Definición de `SYSTEM_PROMPT`, `tools` y `callFunction`

**`createConversation()`**:
- Crea una conversación y almacena el `SYSTEM_PROMPT` como primer mensaje para orientar al asistente.
- Devuelve el `conversationId` para usarlo en interacciones posteriores.

**`generateTextWithConversation(input, conversationId)`**:
- Envía el mensaje del usuario, habilitando `tools` para Function Calling.
- Itera la respuesta: si la IA devuelve `function_call`, ejecuta `callFunction()` con los argumentos, añade la salida como `function_call_output` y vuelve a pedir respuesta, hasta un máximo configurable (`MAX_ITERATIONS`).
- Retorna `output_text`, `usage` y el `conversationId`.

**`tools.js`**:
- `SYSTEM_PROMPT`: guía al asistente para auditar rendimiento y consultar trazas (en español, con límites de iteraciones).
- `tools`: funciones invocables por la IA, entre ellas:
  - `get_services`, `get_traces_by_service`
  - `get_all_audits`, `get_audit_by_id`, `create_audit_traces`
- `callFunction(name, args)`: enruta las llamadas hacia `zipkin.service` y `audit.service`.

**Flujo de uso (endpoints)**:
- Crear conversación: `POST /api/v1/ai/conversations` → devuelve `conversationId`.
- Conversar con contexto: `POST /api/v1/ai/conversations/generate` con `input` y (opcional) `conversationId`.
- Recuperar una conversación: `GET /api/v1/ai/conversations/:conversationId`.

**Pruebas y documentación**:
- Colección Postman y Swagger en [backend/src/docs/openapi.yaml](backend/src/docs/openapi.yaml) con los endpoints anteriores.

## 4️⃣ N2-EX-1 - Reto Extra

**Implementación**: Se añadió una capacidad para convertir un diagrama UML en una estructura JSON tipada y validada mediante Zod, usando la Responses API de OpenAI y su integración con `zodTextFormat`. El resultado se persiste en MongoDB con metadatos para trazabilidad.

**Archivos involucrados**:
- [backend/src/services/openai.service.js](backend/src/services/openai.service.js) – Función `UMLdiagram2structuredResponse()` que define el esquema Zod y usa `zodTextFormat` para validar y parsear la salida de IA.
- [backend/src/repositories/diagram.repository.js](backend/src/repositories/diagram.repository.js) – Persistencia del diagrama estructurado.
- [backend/src/models/diagram.model.js](backend/src/models/diagram.model.js) – Esquema Mongoose con `diagramId`, `createdAt`, `diagramName`, `classes`, `relationships`.
- [backend/src/routes/ai.routes.js](backend/src/routes/ai.routes.js) y [backend/src/controllers/ai.controller.js](backend/src/controllers/ai.controller.js) – Endpoint `POST /api/v1/ai/diagram`.

**Esquema con Zod**:
- Se define un objeto `UMLStructure` que tipa `diagramName`, `classes` (con `attributes` y `methods`) y `relationships`.
- Beneficios: validación fuerte, errores claros si falta algún campo, y contrato estable entre IA y backend.

**Uso de `zodTextFormat`**:
- En [backend/src/services/openai.service.js](backend/src/services/openai.service.js) se invoca `openai.responses.parse()` con `text: { format: zodTextFormat(UMLStructure, "event") }`.
- Esto fuerza a que la salida de la IA cumpla el esquema y la devuelve ya parseada. Si la IA produce un formato inválido, se obtiene un error de validación en lugar de datos inconsistentes.

**`diagramId` y `createdAt`**:
- Se añaden antes de persistir para garantizar: (1) identificador único (`diagram-<timestamp>`) y (2) ordenación temporal y auditoría.
- Ver modelo en [backend/src/models/diagram.model.js](backend/src/models/diagram.model.js) y guardado en [backend/src/repositories/diagram.repository.js](backend/src/repositories/diagram.repository.js).

**Endpoint y flujo**:
- `POST /api/v1/ai/diagram` con cuerpo `{ umlDiagram: "..." }`.
- El servicio valida y estructura el diagrama y devuelve el documento almacenado con su `diagramId`.

**Pruebas y documentación**:
- Colección Postman: [mouady_prototipo_ir.postman_collection.json](mouady_prototipo_ir.postman_collection.json)
- Swagger: definición del endpoint en [backend/src/docs/openapi.yaml](backend/src/docs/openapi.yaml)