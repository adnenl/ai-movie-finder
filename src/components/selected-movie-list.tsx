import React from 'react';
import { Movie } from '@/types/movie';
import { SelectedMovieCard } from './selected-movie-card';

export const SelectedMovieList = ({ movies, onRemove }: { movies: Movie[], onRemove: (movieId: number) => void }) => {
  return (
    <div className="grid grid-cols-4 gap-4 w-full p-4">
      {movies.map((movie) => (
        <SelectedMovieCard key={movie.id} movie={movie} onRemove={onRemove} />
      ))}
    </div>
  );
};
