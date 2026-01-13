import axios from 'axios';

const ZIPKIN_URL = process.env.ZIPKIN_URL || 'http://localhost:9411';
const DEFAULT_TRACE_LIMIT = parseInt(process.env.DEFAULT_TRACE_LIMIT || '10');
const DEFAULT_LOOKBACK_MINUTES = parseInt(process.env.DEFAULT_LOOKBACK_MINUTES || '15');

export async function getServices() {
    const response = await axios.get(`${ZIPKIN_URL}/api/v2/services`);
    return response.data;
}

export async function getTracesByService(serviceName, startDate, endDate, limit = DEFAULT_TRACE_LIMIT, lookbackMinutes = DEFAULT_LOOKBACK_MINUTES) {
  
  let filters = {
    serviceName,
    limit
  };

  if (startDate && endDate) {
    filters = {
      ...filters,
      endTs: new Date(endDate).getTime(),
      lookback: new Date(endDate).getTime() - new Date(startDate).getTime()
    };
  } else {
    filters = {
      ...filters,
      lookback: lookbackMinutes * 60 * 1000
    };
  }
  
  const response = await axios.get(`${ZIPKIN_URL}/api/v2/traces`, {
    params: filters
  });
  return response.data;
}