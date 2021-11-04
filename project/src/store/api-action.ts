import { ThunkActionResult } from '../types/action';
import { loadMovies, requireAuthorization, requireLogout } from './action';
import { saveToken, dropToken, Token} from '../services/token';
import { APIRoute, AuthorizationStatus, AppRoute } from '../types/enum';
import { MovieFromServer } from '../types/types';
import { AuthData } from '../types/types';
import { adapterMoviesToFrontEnd } from '../utils/adapter-movies-to-front-end';
import { redirectToRoute} from './action';

export const fetchMoviesAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<MovieFromServer[]>(APIRoute.Movies);
    const adaptedMoviesData = data.map((movie) => adapterMoviesToFrontEnd(movie));
    dispatch(loadMovies(adaptedMoviesData));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      });
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
