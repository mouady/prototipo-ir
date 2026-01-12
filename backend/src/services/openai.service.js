import OpenAI from 'openai';
import { SYSTEM_PROMPT } from "../../utils/tools.js";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const model = process.env.OPENAI_MODEL || 'gpt-5-mini';


export const createConversation = async () => {
    try {
        const conversation = await openai.conversations.create();
        const conversationId = conversation.id;
        
        // Insertar el SYSTEM_PROMPT como el primer mensaje de la conversación
        await openai.responses.create({
            model: model,
            input: [{"role": "assistant", "content": SYSTEM_PROMPT}],
            conversation: conversationId,
        });
        
        return conversationId;
    } catch (error) {
        console.error('Error creating conversation:', error);
        throw error;
    }
};

export const generateTextWithConversation = async (input, conversationId) => {
    try {   
        const response = await openai.responses.create({
            model: model,
            input: [{ role: 'user', content: input }],
            conversation: conversationId,
            store: true
        });
        
        return {
            id: response.id,
            conversationId: conversationId,
            output: response.output,
            outputText: response.output_text,
            usage: response.usage,
        };
    } catch (error) {
        console.error('Error generating text with conversation:', error);
        throw error;
    }
};

export const getConversation = async (conversationId) => {
    try {
        const conversation = await openai.conversations.retrieve(conversationId);
        return conversation;
    } catch (error) {
        console.error('Error retrieving conversation:', error);
        throw error;
    }
};