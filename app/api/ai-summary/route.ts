import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are Ojas AI, a health and wellness AI for young adults in India.
Analyze the following user community post and provide an insightful "Community Note" AI summary.

Post content: "${content}"

Your response MUST be ONLY a valid JSON object with the following structure (do NOT include markdown formatting like \`\`\`json):
{
  "level": "info" | "warning" | "critical" | "success", // use critical for emergencies or severe issues, warning for concerning stuff, success for positive habits, info for general questions
  "insight": "1-2 short sentences summarizing the core issue and validating the user's experience",
  "warning": "(Optional) Include only if there's a serious risk or dangerous practice mentioned",
  "ayurvedic": ["Array of 1-3 specific, actionable Ayurvedic/natural remedies if applicable"],
  "lifestyle": "(Optional) 1 short sentence on lifestyle, habit change, or diet advice",
  "medical": "(Optional) Scientific or clinical note, or advice to see a doctor",
  "sources": "(Optional) General name of a recognized health journal, study, or traditional text like Charaka Samhita"
}

Ensure the response strictly follows this JSON format and contains no other text.
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up potential markdown formatting block if the model outputs it
    const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const summaryStr = JSON.parse(jsonStr);

    return NextResponse.json(summaryStr);

  } catch (error) {
    console.error("AI Summary generation error:", error);
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}
