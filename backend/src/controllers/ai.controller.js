import { createConversation, generateTextWithConversation, getConversation } from '../services/openai.service.js';

export const createNewConversation = async (req, res) => {
    try {
        const conversationId = await createConversation();
        res.status(201).json({
            conversationId,
            message: 'Conversación creada exitosamente'
        });
    } catch (error) {
        console.error('Error in createNewConversation:', error);
        res.status(500).json({
            success: false,
            error: 'Error al crear la conversación',
            details: error.message
        });
    }
};

export const generateAIResponseWithConversation = async (req, res) => {
    try {
        const { input, conversationId, previousResponseId } = req.body;

        if (!input) {
            return res.status(400).json({
                success: false,
                error: 'Se requiere el campo input'
            });
        }

        const response = await generateTextWithConversation(
            input,
            conversationId,
            previousResponseId
        );

        res.status(200).json({
            responseId: response.id,
            conversationId: response.conversationId,
            text: response.outputText,
            output: response.output,
            usage: response.usage  
        });
    } catch (error) {
        console.error('Error in generateAIResponseWithConversation:', error);
        res.status(500).json({
            success: false,
            error: 'Error al generar respuesta',
            details: error.message
        });
    }
};


export const retrieveConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;

        if (!conversationId) {
            return res.status(400).json({
                success: false,
                error: 'Se requiere conversationId'
            });
        }

        const conversation = await getConversation(conversationId);

        res.status(200).json({data: conversation});
    } catch (error) {
        console.error('Error in retrieveConversation:', error);
        res.status(500).json({
            success: false,
            error: 'Error al obtener la conversación',
            details: error.message
        });
    }
};