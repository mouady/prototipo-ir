import { createNewConversation, generateAIResponseWithConversation, retrieveConversation } from '../controllers/ai.controller.js';
import { Router } from 'express';

const aiRouter = Router();

aiRouter.post('/ai/conversations', createNewConversation);
aiRouter.get('/ai/conversations/:conversationId', retrieveConversation);
aiRouter.post('/ai/conversations/generate', generateAIResponseWithConversation);

export { aiRouter };