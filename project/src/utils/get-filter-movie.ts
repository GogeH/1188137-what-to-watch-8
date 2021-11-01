import { MovieFromServer } from '../types/types';
import { Genres} from '../types/enum';

export function getFilterMovie(movies: MovieFromServer[], activeGenre: Genres): MovieFromServer[] {
  if (activeGenre === Genres.AllGenres) {
    return movies;
  }
  return movies.filter((movie) => movie.genre === activeGenre);
}
