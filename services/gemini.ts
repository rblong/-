import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateExplanation = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    return "API Key 缺失，请检查配置。";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "你现在是格雷戈尔·孟德尔（遗传学之父）。请用通俗易懂的中文向学生解释遗传学概念。重点讲解豌豆实验、显性/隐性性状和概率。回答通常保持在150字以内，风格亲切、严谨但有趣。",
      }
    });
    
    return response.text || "抱歉，我暂时无法回答这个问题。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "连接AI导师时发生了错误。";
  }
};