import { Genres } from '../../../types/enum';
import { EMPTY_FILM, FIRST_LOADED_MOVIES } from '../../../types/const';
import { ProcessMovies } from '../../../types/state';
import { Actions, ActionType } from '../../../types/action';
import { MovieFromServer } from '../../../types/types';

const initialState: ProcessMovies = {
  genre: Genres.AllGenres,
  loadedMoviesCount: FIRST_LOADED_MOVIES,
  loadSelectedMovie: EMPTY_FILM,
  setSelectedMovieId: 0,
};

const processMovies = (state = initialState, action: Actions): ProcessMovies => {
  switch (action.type) {
    case ActionType.SelectGenre:
      return {...state, genre: action.payload as Genres};
    case ActionType.SetLoadedMoviesCount:
      return {...state, loadedMoviesCount: action.payload as number};
    case ActionType.LoadSelectedMovie:
      return {...state, loadSelectedMovie: action.payload as MovieFromServer};
    case ActionType.SetSelectedMovieId:
      return {...state, setSelectedMovieId: action.payload as number};
    default:
      return state;
  }
};

export {processMovies};
