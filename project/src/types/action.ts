import { State } from './state';
import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  selectGenre,
  loadMovies,
  requireAuthorization,
  requireLogout,
  SetLoadedMoviesCountAction,
  redirectToRoute,
  setReviews,
  requireAuthInfo,
  loadComments,
  loadPromo,
  loadSimilarMovies,
  loadSelectedMovie,
  setSelectedMovieId
} from '../store/action';

export enum ActionType {
  SelectGenre = 'change/selectGenre',
  LoadMovies = 'data/loadMovie',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RequireAuthInfo = 'user/requireAuthInfo',
  SetLoadedMoviesCount = 'change/setLoadedMoviesCount',
  RedirectToRoute = 'app/redirectToRoute',
  SetReviews = 'app/setReviews',
  LoadComments = 'data/loadComments',
  LoadPromo = 'data/loadPromo',
  LoadSimilarMovies = 'data/loadSimilarMovie',
  LoadSelectedMovie = 'data/loadSelectedMovie',
  SetSelectedMovieId = 'data/setSelectedMovieId'
}

export type Actions =
  | ReturnType<typeof selectGenre>
  | ReturnType<typeof loadMovies>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof requireAuthInfo>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof setReviews>
  | ReturnType<typeof loadComments>
  | ReturnType<typeof loadPromo>
  | ReturnType<typeof loadSimilarMovies>
  | ReturnType<typeof loadSelectedMovie>
  | ReturnType<typeof setSelectedMovieId>
  | SetLoadedMoviesCountAction

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;


