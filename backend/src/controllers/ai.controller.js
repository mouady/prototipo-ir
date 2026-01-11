import { generateText } from '../services/ollama.service.js';
import {metrics} from '@opentelemetry/api'

const meter = metrics.getMeter('ai-controller-meter');
const model = process.env.OLLAMA_MODEL || 'gemma3:4b';

// Propongo tres métricas de las cuales 2 de ellas usan las semantic conventions.
// https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-metrics/


const numberOfRequestsInProgress = meter.createUpDownCounter('ai.requests.in_progress', {
    description: 'Number of AI requests currently being processed',
    unit: 'requests',
});

const operationDuration = meter.createHistogram('gen_ai.client.operation.duration', {
    description: 'Duration of AI operations',
    unit: 's'
});

const tokenUsage = meter.createHistogram('gen_ai.client.token.usage', {
    description: 'Number of input and output tokens used.',
    unit: '{token}'
});

// Atributos requeridos según Semantic Conventions
    const attributes = {
        'gen_ai.operation.name': 'chat', 
        'gen_ai.provider.name': 'ollama',
        'gen_ai.token.type': 'input',
        'gen_ai.request.model': `${process.env.OLLAMA_MODEL}` || 'No model info available.', 
    };

export const generateAIResponse = async (req, res) => {
    const startTime = Date.now();
    numberOfRequestsInProgress.add(1);
    
    try {
        const { prompt } = req.body;
        const aiResponse = await generateText(prompt);
        
        // Duration
        const duration = Date.now() - startTime;
        operationDuration.record(duration, attributes);

        // Tokens 
        if (aiResponse.tokens) {
            tokenUsage.record(aiResponse.tokens, attributes);
        }

        res.status(200).json({ response: aiResponse });
    } catch (error) {
        const duration = Date.now() - startTime;
        operationDuration.record(duration, attributes);
        
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    } finally {
        numberOfRequestsInProgress.add(-1);
    }
};