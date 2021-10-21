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


