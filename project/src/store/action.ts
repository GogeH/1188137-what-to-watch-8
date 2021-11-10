import { ActionType } from '../types/action';
import { AuthInfo, CommentsFromServer, MovieFromServer } from '../types/types';
import { Genres } from '../types/enum';
import { AuthorizationStatus } from '../types/enum';
import { AppRoute } from '../types/enum';
import { CommentToServer } from '../types/types';

export type Action<T> = {
  type: ActionType,
  payload: T,
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

function selectGenre(genre: Genres): Action<Genres> {
  return ({
    type: ActionType.SelectGenre,
    payload: genre,
  }) as const;
}

function loadMovies(movies: MovieFromServer[]): Action<MovieFromServer[]> {
  return ({
    type: ActionType.LoadMovies,
    payload: movies,
  }) as const;
}

function requireAuthorization(authStatus: AuthorizationStatus): Action<AuthorizationStatus> {
  return ({
    type: ActionType.RequireAuthorization,
    payload: authStatus,
  }) as const;
}

function requireLogout() {
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

// TO DO
const redirectToRoute = (url: AppRoute | string) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);

function setReviews(reviews: CommentToServer[]): Action<CommentToServer[]> {
  return ({
    type: ActionType.SetReviews,
    payload: reviews,
  } as const);
}

function loadComments(comments: CommentsFromServer[]): Action<CommentsFromServer[]> {
  return ({
    type: ActionType.LoadComments,
    payload: comments,
  }) as const;
}

function loadPromo(movie: MovieFromServer): Action<MovieFromServer> {
  return ({
    type: ActionType.LoadPromo,
    payload: movie,
  }) as const;
}

function loadSimilarMovies(movies: MovieFromServer[]): Action<MovieFromServer[]> {
  return ({
    type: ActionType.LoadSimilarMovies,
    payload: movies,
  }) as const;
}

function loadSelectedMovie(movie: MovieFromServer): Action<MovieFromServer> {
  return ({
    type: ActionType.LoadSelectedMovie,
    payload: movie,
  }) as const;
}

function setSelectedMovieId(id: number) {
  return ({
    type: ActionType.SetSelectedMovieId,
    payload: id,
  }) as const;
}

export {
  setLoadedMoviesCount,
  selectGenre,
  loadMovies,
  requireAuthorization,
  requireLogout,
  requireAuthInfo,
  redirectToRoute,
  setReviews,
  loadComments,
  loadPromo,
  loadSimilarMovies,
  loadSelectedMovie,
  setSelectedMovieId
};
