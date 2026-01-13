import { createNewConversation, generateAIResponseWithConversation, retrieveConversation, structuredDiagram } from '../controllers/ai.controller.js';
import { Router } from 'express';

const aiRouter = Router();

aiRouter.post('/ai/conversations', createNewConversation);
aiRouter.post('/ai/conversations/generate', generateAIResponseWithConversation);
aiRouter.get('/ai/conversations/:conversationId', retrieveConversation);
aiRouter.post('/ai/diagram', structuredDiagram);

export { aiRouter };