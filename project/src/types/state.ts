import { AuthorizationStatus, Genres } from './enum';
import { AuthInfo, Comment, Movie } from './types';
import { RootState } from '../store/root-reducer';

export type MoviesData = {
  movies: Movie[],
  promo?: Movie,
  similarMovies: Movie[],
  isMoviesLoaded: boolean,
};

export type ProcessMovies = {
  genre: Genres,
  loadedMoviesCount: number,
  setSelectedMovie?: Movie,
  setSelectedMovieId: number,
  favoriteListMovies?: Movie[],
  favoriteMovie: boolean,
};

export type UserAuth = {
  authorizationStatus: AuthorizationStatus,
  authInfo: AuthInfo,
};

export type CommentsData = {
  comments: Comment[],
};

export type State = RootState;

