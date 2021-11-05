import {ThunkActionResult} from '../types/action';
import { Action, loadMovies, redirectToRoute, requireAuthorization, requireLogout} from './action';
import {dropToken, saveToken, Token} from '../services/token';
import {APIRoute, AppRoute, AuthorizationStatus} from '../types/enum';
import {AuthData, MovieFromServer} from '../types/types';
import {adapterMoviesToFrontEnd} from '../utils/adapter-movies-to-front-end';

export const fetchMoviesAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<MovieFromServer[]>(APIRoute.Movies);
    const adaptedMoviesData = data.map((movie) => adapterMoviesToFrontEnd(movie));
    dispatch(loadMovies(adaptedMoviesData));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { payload } = await api.get(APIRoute.Login) as Action<AuthorizationStatus>;
    // TO DO
    dispatch(requireAuthorization(payload === undefined ? AuthorizationStatus.Auth : AuthorizationStatus.NoAuth));
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  };


export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
