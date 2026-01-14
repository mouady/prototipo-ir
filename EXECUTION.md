# EXECUTION.md - DevDays 2025-26

### Configurar variables de entorno:
En la carpeta raíz, duplicar `.env.example` y renombrarlo a `.env`. Ajusta las variables si es necesario:
```bash
# Base path for the application (used for GitHub Pages or subdirectory deployments)
# Set this to match the basePath in next.config.ts
NEXT_PUBLIC_BASE_PATH=/prototipo-ir
NEXT_OTEL_VERBOSE=0
```

Aparte, en la carpeta `backend/`, duplicar `.env.example` y renombrarlo a `.env`. Ajusta las variables si es necesario:

```bash
PORT=4000
MONGO_URI=mongodb://localhost:27017/prototipo-ir
ZIPKIN_URL=http://localhost:9411
OPENAI_MODEL=gpt-5-mini
OPENAI_API_KEY=

# Configurar el número máximo de llamadas a tools en una sola interacción
MAX_ITERATIONS=5

# Valores por defecto para las trazas
DEFAULT_TRACE_LIMIT=10
DEFAULT_LOOKBACK_MINUTES=15
DEFAULT_THRESHOLD_MS=200
```

### Frontend (Prototipo-IR)

```
npm install && npm run dev
```

Si todo sale bien, deberías ver:
```
C:\Users\usmohamed\git\prototipo-ir> npm run dev
> prototipo-ir@0.1.0 dev
> next dev

▲ Next.js 16.1.0 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://100.111.22.75:3000
- Environments: .env

✓ Starting...
[OPENTELEMETRY] Registering instrumentation
✓ Ready in 1643ms
```
### Backend (API para trazas de Prototipo-IR, auditorías y chatbot)

> ⚠️ **Atención**: Levantar los contenedores descritos en `opentelemetry-collector-dev-setup-main\docker-compose.yaml` antes de iniciar el backend y tener parado todos los contenedores del proyecto base para evitar conflictos de puertos.

```
cd backend && npm install && npm run dev
```
Si todo sale bien, deberías ver:
```
Restarting './src/server.js'
Server is running on http://localhost:4000
API docs available at http://localhost:4000/docs
MongoDB Connected: mongodb://localhost:27017/prototipo-ir.
```

### En cuanto a las pruebas:
El flujo de cómo realizar llamadas (sobre todo de cara al chatbot) se encuentra descrito en `DELIVERABLES.md` y en el video de demostración.

### Nota a tener en cuenta:

- **Latencia en Zipkin**: Las trazas pueden tardar unos segundos en aparecer en Zipkin tras generarlas. Actualiza la página si no ves datos inmediatamente.
- **Reinicio del servidor en Postman**: Si el servidor se reinicia durante una petición en Postman y recibes un error, simplemente reintenta la petición.
