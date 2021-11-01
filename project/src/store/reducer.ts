import {State} from '../types/state';
import { Actions, ActionType } from '../types/action';
import { Movie } from '../types/types';
import { Genres } from '../types/enum';
import { movieList } from '../mocks/movie-list';

const FIRST_LOADED_MOVIES = 8;

const initialState = {
  movies: movieList,
  genre: Genres.AllGenres,
  loadedMoviesCount: FIRST_LOADED_MOVIES,
};

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ActionType.SelectedGenre:
      return {...state, genre: action.payload as Genres};
    case ActionType.SelectedMovie:
      return {...state, movies: action.payload as Movie[]};
    default:
      return {...initialState};
  }
}
