import OpenAI from 'openai';

const ollama = new OpenAI({
    baseURL: 'http://localhost:11434/v1',
    apiKey: 'ollama',
});

export const generateText = async (prompt) => {
    const response = await ollama.responses.create({
        model: process.env.OLLAMA_MODEL || 'gemma3:4b',
        input: prompt,
    });
    return response.output_text;
};