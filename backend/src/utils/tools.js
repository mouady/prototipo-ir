import * as zipkinService from '../services/zipkin.service.js';
import auditService from '../services/audit.service.js';

const MAX_ITERATIONS = parseInt(process.env.MAX_ITERATIONS || '5');
const DEFAULT_TRACE_LIMIT = parseInt(process.env.DEFAULT_TRACE_LIMIT || '10');
const DEFAULT_LOOKBACK_MINUTES = parseInt(process.env.DEFAULT_LOOKBACK_MINUTES || '15');
const DEFAULT_THRESHOLD_MS = parseInt(process.env.DEFAULT_THRESHOLD_MS || '200');

export const SYSTEM_PROMPT = 
`Eres un asistente experto en análisis de trazas y auditorías de rendimiento.
Tienes acceso a herramientas para:
- Consultar servicios registrados en Zipkin
- Obtener trazas de servicios específicos
- Crear y consultar audits de rendimiento

A tener en cuenta:
- Usa estas herramientas cuando el usuario te pida información sobre servicios, trazas o rendimiento.
- Si hay una pregunta sobre trazas y no se especifica el servicio, comprobar que esta disponible 'prototipo-ir' y usarlo por defecto.
- Dispones de un maximo de ${MAX_ITERATIONS} llamadas a funciones por interacción.


Responde siempre en español y de forma clara, estructurada y concisa.
`;

export const tools = [
    {
        type: 'function',
        name: 'get_services',
        description: 'Obtiene la lista de servicios registrados en Zipkin',
        parameters: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        type: 'function',
        name: 'get_traces_by_service',
        description: 'Obtiene las trazas de un servicio específico con filtrado opcional por rango de fechas',
        parameters: {
            type: 'object',
            properties: {
                serviceName: {
                    type: 'string',
                    description: 'Nombre del servicio.'
                },
                startDate: {
                    type: 'string',
                    description: 'Fecha de inicio en formato ISO8601 (opcional)'
                },
                endDate: {
                    type: 'string',
                    description: 'Fecha de fin en formato ISO8601 (opcional)'
                },
                limit: {
                    type: 'number',
                    description: `Número máximo de trazas a retornar (default: ${DEFAULT_TRACE_LIMIT})`
                },
                lookbackMinutes: {
                    type: 'number',
                    description: `Tiempo hacia atrás desde ahora en minutos (default: ${DEFAULT_LOOKBACK_MINUTES})`
                }
            },
            required: ['serviceName']
        }
    },
    {
        type: 'function',
        name: 'get_all_audits',
        description: 'Obtiene la lista de todos los audits de rendimiento realizados',
        parameters: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        type: 'function',
        name: 'get_audit_by_id',
        description: 'Obtiene los detalles de un audit específico por su ID',
        parameters: {
            type: 'object',
            properties: {
                auditId: {
                    type: 'string',
                    description: 'ID del audit a recuperar'
                }
            },
            required: ['auditId']
        }
    },
    {
        type: 'function',
        name: 'create_audit_traces',
        description: 'Crea un audit de rendimiento analizando las trazas en un rango de fechas y comparando su duración contra un threshold',
        parameters: {
            type: 'object',
            properties: {
                startDate: {
                    type: 'string',
                    description: 'Fecha de inicio en formato ISO8601 (opcional)'
                },
                endDate: {
                    type: 'string',
                    description: 'Fecha de fin en formato ISO8601 (opcional)'
                },
                limit: {
                    type: 'number',
                    description: `Número máximo de trazas a analizar (default: ${DEFAULT_TRACE_LIMIT})`
                },
                lookbackMinutes: {
                    type: 'number',
                    description: `Tiempo hacia atrás desde ahora en minutos (default: ${DEFAULT_LOOKBACK_MINUTES})`
                },
                thresholdMs: {
                    type: 'number',
                    description: `Threshold de duración en milisegundos (default: ${DEFAULT_THRESHOLD_MS})`
                }
            },
            required: []
        }
    }
];

export const callFunction = async (functionName, args) => {
    try {
        switch (functionName) {
            case 'get_services':
                return await zipkinService.getServices();
            
            case 'get_traces_by_service':
                return await zipkinService.getTracesByService(
                    args.serviceName,
                    args.startDate,
                    args.endDate,
                    args.limit,
                    args.lookbackMinutes
                );
            
            case 'get_all_audits':
                return await auditService.getAllAudits();
            
            case 'get_audit_by_id':
                return await auditService.getAuditById(args.auditId);
            
            case 'create_audit_traces':
                return await auditService.auditTraces(
                    args.startDate,
                    args.endDate,
                    args.limit,
                    args.lookbackMinutes,
                    args.thresholdMs
                );
            
            default:
                throw new Error(`Función desconocida: ${functionName}`);
        }
    } catch (error) {
        console.error(`Error ejecutando función ${functionName}:`, error);
        return { error: error.message };
    }
};