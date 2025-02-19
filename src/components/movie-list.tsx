import React from 'react';
import { Movie } from '@/types/movie';
import { MovieCard } from './movie-card';

export const MovieList = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className="grid grid-cols-4 gap-4 w-full p-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
