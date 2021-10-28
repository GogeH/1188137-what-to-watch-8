import { Genres } from './const';
import { Movie } from './types';

export type State = {
  movies: Movie[],
  genre: Genres,
};
