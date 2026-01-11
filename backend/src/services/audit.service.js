import auditRepository from '../repositories/audit.repository.js';
import {getTracesByService} from './zipkin.service.js';

const getAllAudits = async () => {
 return await auditRepository.findAll();
};

const getAuditById = async (id) => {
 return await auditRepository.findByAuditId(id);
};

const auditTraces = async (startDate, endDate, limit, offset) => {
 const traces = await getTracesByService('prototipo-ir', startDate, endDate, limit, offset);
 
 const relevantTraces = traces.flatMap(trace => {
  return trace.filter(span => {
   if (!span.tags) return false;
   const httpRoute = span.tags['http.route'];
   return httpRoute && httpRoute.startsWith('/');
  });
 });

 const totalTraces = relevantTraces.length;
 const LowDurationTraces = relevantTraces.filter(span => (span.duration || 0) <= 200000);
 const ratioWithLowDuration = totalTraces === 0 ? 0 : LowDurationTraces.length / totalTraces;

 const auditRecord = {
  auditId: `audit-${Date.now()}`,
  createdAt: new Date(),
  compliant: ratioWithLowDuration === 0,
  metadata: {
   totalTraces: totalTraces,
   tracesWithLowDuration: LowDurationTraces.length,
   ratioWithLowDuration: ratioWithLowDuration,
   thresholdMs: 200,
   operation: 'duration < 200ms for traces with http.route / and derivatives'
  },
  evidences: LowDurationTraces
 };

 const auditCreated = await auditRepository.create(auditRecord);
 return auditCreated;
};

export default {
 getAllAudits,
 getAuditById,
 auditTraces,
};