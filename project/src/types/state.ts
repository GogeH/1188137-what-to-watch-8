import { AuthorizationStatus, Genres } from './enum';
import { AuthInfo, CommentsFromServer, MovieFromServer } from './types';
import { RootState } from '../store/root-reducer';

export type MoviesData = {
  moviesFromServer: MovieFromServer[],
  loadPromo: MovieFromServer,
  loadSimilarMovies: MovieFromServer[],
  isMoviesLoaded: boolean,
};

export type ProcessMovies = {
  genre: Genres,
  loadedMoviesCount: number,
  loadSelectedMovie: MovieFromServer,
  setSelectedMovieId: number,
};

export type UserAuth = {
  authorizationStatus: AuthorizationStatus,
  authInfo: AuthInfo,
};

export type CommentsData = {
  loadComments: CommentsFromServer[],
};

export type State = RootState;

