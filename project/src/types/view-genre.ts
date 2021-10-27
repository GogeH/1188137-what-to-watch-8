import { Genres } from './const';

export type ViewGenre = {
  genres: Genres[],
  activeGenre: Genres,
  onChangeGenre: (genre: Genres) => void,
}
