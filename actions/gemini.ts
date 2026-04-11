"use server";

import { GoogleGenAI } from "@google/genai";

export const generateCodexPrompt = async (userPrompt: string) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const finalPrompt = `Create a coherent and relevant outline for the following prompt: ${userPrompt}.
  The outline should consist of at least 6 points, with 
  each point written as a single sentence.
  Return the output in the following JSON format:
  
  {
    "outlines": [
        "Point 1",
        "Point 2",
        "Point 3",
        "Point 4",
        "Point 5",
        "Point 6"
    ]
  }
  
  Ensure that the JSON is valid. Do not include any other text outside the JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
      config: {
        maxOutputTokens: 1000,
        temperature: 0.0,
        responseMimeType: "application/json",
      },
    });

    const responseContent = response.text;

    if (responseContent) {
      try {
        const cleanJson = responseContent.replace(/```json|```/g, "").trim();
        const jsonResponse = JSON.parse(cleanJson);

        return { status: 200, data: jsonResponse };
      } catch (error) {
        console.error("Invalid JSON received:", responseContent, error);
        return { status: 500, error: "Invalid JSON format received from AI" };
      }
    }

    return { status: 400, error: "No content generated" };
  } catch (error) {
    console.error("Error", error);
    return { status: 500, error: "Internal server error" };
  }
};
