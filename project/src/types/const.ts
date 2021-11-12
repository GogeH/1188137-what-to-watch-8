export const INCREMENT_MOVIES_STEP = 8;

export const FIRST_LOADED_MOVIES = 8;

export const FavoriteStatus = {
  Favorite: 1,
  NotFavorite: 0,
} as const;

export type ValuesOf<T> = T[keyof T];

export type FavoriteStatusType = ValuesOf<typeof FavoriteStatus>;


