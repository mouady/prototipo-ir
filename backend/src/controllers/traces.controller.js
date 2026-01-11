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
        const { startDate, endDate, limit, offset } = req.query;
        
        const traces = await zipkinService.getTracesByService(
            serviceName, 
            startDate,
            endDate,
            limit ? parseInt(limit) : undefined,
            offset ? parseInt(offset) : undefined
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

export const searchTraces = async (req, res) => {
    try {
        const filters = {
            serviceName: req.query.serviceName,
            spanName: req.query.spanName,
            minDuration: req.query.minDuration ? parseInt(req.query.minDuration) : undefined,
            maxDuration: req.query.maxDuration ? parseInt(req.query.maxDuration) : undefined,
            endTs: req.query.endTs ? parseInt(req.query.endTs) : undefined,
            lookback: req.query.lookback ? parseInt(req.query.lookback) : undefined,
            limit: req.query.limit ? parseInt(req.query.limit) : undefined
        };
        
        const traces = await zipkinService.searchTraces(filters);
        
        res.json({
            traces: traces,
            count: traces.length,
            filters: filters
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al buscar trazas',
            error: error.message
        });
    }
};
