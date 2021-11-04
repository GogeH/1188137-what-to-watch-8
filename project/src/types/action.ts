import { State } from './state';
import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { selectGenre, loadMovies, requireAuthorization, requireLogout, SetLoadedMoviesCountAction, redirectToRoute } from '../store/action';

export enum ActionType {
  SelectGenre = 'change/selectGenre',
  LoadMovies = 'data/loadMovie',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  SetLoadedMoviesCount = 'change/setLoadedMoviesCount',
  RedirectToRoute = 'movie/redirectToRoute',
}

export type Actions =
  | ReturnType<typeof selectGenre>
  | ReturnType<typeof loadMovies>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>
  | SetLoadedMoviesCountAction

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;


