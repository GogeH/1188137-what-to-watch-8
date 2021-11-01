import { State } from './state';
import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { selectedMovie, selectedGenre, loadMovies } from '../store/action';

export enum ActionType {
  SelectedGenre = 'change/selectedGenre',
  SelectedMovie = 'change/selectedMovie',
  LoadMovies = 'data/loadMovie',
}

export type Actions =
  | ReturnType<typeof selectedGenre>
  | ReturnType<typeof selectedMovie>
  | ReturnType<typeof loadMovies>

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
