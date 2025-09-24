"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchForMovies } from "@/app/api/search-for-movies";
import { MovieList } from "@/components/movie-list";
import { Movie } from "@/types/movie";
import { SelectedMovieList } from "@/components/selected-movie-list";
import { findRecommendedMovie } from "./api/find-recommended-movie";
import { getPopularMovies } from "./api/get-popular-movies";
import { useMovieContext } from "@/context/MovieContext";

const getMovieNames = (movies: Movie[]): string[] => {
  return movies.map(movie => movie.title);
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecommending, setIsRecommending] = useState(false);

  const { selectedMovies, setSelectedMovies, isClientReady } = useMovieContext();

  useEffect(() => {
    if (isClientReady) {
      loadPopularMovies();
    }
  }, [isClientReady]);

  // Function to load initial movies
  const loadPopularMovies = async () => {
    setIsLoading(true);
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
    } catch (error) {
      console.error("Failed to load initial movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    setSelectedMovies([]);
    if (query === "") {
      loadPopularMovies();
      return;
    }
    const data = await searchForMovies(query);
    
    setMovies(data);
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleRemoveMovie = (movieId: number) => {
    setSelectedMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
  }

  const handleSendQuery = async () => {
    // Check if model is ready

    setIsRecommending(true);
    const movieNames = getMovieNames(selectedMovies);
    console.log("Movie names:", movieNames); // Debugging statement

    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieNames }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await res.json();

      setRecommendations([]);

      const recommendationString = data.response as string;
      const recommendationArray = recommendationString
        .split(',')
        .map(title => title.trim())
        .filter(title => title.length > 0);

      const newRecommendations: Movie[] = [];

      for (const title of recommendationArray) {
        const movie = await findRecommendedMovie(title);
        if (movie && !newRecommendations.some(m => m.id === movie.id) && !selectedMovies.some(m => m.id === movie.id)) {
          newRecommendations.push(movie);
        }
      }
      setRecommendations(newRecommendations);

      console.log("Movie objects:", recommendations);
      // You could add state to store and display recommendations
    } catch (error) {
      console.error(error);
    }
    finally {
      setIsRecommending(false);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-3xl font-bold mt-8 mb-4">AI Movie Finder</h1>



      {/* Search bar - keep this full width */}
      <div className="flex justify-center items-center w-full p-4 mt-8">
        <div className="relative w-1/2">
          <Input
            className="w-full pr-10"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          {query && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setQuery('');
                loadPopularMovies();
              }}>
              ×
            </button>
          )}
        </div>
        <Button onClick={handleSearch} className="ml-2">Search</Button>
      </div>

      {/* Content container - defines consistent width */}
      <div className="w-full max-w-6xl px-4">
        {isClientReady && (
          <>
            {recommendations.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">Recommended Movies</h2>
                <MovieList movies={recommendations} />
              </div>
            )}

            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Your Selected Movies</h2>
              {selectedMovies.length === 0 && (
                <p className="text-gray-500">Start selecting movies below to find similar movies.</p>
              )}
              <SelectedMovieList movies={selectedMovies} onRemove={handleRemoveMovie} />

              {selectedMovies.length > 0 && (
                <Button
                  onClick={handleSendQuery}
                  className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  disabled={isRecommending}>
                  {isRecommending ? 'Finding movies...' : 'Find Similar Movies'}
                  {isRecommending && <span className="ml-2 animate-pulse">...</span>}
                </Button>
              )}
            </div>
          </>
        )}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Browse Movies</h2>
          {!isLoading && movies.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No movies found matching your search.</p>
              <Button onClick={loadPopularMovies} className="mt-4">
                Show Popular Movies
              </Button>
            </div>
          )}
          {isLoading ? (
            <div className="flex justify-center w-full p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : <MovieList movies={movies} />}
        </div>
      </div>
    </div>
  );
}
