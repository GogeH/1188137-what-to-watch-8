import { State } from './state';
import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { selectGenre, loadMovies, requireAuthorization, requireLogout, SetLoadedMoviesCountAction, redirectToRoute,setReviews } from '../store/action';

export enum ActionType {
  SelectGenre = 'change/selectGenre',
  LoadMovies = 'data/loadMovie',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  SetLoadedMoviesCount = 'change/setLoadedMoviesCount',
  RedirectToRoute = 'app/redirectToRoute',
  SetReviews = 'app/set_reviews',
}

export type Actions =
  | ReturnType<typeof selectGenre>
  | ReturnType<typeof loadMovies>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof setReviews>
  | SetLoadedMoviesCountAction

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;


