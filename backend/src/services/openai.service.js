import { SYSTEM_PROMPT, tools, callFunction  } from "../../utils/tools.js";
import OpenAI from 'openai';
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";


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
    
    const inputList = [{ role: 'user', content: input }];
    try {   
        let response = await openai.responses.create({
            model: model,
            tools: tools,
            input: inputList,
            conversation: conversationId,
            store: true
        });
        
        
        let maxIterations = process.env.MAX_ITERATIONS || 5;
        let iteration = 0;
        
        while (iteration < maxIterations) {
            let hasFunctionCall = false;
            
            for (const item of response.output) {
                if (item.type == "function_call") {
                    hasFunctionCall = true;
                    console.log(`[DEBUG] Iteración ${iteration + 1} - Llamando función: ${item.name}`);
                    console.log(`[DEBUG] Argumentos:`, item.arguments);
                    
                    const functionResponse = await callFunction(item.name, JSON.parse(item.arguments));
                    console.log(`[DEBUG] Respuesta de función:`, functionResponse);
                        
                    inputList.push({
                        type: "function_call_output",
                        call_id: item.call_id,
                        output: JSON.stringify(functionResponse)
                    });                                
                }
            }

            if (hasFunctionCall) {
                console.log(`[FUNCTION CALL] - Iteración ${iteration + 1}: Ejecutando función(es), preparando nueva entrada...`);
                console.log(JSON.stringify(inputList, null, 2));

                response = await openai.responses.create({
                    model: model,
                    tools: tools,
                    input: inputList,
                    conversation: conversationId,
                    store: true
                });
                console.log(`[FUNCTION CALL] - Nueva respuesta después de llamada a función (iteración ${iteration + 1}):`);
                console.log(JSON.stringify(response, null, 2));
                
                iteration++;
            } else {
                break;
            }
        }
        
        if (iteration >= maxIterations) {
            console.warn(`[WARNING] Se alcanzó el límite de ${maxIterations} iteraciones de function calls`);
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

export const UMLdiagram2structuredResponse = async (umlDiagram) => {
    const UMLStructure = z.object({
        diagramName: z.string(),

        classes: z.array(
            z.object({
            name: z.string(),
            stereotype: z.string().nullable(),

            attributes: z.array(
                z.object({
                name: z.string(),
                type: z.string(),
                visibility: z.enum(["public", "private", "protected"]),
                static: z.boolean().nullable(),
                abstract: z.boolean().nullable(),
                })
            ),

            methods: z.array(
                z.object({
                name: z.string(),
                visibility: z.enum(["public", "private", "protected"]),
                static: z.boolean().nullable(),
                abstract: z.boolean().nullable(),
                returnType: z.string(),
                parameters: z.array(
                    z.object({
                    name: z.string(),
                    type: z.string(),
                    })
                ),
                })
            ),
            })
        ),

        relationships: z.array(
            z.object({
            type: z.enum([
                "association",
                "inheritance",
                "aggregation",
                "composition",
                "dependency",
            ]),
            from: z.string(),
            to: z.string(),
            label: z.string().nullable(),
            multiplicityFrom: z.string().nullable(),
            multiplicityTo: z.string().nullable(),
            })
        ),
    });

    const response = await openai.responses.parse({
        model: model,
        input: [
            { role: "system", content: "Extract the event information." },
            {
            role: "user",
            content: JSON.stringify(umlDiagram),
            },
        ],
        text: {
            format: zodTextFormat(UMLStructure, "event"),
        },
    });

    return response.output_parsed;
};