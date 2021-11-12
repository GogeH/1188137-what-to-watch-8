import {Genres} from './enum';

export type Movie = {
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

export type ServerMovie = {
  id: number;
  name: string;
  'poster_image': string;
  'preview_image': string;
  'background_image': string;
  'background_color': string;
  'video_link': string;
  'preview_video_link': string;
  description: string;
  rating: number;
  'scores_count': number;
  director: string;
  starring: string[];
  'run_time': number;
  genre: string;
  released: number;
  'is_favorite': boolean;
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

export type Comment = {
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

export type PostedComment = {
  rating: number,
  comment: string,
};


