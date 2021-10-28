import {Genres} from './enum';

export type Movie = {
  id: string,
  title: string,
  genre: Genres,
  released: number,
  imgSrc: string,
  backgroundImage: string,
  backgroundColor: string,
  link: string,
  previewLink: string,
  rating: number,
  grade: string,
  count: number,
  description: string,
  director: string,
  starring: string[],
  runTime: string,
  isFavorite: boolean,
}

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


