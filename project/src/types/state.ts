import { AuthorizationStatus, Genres } from './enum';
import { AuthInfo, Comment, Movie } from './types';
import { RootState } from '../store/root-reducer';

export type MoviesData = {
  movies: Movie[],
  promo?: Movie | undefined,
  similarMovies: Movie[],
  isMoviesLoaded: boolean,
};

export type ProcessMovies = {
  genre: Genres,
  loadedMoviesCount: number,
  selectedMovie?: Movie,
  selectedMovieId: number,
  favoriteListMovies?: Movie[],
  favoriteMovie?: number,
};

export type UserAuth = {
  authorizationStatus: AuthorizationStatus,
  authInfo: AuthInfo,
};

export type CommentsData = {
  comments: Comment[],
};

export type State = RootState;
