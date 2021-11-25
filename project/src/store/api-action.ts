import { ThunkActionResult } from '../types/action';
import { toast } from 'react-toastify';
import { generatePath } from 'react-router-dom';
import {
  loadComments,
  loadMovies,
  loadPromo,
  setSelectedMovie,
  loadSimilarMovies,
  redirectToRoute,
  requireAuthInfo,
  requireAuthorization,
  requireLogout,
  setFavoriteListMovies
} from './action';
import { dropToken, saveToken } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../types/enum';
import { AuthData, Comment, PostedComment, Movie } from '../types/types';
import { adapterAuthInfoDataToClient, adapterMoviesDataToClient } from '../utils/adapters';
import { FavoriteStatusType } from '../types/enum';

const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться!';
const AUTH_MESSAGE = 'Спасибо за авторизацию!';
const LOGIN_ACTION_ERROR = 'При авторизации возникли проблемы с сервером!';
const LOGOUT_ACTION_ERROR = 'При выходе из профиля возникли проблемы с сервером!';
const MOVIE_ACTION_ERROR = 'Во время загрузки фильмов возникли проблемы!';
const PROMO_ACTION_ERROR = 'Во время загрузки промо фильма возникли проблемы!';

export const fetchMoviesAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie[]>(APIRoute.Movies);
    const adaptedMoviesData = data.map((movie) => adapterMoviesDataToClient(movie));

    try {
      dispatch(loadMovies(adaptedMoviesData));
    } catch {
      toast.error(MOVIE_ACTION_ERROR);
    }
  };

export const fetchFavoriteListMovies = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie[]>(APIRoute.FavoriteMovies);
    const adaptedMoviesData = data.map((movie) => adapterMoviesDataToClient(movie));
    dispatch(setFavoriteListMovies(adaptedMoviesData));
  };

export const fetchFavoriteMovie = (movieId: number, newStatus: FavoriteStatusType): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.post(`${APIRoute.FavoriteMovies}/${movieId}/${newStatus}`);
  };

export const fetchCommentsAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    dispatch(loadComments(data));
  };

export const fetchPromoAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie>(APIRoute.Promo);
    const adaptedMoviesData = adapterMoviesDataToClient(data);

    try {
      dispatch(loadPromo(adaptedMoviesData));
    } catch {
      toast.error(PROMO_ACTION_ERROR);
    }
  };

export const fetchSimilarMoviesAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie[]>(generatePath(APIRoute.SimilarMovies.replace(':id', id.toString())));
    const adaptedMoviesData = data.map((movie) => adapterMoviesDataToClient(movie));
    dispatch(loadSimilarMovies(adaptedMoviesData));
  };

export const fetchSelectedMovieAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie>(`${APIRoute.Movies}/${id}`);
    const adaptedMoviesData =  adapterMoviesDataToClient(data);
    dispatch(setSelectedMovie(adaptedMoviesData));
  };

export const sendReview = (data: { ratingValue: number, commentValue: string, movieId: number }): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const url = `${APIRoute.Comments}/${data.movieId}`;
    await api.post<PostedComment>(url, {
      rating: data.ratingValue,
      comment: data.commentValue,
    });
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.get(APIRoute.Login);

    try {
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(requireAuthInfo(adapterAuthInfoDataToClient(data)));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      toast.info(AUTH_FAIL_MESSAGE);
    }
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.post(APIRoute.Login, {email, password});
    const authData = adapterAuthInfoDataToClient(data);

    try {
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
      dispatch(requireAuthInfo(authData));
      toast.info(AUTH_MESSAGE);
    } catch {
      toast.error(LOGIN_ACTION_ERROR);
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.delete(APIRoute.Logout);

    try {
      dropToken();
      dispatch(requireLogout());
    } catch {
      toast.error(LOGOUT_ACTION_ERROR);
    }
  };
