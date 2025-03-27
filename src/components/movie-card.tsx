import Image from 'next/image';
import { Movie } from '@/types/movie';
import { useEffect, useState } from 'react';
import { useMovieContext } from '@/context/MovieContext';
import { Button } from './ui/button';
import { Eye, EyeOff,} from 'lucide-react';

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const [selected, setSelected] = useState(false);
  const [isInWatchList, setIsInWatchList] = useState(false);
  const { selectedMovies, setSelectedMovies, watchList, setWatchList, isClientReady } = useMovieContext();

  useEffect(() => {
    if (isClientReady) {
      const isSelected = selectedMovies.some((selectedMovie) => selectedMovie.id === movie.id);
      setSelected(isSelected);

      const inWatchlist = watchList.some((watchedMovie) => watchedMovie.id === movie.id);
      setIsInWatchList(inWatchlist);
    }
  }, [movie.id, selectedMovies, watchList, isClientReady]);

  const handleClick = () => {
    if (!selected) {
      setSelectedMovies([...selectedMovies, movie]);
      
    }
    else {
      setSelectedMovies(selectedMovies.filter(m => m.id !== movie.id));
    }
    setSelected(!selected);
  };

  const handleAddToWatchList = (e: React.MouseEvent) => {
    // Stop propagation to prevent triggering the parent div's onClick
    e.stopPropagation();

    if (!isInWatchList){
      setWatchList([...watchList, movie])
      setIsInWatchList(true);
    } else {
      setWatchList(watchList.filter(m => m.id !== movie.id));
      setIsInWatchList(false);
    }
  }

  return (
    <div
      className={` relative m-4 cursor-pointer border-2 ${
        selected ? 'border-blue-500' : 'border-transparent'
      } p-2 flex flex-col items-center`}
      onClick={handleClick}
    >
      <Button 
  className={`absolute top-2 right-2 p-2 ${
    isInWatchList ? 'bg-green-500' : 'bg-blue-500'
  } text-white rounded-full hover:bg-opacity-80`}
  onClick={handleAddToWatchList}
>
  {isInWatchList ? 
    <EyeOff/> 
    :
    <Eye size={16}/>}
</Button>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={200}
        height={300}
        onError={(e) => {
          // Fallback image if poster is not available
          e.currentTarget.src = "/placeholder.jpg"
        }}
      />
      <h3 className='mt-2 text-center'>{movie.title}</h3>
    </div>
  );
}