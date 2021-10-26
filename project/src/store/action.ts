import { ActionType } from '../types/action';
import { Genres } from '../types/const';
import { Movie } from '../types/types';

export function selectedGenre(genre: Genres) {
  return ({
    type: ActionType.SelectedGenre,
    payload: genre,
  }) as const;
}

export function selectedFilms(movie: Movie[]) {
  return ({
    type: ActionType.SelectedMovie,
    payload: movie,
  }) as const;
}

