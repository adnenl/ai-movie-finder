import { Movie } from "../types/movie";

export function getSelectedMovies(): Movie[] {
  if (typeof window !== 'undefined') {
    const selectedMovies = localStorage.getItem('selectedMovies');
    return selectedMovies ? JSON.parse(selectedMovies) : [];
  }

  return [];
  }

export function addMovieToSelectedList(movie: Movie) {
  const selectedMovies = getSelectedMovies();
  selectedMovies.push(movie);
  localStorage.setItem('selectedMovies', JSON.stringify(selectedMovies));
}

export function removeMovieFromSelectedList(movieId: number) {
  const selectedMovies = getSelectedMovies();
  const updatedSelectedMovies = selectedMovies.filter((movie: Movie) => movie.id !== movieId);
  localStorage.setItem('selectedMovies', JSON.stringify(updatedSelectedMovies));
}
