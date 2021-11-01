import { ActionType } from '../types/action';
import { Movie, MovieFromServer } from '../types/types';
import { Genres } from '../types/enum';

type Action<T> = {
  type: string,
  payload: T,
}

function selectedGenre(genre: Genres): Action<Genres> {
  return ({
    type: ActionType.SelectedGenre,
    payload: genre,
  }) as const;
}

function selectedMovie(movie: Movie[]): Action<Movie[]> {
  return ({
    type: ActionType.SelectedMovie,
    payload: movie,
  }) as const;
}

function loadMovies(movies: MovieFromServer[]): Action<MovieFromServer[]> {
  return ({
    type: ActionType.LoadMovies,
    payload: movies,
  });
}

export {
  selectedGenre,
  selectedMovie,
  loadMovies
};
