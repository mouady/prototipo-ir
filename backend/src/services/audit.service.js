import auditRepository from '../repositories/audit.repository.js';
import {getTracesByService} from './zipkin.service.js';

const getAllAudits = async () => {
 return await auditRepository.findAll();
};

const getAuditById = async (id) => {
 return await auditRepository.findByAuditId(id);
};

const auditTraces = async (limit) => {
 const traces = await getTracesByService('prototipo-ir', limit);
 
 const relevantTraces = traces.flatMap(trace => {
  return trace.filter(span => {
   if (!span.tags) return false;
   const httpRoute = span.tags['http.route'];
   return httpRoute && httpRoute.startsWith('/');
  });
 });
 
 const tracesWithHighDuration = relevantTraces.filter(span => (span.duration || 0) >= 200000);
 const totalTraces = relevantTraces.length;
 const ratioWithHighDuration = totalTraces === 0 ? 0 : tracesWithHighDuration.length / totalTraces;

 const auditRecord = {
  auditId: `audit-${Date.now()}`,
  createdAt: new Date(),
  compliant: ratioWithHighDuration === 0,
  metadata: {
   totalTraces: totalTraces,
   tracesWithHighDuration: tracesWithHighDuration.length,
   ratioWithHighDuration: ratioWithHighDuration,
   thresholdMs: 200,
   operation: 'duration < 200ms for traces with http.route / and derivatives'
  },
  evidences: tracesWithHighDuration
 };

 const auditCreated = await auditRepository.create(auditRecord);
 return auditCreated;
};

export default {
 getAllAudits,
 getAuditById,
 auditTraces,
};