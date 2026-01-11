import axios from 'axios';

const ZIPKIN_URL = process.env.ZIPKIN_URL || 'http://localhost:9411';

export async function getServices() {
    const response = await axios.get(`${ZIPKIN_URL}/api/v2/services`);
    return response.data;
}

export async function getTracesByService(serviceName, limit = 10) {
    const response = await axios.get(`${ZIPKIN_URL}/api/v2/traces`, {
      params: {
        serviceName,
        limit
      }
    });
    return response.data;
}
    
export async function searchTraces(filters) {
    const { serviceName, spanName, minDuration, maxDuration, endTs, lookback, limit } = filters;
    const response = await axios.get(`${ZIPKIN_URL}/api/v2/traces`, {
      params: {
        serviceName,
        spanName,
        minDuration,
        maxDuration,
        endTs: endTs || Date.now(),
        lookback: lookback || 3600000, // 1 hora por defecto
        limit: limit || 10
      }
    });
    return response.data;
}

