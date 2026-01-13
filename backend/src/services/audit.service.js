import auditRepository from '../repositories/audit.repository.js';
import {getTracesByService} from './zipkin.service.js';

const DEFAULT_THRESHOLD_MS = parseInt(process.env.DEFAULT_THRESHOLD_MS || '200');

const getAllAudits = async () => {
 return await auditRepository.findAll();
};

const getAuditById = async (id) => {
 return await auditRepository.findByAuditId(id);
};

const auditTraces = async (startDate, endDate, limit, lookbackMinutes, thresholdMs = DEFAULT_THRESHOLD_MS) => {
 const traces = await getTracesByService('prototipo-ir', startDate, endDate, limit, lookbackMinutes);
 
 const relevantTraces = traces.flatMap(trace => {
  return trace.filter(span => {
   if (!span.tags) return false;
   const httpRoute = span.tags['http.target'];
   return httpRoute && httpRoute.startsWith('/');
  });
 });

 const totalTraces = relevantTraces.length;
 const thresholdMicroseconds = thresholdMs * 1000;
 const belowThresholdTraces = relevantTraces.filter(span => (span.duration || 0) <= thresholdMicroseconds);
 const ratioBelowThreshold = totalTraces === 0 ? 0 : belowThresholdTraces.length / totalTraces;

 const filters = {};
 if (startDate !== undefined) filters.startDate = startDate;
 if (endDate !== undefined) filters.endDate = endDate;
 if (limit !== undefined) filters.limit = limit;
 if (lookbackMinutes !== undefined) filters.lookbackMinutes = lookbackMinutes;

 // Información sobre filters + Descrición de la operación
 let operationDescription = `duration < ${thresholdMs}ms for all traces`;
 const filterParts = [];
 if (lookbackMinutes !== undefined) filterParts.push(`last ${lookbackMinutes} minutes`);
 if (startDate !== (undefined || '') && endDate !== (undefined || '')) filterParts.push(`from ${startDate} to ${endDate}`);
 if (limit !== undefined) filterParts.push(`limit: ${limit}`);
 if (filterParts.length > 0) {
  operationDescription += ` (${filterParts.join(', ')})`;
 }

 const auditRecord = {
  auditId: `audit-${Date.now()}`,
  createdAt: new Date(),
  compliant: ratioBelowThreshold === 1,
  metadata: {
   totalTraces: totalTraces,
   tracesBelowThreshold: belowThresholdTraces.length,
   ratioBelowThreshold: ratioBelowThreshold,
   thresholdMs: thresholdMs,
   operation: operationDescription,
   filters: filters
  },
  evidences: belowThresholdTraces
 };

 const auditCreated = await auditRepository.create(auditRecord);
 return auditCreated;
};

export default {
 getAllAudits,
 getAuditById,
 auditTraces,
};