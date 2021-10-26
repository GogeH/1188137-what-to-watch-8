import { Genres } from './const';

export type GenreType = {
  genres: Genres[],
  activeGenre: Genres,
  onChangeGenre: (genre: Genres) => void,
}
