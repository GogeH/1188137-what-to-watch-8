import { State } from './state';
import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  setGenre,
  loadedMovies,
  requireAuthorization,
  requireLogout,
  SetLoadedMoviesCountAction,
  redirectToRoute,
  setReviews,
  requireAuthInfo,
  commentsMovie,
  promo,
  similarMovies,
  setSelectedMovie,
  setSelectedMovieId
} from '../store/action';

export enum ActionType {
  SetGenre = 'change/setGenre',
  Movies = 'data/movie',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RequireAuthInfo = 'user/requireAuthInfo',
  SetLoadedMoviesCount = 'change/setLoadedMoviesCount',
  RedirectToRoute = 'app/redirectToRoute',
  SetReviews = 'app/setReviews',
  Comments = 'data/comments',
  Promo = 'data/promo',
  SimilarMovies = 'data/similarMovie',
  SetSelectedMovie = 'data/setSelectedMovie',
  SetSelectedMovieId = 'data/setSelectedMovieId'
}

export type Actions =
  | ReturnType<typeof setGenre>
  | ReturnType<typeof loadedMovies>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof requireAuthInfo>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof setReviews>
  | ReturnType<typeof commentsMovie>
  | ReturnType<typeof promo>
  | ReturnType<typeof similarMovies>
  | ReturnType<typeof setSelectedMovie>
  | ReturnType<typeof setSelectedMovieId>
  | SetLoadedMoviesCountAction

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;


