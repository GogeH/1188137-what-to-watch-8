import { MovieFromServer } from './types';
import { Genres } from './enum';
import { AuthorizationStatus } from './enum';

export type State = {
  genre: Genres,
  loadedMoviesCount: number,
  authorizationStatus: AuthorizationStatus,
  moviesFromServer: MovieFromServer[],
  isMoviesLoaded: boolean,
};
