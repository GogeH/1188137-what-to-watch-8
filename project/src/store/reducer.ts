import { Actions, ActionType } from '../types/action';
import { AuthInfo, CommentsFromServer, MovieFromServer } from '../types/types';
import { Genres } from '../types/enum';
import { EMPTY_FILM, FIRST_LOADED_MOVIES } from '../types/const';
import { AuthorizationStatus } from '../types/enum';

export type State = {
  genre: Genres,
  loadedMoviesCount: number,
  authorizationStatus: AuthorizationStatus,
  moviesFromServer: MovieFromServer[],
  isMoviesLoaded: boolean,
  authInfo: AuthInfo,
  loadComments: CommentsFromServer[],
  loadPromo: MovieFromServer,
  loadSimilarMovies: MovieFromServer[],
  loadSelectedMovie: MovieFromServer,
};

const initialState = {
  genre: Genres.AllGenres,
  loadedMoviesCount: FIRST_LOADED_MOVIES,
  authorizationStatus: AuthorizationStatus.Unknown,
  moviesFromServer: [],
  isMoviesLoaded: false,
  authInfo: {
    avatarUrl: '',
    email: '',
    id: 0,
    name: '',
    token: '',
  },
  loadComments: [],
  loadPromo: EMPTY_FILM,
  loadSimilarMovies: [],
  loadSelectedMovie: EMPTY_FILM,
};

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ActionType.SelectGenre:
      return {...state, genre: action.payload as Genres};
    case ActionType.LoadMovies:
      return {...state, moviesFromServer: action.payload as MovieFromServer[], isMoviesLoaded: true};
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload as AuthorizationStatus};
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    case ActionType.RequireAuthInfo:
      return { ...state, authInfo: action.payload as AuthInfo };
    case ActionType.SetLoadedMoviesCount:
      return {...state, loadedMoviesCount: action.payload as number};
    case ActionType.LoadComments:
      return {...state, loadComments: action.payload as CommentsFromServer[]};
    case ActionType.LoadPromo:
      return {...state, loadPromo: action.payload as MovieFromServer};
    case ActionType.LoadSimilarMovies:
      return {...state, loadSimilarMovies: action.payload as MovieFromServer[]};
    case ActionType.LoadSelectedMovie:
      return {...state, loadSelectedMovie: action.payload as MovieFromServer};
    default:
      return state;
  }
}
