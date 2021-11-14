import { State } from '../../../types/state';
import { NameSpace } from '../../root-reducer';
import { Genres } from '../../../types/enum';
import { Movie } from '../../../types/types';

export const getGenre = (state: State): Genres => state[NameSpace.moviesProcess].genre;
export const getLoadedMoviesCount = (state: State): number => state[NameSpace.moviesProcess].loadedMoviesCount;
export const getSelectedMovie = (state: State): Movie | undefined => state[NameSpace.moviesProcess].selectedMovie;
export const getSelectedMovieId = (state: State): number => state[NameSpace.moviesProcess].selectedMovieId;
