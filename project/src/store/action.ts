import { ActionType } from '../types/action';
import { MovieFromServer } from '../types/types';
import { Genres } from '../types/enum';
import { AuthorizationStatus } from '../types/enum';
import { AppRoute } from '../types/enum';
import { Review } from '../types/const';

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

const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);

function setReviews(reviews: Review[]) {
  return ({
    type: ActionType.SetReviews,
    payload: reviews,
  } as const);
}

export {
  setLoadedMoviesCount,
  selectGenre,
  loadMovies,
  requireAuthorization,
  requireLogout,
  redirectToRoute,
  setReviews
};
