import { NextRequest, NextResponse } from 'next/server';

interface OllamaResponse {
  response: string;
}

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral", // Change to "llama2" or "gemma" if needed
        prompt,
      }),
    });

    const data = await ollamaResponse.json();
    return NextResponse.json({ response: data.response });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to connect to Ollama" }, { status: 500 });
  }
}
