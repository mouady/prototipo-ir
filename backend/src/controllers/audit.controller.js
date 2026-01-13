import auditService from '../services/audit.service.js';

const DEFAULT_THRESHOLD_MS = parseInt(process.env.DEFAULT_THRESHOLD_MS || '200');

export const getAllAudits = async (req, res) => {
 try {
  const audits = await auditService.getAllAudits();
  res.status(200).json(audits);
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error'});
 }
};

export const getAuditById = async (req, res) => {
 const auditId = req.params.auditId;
 try {
  const audit = await auditService.getAuditById(auditId);
  if (!audit) {return res.status(404).json({ message: 'Audit not found' });}
  res.status(200).json(audit);
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error'});
 }
};

export const auditTraces = async (req, res) => {
 try {
  const { lookbackMinutes, startDate, endDate, limit, thresholdMs } = req.query;
  const tracesAudit = await auditService.auditTraces(
            startDate,
            endDate,
            limit ? parseInt(limit) : undefined,
            lookbackMinutes ? parseInt(lookbackMinutes) : undefined,
            thresholdMs ? parseInt(thresholdMs) : DEFAULT_THRESHOLD_MS);
  res.status(200).json(tracesAudit);
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
 }
};