"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchForMovies } from "@/api/search-for-movies";
import { MovieList } from "@/components/movie-list";
import { Movie } from "@/types/movie";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async () => {
    console.log("handleSearch called"); // Debugging statement
    console.log("Query:", query); // Debugging statement
    const data = await searchForMovies(query);
    console.log("Movies found:", data); // Debugging statement
    setMovies(data);
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
        />
        <Button onClick={handleSearch} className="ml-2">Search</Button>
      </div>
      <MovieList movies={movies} />
    </div>
  );
}
