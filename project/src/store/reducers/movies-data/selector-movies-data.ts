import { State } from '../../../types/state';
import { NameSpace } from '../../root-reducer';
import { MovieFromServer } from '../../../types/types';

export const getMoviesFromServer = (state: State): MovieFromServer[] => state[NameSpace.movies].moviesFromServer;
export const getLoadPromo = (state: State): MovieFromServer => state[NameSpace.movies].loadPromo;
export const getLoadSimilarMovies = (state: State): MovieFromServer[] => state[NameSpace.movies].loadSimilarMovies;
export const getIsMoviesLoaded = (state: State): boolean => state[NameSpace.movies].isMoviesLoaded;

