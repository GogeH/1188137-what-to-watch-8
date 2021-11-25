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
  SimilarMovies = '/films/:id/similar',
  FavoriteMovies = '/favorite',
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
  Dramas = 'Drama',
  Horror = 'Horror',
  KidsAndFamily = 'Kids & Family',
  Adventure = 'Adventure',
  Fantasy = 'Fantasy',
  Action = 'Action',
  Thriller = 'Thrillers',
}

export enum FavoriteStatus {
  Favorite = 1,
  NotFavorite = 0,
}

export type ValuesOf<T> = T[keyof T];

export type FavoriteStatusType = ValuesOf<typeof FavoriteStatus>;
