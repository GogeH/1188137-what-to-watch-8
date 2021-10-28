import { Genres } from './enum';

export type ViewGenre = {
  genres: Genres[],
  activeGenre: Genres,
  onChangeGenre: (genre: Genres) => void,
}
