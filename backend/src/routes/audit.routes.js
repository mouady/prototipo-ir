import { Router } from "express";
import { getAllAudits, getAuditById, auditTraces } from "../controllers/audit.controller.js";
import { validateDates } from "../middlewares/traces.middleware.js";

const auditRouter = Router();

auditRouter.get('/audits', getAllAudits);
auditRouter.get('/audits/:auditId', getAuditById);
auditRouter.post('/audits/traces', validateDates, auditTraces);

export { auditRouter };