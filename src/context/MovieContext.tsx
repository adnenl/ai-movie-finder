// context/MovieContext.tsx
'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { Movie } from '@/types/movie';
import { useLocalStorage } from '@/hooks/useLocalStorage';

type MovieContextType = {
  selectedMovies: Movie[];
  setSelectedMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  isClientReady: boolean;
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({ children }: { children: ReactNode }) {
  const [selectedMovies, setSelectedMovies, isClientReady] = useLocalStorage<Movie[]>('selectedMovies', []);

  return (
    <MovieContext.Provider value={{ selectedMovies, setSelectedMovies, isClientReady }}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
}