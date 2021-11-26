import { Movie } from '../types/types';
import { ALL_GENRES } from '../types/const';

export const getGenresForMovie = (movies: Movie[]): string[] => {
  const genres: string[] = [ALL_GENRES];

  movies.forEach((movie) => {
    if(!genres.includes(movie.genre)) {
      genres.push(movie.genre);
    }
  });

  return genres;
};
