import { registerOTel } from '@vercel/otel'
 
export function register() {
  registerOTel({ serviceName: 'prototipo-ir-otel' })
}