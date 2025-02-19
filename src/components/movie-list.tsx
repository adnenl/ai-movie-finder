import React from 'react';
import { Movie } from '@/types/movie';
import Image from 'next/image';

export const MovieList = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className="grid grid-cols-4 gap-4 w-full p-4">
      {movies.map((movie) => (
        <div key={movie.id} className="m-4">
          <Image 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
            width={200} 
            height={300} 
          />
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};
