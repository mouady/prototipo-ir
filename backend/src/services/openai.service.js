import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const model = process.env.OPENAI_MODEL || 'gpt-5-mini';

export const createConversation = async () => {
    try {
        const conversation = await openai.conversations.create();
        return conversation.id;
    } catch (error) {
        console.error('Error creating conversation:', error);
        throw error;
    }
};

export const generateTextWithConversation = async (input, conversationId = null, previousResponseId = null) => {
    try {
        const params = {
            model: model,
            input: Array.isArray(input) ? input : [{ role: 'user', content: input }],
            store: true
        };

        if (conversationId) {
            params.conversation = conversationId;
        }

        if (previousResponseId) {
            params.previous_response_id = previousResponseId;
        }

        console.log('Generating text with params:', { 
            hasConversationId: !!conversationId, 
            hasPreviousResponseId: !!previousResponseId 
        });

        const response = await openai.responses.create(params);
        
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