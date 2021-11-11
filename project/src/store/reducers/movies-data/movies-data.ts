import { MoviesData } from '../../../types/state';
import { Actions, ActionType } from '../../../types/action';
import { Movie } from '../../../types/types';

const initialState: MoviesData = {
  movies: [],
  promo: undefined,
  similarMovies: [],
  isMoviesLoaded: false,
};

const moviesData = (state = initialState, action: Actions): MoviesData => {
  switch (action.type) {
    case ActionType.Movies:
      return {...state, movies: action.payload as Movie[], isMoviesLoaded: true};
    case ActionType.Promo:
      return {...state, promo: action.payload as Movie};
    case ActionType.SimilarMovies:
      return {...state, similarMovies: action.payload as Movie[]};


    default:
      return state;
  }
};

export {moviesData};
