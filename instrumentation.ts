import { registerOTel } from '@vercel/otel'
 
export function register() {
  console.log('[OPENTELEMETRY] Registering instrumentation')
  registerOTel({ serviceName: 'prototipo-ir' })
}