'use server';

import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.OPENAI_API_KEY);

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENAI_API_KEY,
  });

export default async function movieRecommender(movies: string[]) {
  //const recommendations = [];

  for (const movie of movies) {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful movie recommender assistant. The user provides movies and you give recommendations based on the movies." },
        {
          role: "user",
          content: `Give me similar movies to ${movie}`,
        },
      ],
      store: true,
    });

    console.log(completion.choices[0].message);
  }

}
