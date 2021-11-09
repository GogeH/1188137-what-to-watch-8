import {Genres} from './enum';

export type MovieFromServer = {
  id: number,
  name: string,
  posterImage: string,
  previewImage: string,
  backgroundImage: string,
  backgroundColor: string,
  videoLink: string,
  previewVideoLink: string,
  description: string,
  rating: number,
  scoresCount: number,
  director: string,
  starring: string[],
  runTime: number,
  genre: Genres,
  released: number,
  isFavorite: boolean,
};

export type AuthInfo = {
  avatarUrl: string,
  email: string,
  id: number,
  name: string,
  token: string,
};

export type ServerAuthInfo = {
  'avatar_url': string,
  email: string,
  id: number,
  name: string,
  token: string,
};

export type CommentsFromServer = {
  id: number,
  user: {
    id: number,
    name: string,
  },
  rating: number,
  comment: string,
  date: Date,
}

export type AuthData = {
  login: string;
  password: string;
};

export type MovieParam = {
  id: string;
}

export type CommentToServer = {
  rating: number,
  comment: string,
};
