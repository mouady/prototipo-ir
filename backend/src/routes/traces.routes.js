import { Router } from "express";
import {getServices, getTracesByService, searchTraces}  from '../controllers/traces.controller.js';
import { validateDates } from "../../middlewares/traces.middleware.js";

const tracesRouter = Router();

tracesRouter.get('/traces/services', getServices);
tracesRouter.get('/traces/service/:serviceName', validateDates, getTracesByService);

tracesRouter.get('/traces/search', searchTraces);

export { tracesRouter };