import { ActionType } from '../types/action';
import { Genres } from '../types/const';
import { Movie } from '../types/types';

type selectedType<T> = {
  type: string,
  payload: T,
}

function selectedGenre(genre: Genres): selectedType<Genres> {
  return ({
    type: ActionType.SelectedGenre,
    payload: genre,
  }) as const;
}

function selectedMovie(movie: Movie[]): selectedType<Movie[]> {
  return ({
    type: ActionType.SelectedMovie,
    payload: movie,
  }) as const;
}

export {
  selectedGenre,
  selectedMovie
};
