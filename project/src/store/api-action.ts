import { ThunkActionResult } from '../types/action';
import { toast } from 'react-toastify';
import { generatePath } from 'react-router-dom';
import {
  commentsMovie,
  loadedMovies,
  promo,
  setSelectedMovie,
  similarMovies,
  redirectToRoute,
  requireAuthInfo,
  requireAuthorization,
  requireLogout, favoriteListMovies
} from './action';
import { dropToken, saveToken, Token } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../types/enum';
import { AuthData, Comment, PostedComment, Movie } from '../types/types';
import { adapterAuthInfoToFrontEnd, adapterMoviesToFrontEnd } from '../utils/adapters';
import { FavoriteStatusType } from '../types/const';

const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться!';

export const fetchMoviesAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie[]>(APIRoute.Movies);
    const adaptedMoviesData = data.map((movie) => adapterMoviesToFrontEnd(movie));
    dispatch(loadedMovies(adaptedMoviesData));
  };

export const fetchFavoriteListMovies = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie[]>(APIRoute.FavoriteMovies);
    const adaptedMoviesData = data.map((movie) => adapterMoviesToFrontEnd(movie));
    dispatch(favoriteListMovies(adaptedMoviesData));
  };

export const fetchFavoriteMovie = (movieId: string | number, newStatus: FavoriteStatusType): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.post(`${APIRoute.FavoriteMovies}/${movieId}/${newStatus}`);
    const adaptedMovie = adapterMoviesToFrontEnd(data);

    if(_getState().PROCESS_MOVIES.setSelectedMovie?.id === data.id) {
      dispatch(setSelectedMovie(adaptedMovie));
    }

    if(_getState().MOVIES_DATA.promo?.id === data.id) {
      dispatch(promo(adaptedMovie));
    }
  };

export const fetchCommentsAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    dispatch(commentsMovie(data));
  };

export const fetchPromoAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie>(APIRoute.Promo);
    const adaptedMoviesData = adapterMoviesToFrontEnd(data);
    dispatch(promo(adaptedMoviesData));
  };

export const fetchSimilarMoviesAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie[]>(generatePath(APIRoute.SimilarMovies.replace(':id', id.toString())));
    const adaptedMoviesData = data.map((movie) => adapterMoviesToFrontEnd(movie));
    dispatch(similarMovies(adaptedMoviesData));
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
