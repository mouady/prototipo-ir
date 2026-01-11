import axios from 'axios';

const ZIPKIN_URL = process.env.ZIPKIN_URL || 'http://localhost:9411';

export async function getServices() {
    const response = await axios.get(`${ZIPKIN_URL}/api/v2/services`);
    return response.data;
}

export async function getTracesByService(serviceName, startDate, endDate, limit = 10, offset = 10) {
  
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
      lookback: offset * 60 * 1000
    };
  }
  
  const response = await axios.get(`${ZIPKIN_URL}/api/v2/traces`, {
    params: filters
  });
  return response.data;
}