import { Genres } from '../../../types/enum';
import { FIRST_LOADED_MOVIES } from '../../../types/const';
import { ProcessMovies } from '../../../types/state';
import { Actions, ActionType } from '../../../types/action';
import { Movie } from '../../../types/types';


const initialState: ProcessMovies = {
  genre: Genres.AllGenres,
  loadedMoviesCount: FIRST_LOADED_MOVIES,
  setSelectedMovie: undefined,
  setSelectedMovieId: 0,
};

const processMovies = (state = initialState, action: Actions): ProcessMovies => {
  switch (action.type) {
    case ActionType.SetGenre:
      return {...state, genre: action.payload as Genres};
    case ActionType.SetLoadedMoviesCount:
      return {...state, loadedMoviesCount: action.payload as number};
    case ActionType.SetSelectedMovie:
      return {...state, setSelectedMovie: action.payload as Movie};
    case ActionType.SetSelectedMovieId:
      return {...state, setSelectedMovieId: action.payload as number};
    default:
      return state;
  }
};

export {processMovies};
