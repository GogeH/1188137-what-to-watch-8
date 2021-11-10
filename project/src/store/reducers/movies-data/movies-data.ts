import { EMPTY_FILM } from '../../../types/const';
import { MoviesData } from '../../../types/state';
import { Actions, ActionType } from '../../../types/action';
import { MovieFromServer } from '../../../types/types';

const initialState: MoviesData = {
  moviesFromServer: [],
  loadPromo: EMPTY_FILM,
  loadSimilarMovies: [],
  isMoviesLoaded: false,
};

const moviesData = (state = initialState, action: Actions): MoviesData => {
  switch (action.type) {
    case ActionType.LoadMovies:
      return {...state, moviesFromServer: action.payload as MovieFromServer[], isMoviesLoaded: true};
    case ActionType.LoadPromo:
      return {...state, loadPromo: action.payload as MovieFromServer};
    case ActionType.LoadSimilarMovies:
      return {...state, loadSimilarMovies: action.payload as MovieFromServer[]};


    default:
      return state;
  }
};

export {moviesData};
