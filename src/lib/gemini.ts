import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// export const generateAIContent = await ai.interactions.create({
//   model: "gemini-3.6-flash",
//   input: "Explain how AI works in a few words",
// });
// console.log(generateAIContent.output_text);

export const generateAIContent = async (prompt: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  return response.text;
};
