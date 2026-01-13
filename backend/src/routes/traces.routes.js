import { Router } from "express";
import {getServices, getTracesByService}  from '../controllers/traces.controller.js';
import { validateDates } from "../../middlewares/traces.middleware.js";

const tracesRouter = Router();

tracesRouter.get('/traces/services', getServices);
tracesRouter.get('/traces/service/:serviceName', validateDates, getTracesByService);

export { tracesRouter };