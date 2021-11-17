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
  requireLogout, setFavoriteListMovies
} from './action';
import { dropToken, saveToken, Token } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../types/enum';
import { AuthData, Comment, PostedComment, Movie } from '../types/types';
import { adapterAuthInfoToFrontEnd, adapterMoviesToFrontEnd } from '../utils/adapters';
import { FavoriteStatusType } from '../types/enum';

const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться!';

export const fetchMoviesAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie[]>(APIRoute.Movies);
    const adaptedMoviesData = data.map((movie) => adapterMoviesToFrontEnd(movie));
    dispatch(loadMovies(adaptedMoviesData));
  };

export const fetchFavoriteListMovies = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie[]>(APIRoute.FavoriteMovies);
    const adaptedMoviesData = data.map((movie) => adapterMoviesToFrontEnd(movie));
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
    const adaptedMoviesData = adapterMoviesToFrontEnd(data);
    dispatch(loadPromo(adaptedMoviesData));
  };

export const fetchSimilarMoviesAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie[]>(generatePath(APIRoute.SimilarMovies.replace(':id', id.toString())));
    const adaptedMoviesData = data.map((movie) => adapterMoviesToFrontEnd(movie));
    dispatch(loadSimilarMovies(adaptedMoviesData));
  };

export const fetchSelectedMovieAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie>(`${APIRoute.Movies}/${id}`);
    const adaptedMoviesData =  adapterMoviesToFrontEnd(data);
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
    if(!data) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      toast.info(AUTH_FAIL_MESSAGE);
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
