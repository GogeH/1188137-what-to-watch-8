export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Movie = '/films/:id',
  Review = '/films/:id/review',
  Player = '/player/:id',
  Card = '/myList',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Genres {
  AllGenres = 'All genres',
  Comedy = 'Comedy',
  Crime = 'Crime',
  Documentary = 'Documentary',
  Drama = 'Drama',
  Horror = 'Horror',
  Adventure = 'Adventure',
  Fantasy = 'Fantasy',
  Action = 'Action',
  Thriller = 'Thriller',
}

export enum APIRoute {
  Movies = '/films',
  Login = '/login',
  Logout = '/logout',
}
