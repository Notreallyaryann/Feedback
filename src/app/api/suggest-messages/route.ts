import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const prompt = `
      Create a list of three unique, open-ended, and engaging questions.
      Each time this prompt is run, generate a *different* set of questions.
      Format them as a single string separated by '||'.
      Avoid personal or sensitive topics, focusing on universal themes that encourage friendly interaction.
    `;

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.0-pro',
      generationConfig: {
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
      },
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return new Response(text, { headers: { 'Content-Type': 'text/plain' } });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Unexpected error' },
      { status: 500 }
    );
  }
}

