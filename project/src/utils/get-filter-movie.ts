import { Movie} from '../types/types';
import { Genres} from '../types/enum';

const STEP_OPENING_MOVIE = 8;

export function getMovieCount(listMovieLength: number, Count = 0, step = STEP_OPENING_MOVIE): number {
  return Math.min(listMovieLength, Count + step);
}

export function getFilterMovie(movies: Movie[], activeGenre: Genres): Movie[] {
  if (activeGenre === Genres.AllGenres) {
    return movies;
  }
  return movies.filter((movie) => movie.genre === activeGenre);
}

