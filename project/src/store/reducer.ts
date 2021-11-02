import { State } from '../types/state';
import { Actions, ActionType } from '../types/action';
import { MovieFromServer} from '../types/types';
import { Genres } from '../types/enum';
import { FIRST_LOADED_MOVIES } from '../types/const';
import { AuthorizationStatus } from '../types/enum';

const initialState = {
  genre: Genres.AllGenres,
  loadedMoviesCount: FIRST_LOADED_MOVIES,
  authorizationStatus: AuthorizationStatus.Unknown,
  moviesFromServer: [],
  isMoviesLoaded: false,
  isAuthorization: false,
};

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ActionType.SelectGenre:
      return {...state, genre: action.payload as Genres};
    case ActionType.LoadMovies:
      return {...state, moviesFromServer: action.payload as MovieFromServer[], isMoviesLoaded: true};
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload as AuthorizationStatus, isAuthorization: true};
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    case ActionType.SetLoadedMoviesCount:
      return {...state, loadedMoviesCount: action.payload as number};
    default:
      return {...initialState};
  }
}
