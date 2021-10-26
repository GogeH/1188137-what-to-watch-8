import { Movie} from '../types/types';
import { Genres} from '../types/const';

export function filterMovie(movies: Movie[], activeGenre: Genres): Movie[] {
  if (activeGenre === Genres.AllGenres) {
    return movies;
  }
  return movies.filter((movie) => movie.genre === activeGenre);
}
