import { Genres } from './enum';

export const INCREMENT_MOVIES_STEP = 8;

export const FIRST_LOADED_MOVIES = 8;

export const EMPTY_FILM = {
  id: -1,
  name: 'UNKNOWN',
  posterImage: 'UNKNOWN',
  previewImage: 'UNKNOWN',
  backgroundImage: 'UNKNOWN',
  backgroundColor: 'UNKNOWN',
  videoLink: 'UNKNOWN',
  previewVideoLink: 'UNKNOWN',
  description: 'UNKNOWN',
  rating: -1,
  scoresCount: 0,
  director: 'UNKNOWN',
  starring: ['UNKNOWN'],
  runTime: 0,
  genre: Genres.AllGenres,
  released: 0,
  isFavorite: false,
};

