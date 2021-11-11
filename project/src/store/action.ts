import { ActionType } from '../types/action';
import { AuthInfo, Comment, Movie } from '../types/types';
import { Genres } from '../types/enum';
import { AuthorizationStatus } from '../types/enum';
import { AppRoute } from '../types/enum';
import { PostedComment } from '../types/types';

export type Action<T> = {
  type: ActionType,
  payload?: T,
}

export type SetLoadedMoviesCountAction = {
  type: ActionType,
  payload: number,
}

function setLoadedMoviesCount(count: number): SetLoadedMoviesCountAction {
  return ({
    type: ActionType.SetLoadedMoviesCount,
    payload: count,
  }) as const;
}

function setGenre(genre: Genres): Action<Genres> {
  return ({
    type: ActionType.SetGenre,
    payload: genre,
  }) as const;
}

function loadedMovies(movies: Movie[]): Action<Movie[]> {
  return ({
    type: ActionType.Movies,
    payload: movies,
  }) as const;
}

function requireAuthorization(authStatus: AuthorizationStatus): Action<AuthorizationStatus> {
  return ({
    type: ActionType.RequireAuthorization,
    payload: authStatus,
  }) as const;
}

function requireLogout(): Action<undefined> {
  return ({
    type: ActionType.RequireLogout,
  }) as const;
}

function requireAuthInfo(authInfo: AuthInfo): Action<AuthInfo> {
  return ({
    type: ActionType.RequireAuthInfo,
    payload: authInfo,
  }) as const;
}

const redirectToRoute = (url: AppRoute | string) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);

function setReviews(reviews: PostedComment[]): Action<PostedComment[]> {
  return ({
    type: ActionType.SetReviews,
    payload: reviews,
  } as const);
}

function commentsMovie(comments: Comment[]): Action<Comment[]> {
  return ({
    type: ActionType.Comments,
    payload: comments,
  }) as const;
}

function promo(movie: Movie): Action<Movie> {
  return ({
    type: ActionType.Promo,
    payload: movie,
  }) as const;
}

function similarMovies(movies: Movie[]): Action<Movie[]> {
  return ({
    type: ActionType.SimilarMovies,
    payload: movies,
  }) as const;
}

function setSelectedMovie(movie: Movie): Action<Movie> {
  return ({
    type: ActionType.SetSelectedMovie,
    payload: movie,
  }) as const;
}

function setSelectedMovieId(id: number): Action<number> {
  return ({
    type: ActionType.SetSelectedMovieId,
    payload: id,
  }) as const;
}

export {
  setLoadedMoviesCount,
  setGenre,
  loadedMovies,
  requireAuthorization,
  requireLogout,
  requireAuthInfo,
  redirectToRoute,
  setReviews,
  commentsMovie,
  promo,
  similarMovies,
  setSelectedMovie,
  setSelectedMovieId
};
