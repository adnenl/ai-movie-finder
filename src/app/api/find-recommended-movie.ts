import dotenv from 'dotenv';
import { Movie, MovieResponse } from '@/types/movie';

dotenv.config();

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function findRecommendedMovie(query: string): Promise<Movie | null> {
  console.log("API_KEY:", API_KEY); // Debugging statement
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  console.log("URL:", url); // Debugging statement
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const res = await fetch(url, options);
    const data: MovieResponse = await res.json();
    console.log("API response data:", data); // Debugging statement
    return data.results[0]; // Returns an array of movies
  } catch (error) {
    console.error("Error fetching movies:", error);
    return null; // Return null in case of an error
  }
}