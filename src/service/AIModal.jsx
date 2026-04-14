import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.7,
    topP: 0.95,
    maxOutputTokens: 16000, // ✅ increase from 8192
    responseMimeType: "application/json",
  },
});

// ✅ Export a chat session, not the model
export const chatSession = model.startChat({
  history: [],
});
