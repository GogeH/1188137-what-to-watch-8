import { Genres } from './const';
import { Movie } from './types';

export type State = {
  genre: Genres,
  movie: Movie[],
};
