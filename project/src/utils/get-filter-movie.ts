import { Movie} from '../types/types';
import { Genres} from '../types/enum';

export function getFilterMovie(movies: Movie[], activeGenre: Genres): Movie[] {
  if (activeGenre === Genres.AllGenres) {
    return movies;
  }
  return movies.filter((movie) => movie.genre === activeGenre);
}
