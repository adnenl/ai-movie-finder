"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchForMovies } from "@/app/api/search-for-movies";
import { MovieList } from "@/components/movie-list";
import { Movie } from "@/types/movie";
import { getSelectedMovies } from "@/actions/selected-movies";
import { SelectedMovieList } from "@/components/selected-movie-list";
import { findRecommendedMovie } from "./api/find-recommended-movie";
import { get } from "http";
import { getPopularMovies } from "./api/get-popular-movies";

const getMovieNames = (movies: Movie[]): string[] => {
  return movies.map(movie=> movie.title);
  }

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>(getSelectedMovies());
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPopularMovies();
    setSelectedMovies(getSelectedMovies());
  }
  , []);

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
    console.log("handleSearch called"); // Debugging statement
    console.log("Query:", query); // Debugging statement
    const data = await searchForMovies(query);
    console.log("Movies found:", data); // Debugging statement
    setMovies(data);
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleAddMovies = () => {
    setSelectedMovies(getSelectedMovies());
  };

  const handleRemoveMovie = (movieId: number) => {
    setSelectedMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
    console.log("Selected movies:", selectedMovies); // Debugging statement
  }

  const handleSendQuery = async () => {
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
      const recommendationString = data.response as string;
      const recommendationArray = recommendationString
        .split(',')
        .map(title => title.trim())
        .filter(title => title.length > 0);
      console.log("Recommendations:", recommendationArray); // Debugging statement
      for (const title of recommendationArray) {
        const movie = await findRecommendedMovie(title);
        if (movie) {
          console.log("Found recommended movie:", movie);
          setRecommendations((prevMovies) => [...prevMovies, movie]);
        }
      }
      //setRecommendations(recommendationArray.map(title => ({ title } as Movie)));
      console.log("Movie objects:", recommendations);
      // You could add state to store and display recommendations
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex justify-center items-center w-full p-4 mt-8">
        <Input 
          className="w-1/2" 
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => { 
            setQuery(e.target.value);
          }}
          onKeyPress={handleKeyPress}
        />
        <Button onClick={handleSearch} className="ml-2">Search</Button>
      </div>
      {recommendations && (
        <MovieList movies={recommendations} />
)}
      <SelectedMovieList movies={selectedMovies} onRemove={handleRemoveMovie} />
      <Button onClick={handleSendQuery} className="mt-20">Find Similar Movies</Button>
      <Button onClick={handleAddMovies} className="mt-20">Add Movies</Button>
      <div className="mt-20">
        {isLoading && <p>Loading...</p>}
        {!isLoading && <MovieList movies={movies} />}
      </div>
    </div>
  );
}
