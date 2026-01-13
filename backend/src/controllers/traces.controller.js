import * as zipkinService from '../services/zipkin.service.js';

export const getServices = async (req, res) => {
    try {
        const services = await zipkinService.getServices();
        
        res.json({
            services: services,
            count: services.length
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener servicios',
            error: error.message
        });
    }
};

export const getTracesByService = async (req, res) => {
    try {
        const { serviceName } = req.params;
        const { startDate, endDate, limit, lookbackMinutes } = req.query;
        
        const traces = await zipkinService.getTracesByService(
            serviceName, 
            startDate,
            endDate,
            limit ? parseInt(limit) : undefined,
            lookbackMinutes ? parseInt(lookbackMinutes) : undefined
        );
        
        res.json({
            traces: traces,
            count: traces.length
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener trazas del servicio',
            error: error.message
        });
    }
};

