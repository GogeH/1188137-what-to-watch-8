export const BACKEND_URL = 'https://8.react.pages.academy/wtw';

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Movie = '/films/:id',
  Review = '/films/:id/review',
  Player = '/player/:id',
  MyList = '/myList',
}

export enum APIRoute {
  Movies = '/films',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Promo = '/promo',
  SimilarMovies = '/films/{id}/similar',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Genres {
  AllGenres = 'All genres',
  Comedy = 'Comedies',
  Crime = 'Crime',
  Documentary = 'Documentary',
  Drama = 'Dramas',
  Horror = 'Horror',
  KidsAndFamily = 'Kids & Family',
  Adventure = 'Adventure',
  Fantasy = 'Fantasy',
  Action = 'Action',
  Thriller = 'Thrillers',
}

