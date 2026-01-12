import OpenAI from 'openai';
import { SYSTEM_PROMPT, tools, executeFunction  } from "../../utils/tools.js";

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
        // Array de input que se irá actualizando
        let inputList = [{ role: 'user', content: input }];
        
        // 1. Primera llamada al modelo con tools
        let response = await openai.responses.create({
            model: model,
            tools: tools,
            input: inputList,
            conversation: conversationId,
            store: true
        });
        
        // 2. Verificar si hay function_calls en la respuesta
        let hasFunctionCalls = false;
        for (const item of response.output) {
            console.log('Output item:', item);
            if (item.type === 'function_call') {
                hasFunctionCalls = true;
                
                // 3. Ejecutar la función correspondiente
                const functionName = item.name;
                const functionArgs = JSON.parse(item.arguments);
                
                console.log(`Ejecutando función: ${functionName} con args:`, functionArgs);
                
                const functionResult = await executeFunction(functionName, functionArgs);
                
                // 4. Agregar el resultado de la función al input
                inputList.push({
                    type: 'function_call_output',
                    call_id: item.call_id,
                    output: JSON.stringify(functionResult)
                });
            }
        }
        
        // 5. Si hubo function calls, hacer una segunda llamada con los resultados
        if (hasFunctionCalls) {
            response = await openai.responses.create({
                model: model,
                tools: tools,
                input: inputList,
                conversation: conversationId,
                store: true
            });
        }
        
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