import { Movie } from './types';
import { Genres } from './enum';

export type State = {
  movies: Movie[],
  genre: Genres,
};
