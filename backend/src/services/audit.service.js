import auditRepository from '../repositories/audit.repository.js';
import {getTracesByService} from './zipkin.service.js';

const getAllAudits = async () => {
 return await auditRepository.findAll();
};

const getAuditById = async (id) => {
 return await auditRepository.findByAuditId(id);
};

const auditTraces = async (startDate, endDate, limit, offset, thresholdMs = 200) => {
 const traces = await getTracesByService('prototipo-ir', startDate, endDate, limit, offset);
 
 const relevantTraces = traces.flatMap(trace => {
  return trace.filter(span => {
   if (!span.tags) return false;
   const httpRoute = span.tags['http.route'];
   return httpRoute && httpRoute.startsWith('/');
  });
 });

 const totalTraces = relevantTraces.length;
 const thresholdMicroseconds = thresholdMs * 1000;
 const belowThresholdTraces = relevantTraces.filter(span => (span.duration || 0) <= thresholdMicroseconds);
 const ratioBelowThreshold = totalTraces === 0 ? 0 : belowThresholdTraces.length / totalTraces;

 const auditRecord = {
  auditId: `audit-${Date.now()}`,
  createdAt: new Date(),
  compliant: ratioBelowThreshold === 1,
  metadata: {
   totalTraces: totalTraces,
   tracesBelowThreshold: belowThresholdTraces.length,
   ratioBelowThreshold: ratioBelowThreshold,
   thresholdMs: thresholdMs,
   operation: `duration < ${thresholdMs}ms for traces with http.route / and derivatives`
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