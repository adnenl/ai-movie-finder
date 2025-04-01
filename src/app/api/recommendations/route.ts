import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { movieNames } = await req.json();
  
  try {
    // Call Cloudflare AI Worker endpoint
    const response = await fetch('https://cloudflare.movie-finder.workers.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieNames }),
    });
    
    if (!response.ok) {
      throw new Error(`Cloudflare API error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json({ response: data.recommendations });
  } catch (error) {
    console.error("Recommendation API error:", error);
    // Fallback to static recommendations if everything fails
    const fallbackRecommendations = "The Shawshank Redemption, The Godfather, Pulp Fiction, The Dark Knight, Fight Club";
    return NextResponse.json({ response: fallbackRecommendations });
  }
}