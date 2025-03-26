import Image from 'next/image';
import { Movie } from '@/types/movie';
import { useEffect, useState } from 'react';
import { addMovieToSelectedList, getSelectedMovies, removeMovieFromSelectedList } from '@/actions/selected-movies';

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const selectedMovies = getSelectedMovies();
    const isSelected = selectedMovies.some((selectedMovie) => selectedMovie.id === movie.id)
    setSelected(isSelected);
  }, [movie.id])

  const handleClick = () => {
    setSelected(!selected);
    if (!selected) {
      addMovieToSelectedList(movie);
      console.log(localStorage.getItem('selectedMovies'));
      
    }
    else {
      removeMovieFromSelectedList(movie.id);
        console.log(localStorage.getItem('selectedMovies'));
    }
  };

  return (
    <div
      className={`m-4 cursor-pointer border-2 ${
        selected ? 'border-blue-500' : 'border-transparent'
      } p-2 flex flex-col items-center`}
      onClick={handleClick}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={200}
        height={300}
      />
      <h3 className='mt-2 text-center'>{movie.title}</h3>
    </div>
  );
}