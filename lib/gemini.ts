import { GoogleGenAI } from "@google/genai";

// The user's prompt states to assume process.env.API_KEY is available.
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.error("API_KEY is not set. A key is required to use the AI features.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

/**
 * Runs a query using a fast model for quick tasks like explanations.
 * @param prompt The user's prompt.
 * @returns The generated text.
 */
export async function runGeminiFlash(prompt: string): Promise<string> {
    if (!apiKey) return "API Key is not configured. Please set the API_KEY environment variable.";
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: prompt,
        });
        return response.text;
    } catch (e) {
        console.error(e);
        return `Error running Gemini: ${e.message}`;
    }
}

/**
 * Runs a query using the advanced model with thinking mode for complex scenarios.
 * @param prompt The user's prompt.
 * @returns The generated text.
 */
export async function runGeminiWithThinking(prompt: string): Promise<string> {
    if (!apiKey) return "API Key is not configured. Please set the API_KEY environment variable.";
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                thinkingConfig: {
                    thinkingBudget: 32768,
                }
            }
        });
        return response.text;
    } catch (e) {
        console.error(e);
        return `Error running Gemini: ${e.message}`;
    }
}
