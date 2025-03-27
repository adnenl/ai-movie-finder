import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { movieNames } = await req.json();
  
  try {
    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        prompt: `You are a helpful movie recommendation assistant. Based on the following movies: ${movieNames.join(", ")}, suggest 4 similar movies.

CRITICAL INSTRUCTION: Your entire response must be ONLY movie titles separated by commas WITHOUT ANY NUMBERING.
Example of correct format: "The Matrix, Inception, Interstellar, Blade Runner, The Fifth Element"
Example of INCORRECT format: "1. The Matrix 2. Inception 3. Interstellar"

Return ONLY the movie titles with commas between them. No explanations, no numbers, no bullets.

DO NOT include the movies provided in the prompt in your response.`,
        stream: false
      }),
    });
    
    if (!ollamaResponse.ok) {
      throw new Error(`Ollama API error: ${ollamaResponse.statusText}`);
    }
    
    const data = await ollamaResponse.json();
    let response = data.response;

// Clean up the response to ensure it's correctly formatted
response = response
  .replace(/^\d+\.\s*/gm, '') // Remove any numbering pattern like "1. "
  .replace(/\n\d+\n/g, ', ')  // Replace any standalone numbers with commas
  .replace(/\n/g, ' ')        // Replace newlines with spaces
  .replace(/"/g, '')          // Remove any quotes
  .replace(/\s+/g, ' ')       // Replace multiple spaces with single space
  .replace(/,\s*,/g, ',')     // Replace double commas with single comma
  .trim();

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Ollama error:", error);
    return NextResponse.json({ 
      error: "Failed to get recommendations. Make sure Ollama is running." 
    }, { status: 500 });
  }
}