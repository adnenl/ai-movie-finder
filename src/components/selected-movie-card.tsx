import Image from 'next/image';
import { Movie } from '@/types/movie';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { removeMovieFromSelectedList } from '@/selected-movies';
export const SelectedMovieCard = ({ movie, onRemove }: { movie: Movie, onRemove: (movieId: number) => void }) => {

    const handleRemove = () => {
        removeMovieFromSelectedList(movie.id);
        onRemove(movie.id);
      };

  return (
    <div
      className='relative m-4 p-2 flex flex-col items-center'
    >
    <Button className='absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full'
            onClick={handleRemove}
    >
        <X/></Button>
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

