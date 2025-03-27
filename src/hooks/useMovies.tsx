'use client';

import { useLocalStorage } from './useLocalStorage';
import { Movie } from '@/types/movie';

export function useMovies() {
  const [selectedMovies, setSelectedMovies, isClient] = useLocalStorage<Movie[]>('selectedMovies', []);
  
  const addMovie = (movie: Movie) => {
    setSelectedMovies(prev => [...prev, movie]);
  };
  
  const removeMovie = (movieId: number) => {
    setSelectedMovies(prev => prev.filter(movie => movie.id !== movieId));
  };
  
  return {
    selectedMovies,
    addMovie,
    removeMovie,
    isClientReady: isClient
  };
}