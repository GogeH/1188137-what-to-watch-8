import {ThunkActionResult} from '../types/action';
import { loadMovies, redirectToRoute, requireAuthInfo, requireAuthorization, requireLogout } from './action';
import {dropToken, saveToken, Token} from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../types/enum';
import { AuthData, MovieFromServer} from '../types/types';
import { adapterAuthInfoToFrontEnd, adapterMoviesToFrontEnd } from '../utils/adapter';

export const fetchMoviesAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<MovieFromServer[]>(APIRoute.Movies);
    const adaptedMoviesData = data.map((movie) => adapterMoviesToFrontEnd(movie));
    dispatch(loadMovies(adaptedMoviesData));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.get(APIRoute.Login);
    if(!data) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } else {
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(requireAuthInfo(adapterAuthInfoToFrontEnd(data)));
    }
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
