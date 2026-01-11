import express from 'express';
import { auditRouter } from './routes/audit.routes.js';
import { aiRouter } from './routes/ai.routes.js';
import { tracesRouter } from './routes/traces.routes.js';
import swaggerUi from 'swagger-ui-express';
import { bundle } from '@readme/openapi-parser';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('APP: Prototipo IR Backend is running');
});


app.use('/api/v1', auditRouter);
app.use('/api/v1', aiRouter);
app.use('/api/v1', tracesRouter);

// Bundle OpenAPI and set up Swagger UI
bundle('src/docs/openapi.yaml')
    .then((api) => {
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(api));
    })
    .catch((err) => {
        console.error('Error loading OpenAPI document:', err);
    });


export default app;