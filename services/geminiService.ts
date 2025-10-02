
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set. Using mock service.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const mockResponse = `
### Light
Place your plant in a location with bright, indirect sunlight. Avoid direct sun as it can scorch the leaves.

### Water
Water every 1-2 weeks, allowing the soil to dry out between waterings. Ensure the pot has good drainage to prevent root rot.

### Soil
Use a well-draining potting mix. A mixture of peat, pine bark, and perlite is ideal for this type of plant.

### Fertilizer
Feed with a balanced liquid fertilizer every 4-6 weeks during the growing season (spring and summer).
`;

export const generatePlantCareGuide = async (plantName: string): Promise<string> => {
    if (!process.env.API_KEY) {
        return new Promise(resolve => setTimeout(() => resolve(mockResponse), 1000));
    }

    try {
        const prompt = `Generate a simple and easy-to-follow plant care guide for a ${plantName}. 
        The guide should be concise and formatted using markdown. 
        Cover the following topics: Light, Water, Soil, and Fertilizer. 
        Use a level 3 markdown heading (###) for each topic. Do not include any introductory or concluding sentences, just the guide itself.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating plant care guide:", error);
        return "Sorry, I couldn't generate a care guide at this time. Please check your connection and API key.";
    }
};
