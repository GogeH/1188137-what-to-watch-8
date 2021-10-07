export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Card = '/myList',
  Movie = '/films/:id',
  Review = '/films/:id/review',
  Player = '/player/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
