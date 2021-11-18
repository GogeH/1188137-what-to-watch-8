import { moviesData } from './movies-data';
import { ActionType } from '../../../types/action';
import { MoviesData } from '../../../types/state';
import { createMockMovie, createMockMovies } from '../../../mocks/movieFake';

const mockMovies = createMockMovies();
const mockMovie = createMockMovie();

describe('Reducer: movies-data', () => {
  const state: MoviesData = {
    movies: [],
    promo: undefined,
    similarMovies: [],
    isMoviesLoaded: false,
  }

  it('should return list movies', ()=> {
    const action = {
      type: ActionType.LoadMovies,
      payload: mockMovies,
    };

    expect(moviesData(state, action))
      .toEqual({
        movies: mockMovies,
        promo: undefined,
        similarMovies: [],
        isMoviesLoaded: true,
      });
  });

  it('should return promo movie', ()=> {
    const action = {
      type: ActionType.LoadPromo,
      payload: mockMovie,
    };

    expect(moviesData(state, action))
      .toEqual({
        movies: [],
        promo: mockMovie,
        similarMovies: [],
        isMoviesLoaded: false,
      });
  });

  it('should return similar movies', ()=> {
    const action = {
      type: ActionType.LoadSimilarMovies,
      payload: mockMovies,
    };

    expect(moviesData(state, action))
      .toEqual({
        movies: [],
        promo: undefined  ,
        similarMovies: mockMovies,
        isMoviesLoaded: false,
      });
  });
});
