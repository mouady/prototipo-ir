import { Router } from "express";
import {getServices, getTracesByService, searchTraces}  from '../controllers/traces.controller.js';

const tracesRouter = Router();

tracesRouter.get('/traces/services', getServices);
tracesRouter.get('/traces/service/:serviceName', getTracesByService);

tracesRouter.get('/traces/search', searchTraces);

export { tracesRouter };