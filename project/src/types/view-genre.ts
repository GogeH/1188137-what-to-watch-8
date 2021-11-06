import { Genres } from './enum';

export type ViewGenre = {
  genres: Genres[],
  activeGenre: Genres,
  onGenreChange: (genre: Genres) => void,
}
