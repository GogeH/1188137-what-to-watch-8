import {ThunkActionResult} from '../types/action';
import { loadMovies } from './action';
import { APIRoute } from '../types/enum';
import { MovieFromServer } from '../types/types';
import { adapterMoviesToFrontEnd } from '../utils/adapter-movies-to-front-end';

export const fetchMoviesAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<MovieFromServer[]>(APIRoute.Movies);
    const adaptedMoviesData = data.map((movie) => adapterMoviesToFrontEnd(movie));
    dispatch(loadMovies(adaptedMoviesData));
  };
