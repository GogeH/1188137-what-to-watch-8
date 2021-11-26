import { State } from '../../../types/state';
import { NameSpace } from '../../root-reducer';
import { Movie } from '../../../types/types';

export const getMovies = (state: State): Movie[] => state[NameSpace.MoviesData].movies;
export const getPromo = (state: State): Movie | undefined => state[NameSpace.MoviesData].promo;
export const getSimilarMovies = (state: State): Movie[] => state[NameSpace.MoviesData].similarMovies;
