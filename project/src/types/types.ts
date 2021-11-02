import {Genres} from './enum';

export type MovieFromServer = {
  'id': number,
  'name': string,
  'posterImage': string,
  'previewImage': string,
  'backgroundImage': string,
  'backgroundColor': string,
  'videoLink': string,
  'previewVideoLink': string,
  'description': string,
  'rating': number,
  'scoresCount': number,
  'director': string,
  'starring': string[],
  'runTime': number,
  'genre': Genres,
  'released': number,
  'isFavorite': boolean,
};

export type Review = {
  id: string,
  name: string,
  date: Date,
  comment: string,
  rating: string,
}

export type Promo = {
  name: string,
  genre: string,
  release: number,
}

export type AuthData = {
  login: string;
  password: string;
};

export type MovieParam = {
  id: string;
}
