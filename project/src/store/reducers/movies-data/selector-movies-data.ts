import { State } from '../../../types/state';
import { NameSpace } from '../../root-reducer';
import { Movie } from '../../../types/types';

export const getMovies = (state: State): Movie[] => state[NameSpace.movies].movies;
export const getPromo = (state: State): Movie | undefined => state[NameSpace.movies].promo;
export const getSimilarMovies = (state: State): Movie[] => state[NameSpace.movies].similarMovies;
export const getIsMoviesLoaded = (state: State): boolean => state[NameSpace.movies].isMoviesLoaded;

