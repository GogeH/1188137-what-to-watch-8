import { State } from '../../../types/state';
import { NameSpace } from '../../root-reducer';
import { Genres } from '../../../types/enum';
import { MovieFromServer } from '../../../types/types';

export const getGenre = (state: State): Genres => state[NameSpace.moviesProcess].genre;
export const getLoadedMoviesCount = (state: State): number => state[NameSpace.moviesProcess].loadedMoviesCount;
export const getLoadSelectedMovie = (state: State): MovieFromServer => state[NameSpace.moviesProcess].loadSelectedMovie;
export const getSetSelectedMovieId = (state: State): number => state[NameSpace.moviesProcess].setSelectedMovieId;
