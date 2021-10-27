import {State} from '../types/state';
import { Actions, ActionType } from '../types/action';
import { Genres } from '../types/const';
import { Movie } from '../types/types';
import { movieList } from '../mocks/movie-list';

const initialState = {
  genre: Genres.AllGenres,
  movie: movieList,
};

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ActionType.SelectedGenre:
      return {...state, genre: action.payload as Genres};
    case ActionType.SelectedMovie:
      return {...state, movie: action.payload as Movie[]};
    default:
      return {...initialState};
  }
}
