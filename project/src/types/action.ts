import {selectedMovie, selectedGenre} from '../store/action';

export enum ActionType {
  SelectedGenre = 'change/selectedGenre',
  SelectedMovie = 'change/selectedMovie',
}

export type Actions = ReturnType<typeof selectedGenre> | ReturnType<typeof selectedMovie>;
