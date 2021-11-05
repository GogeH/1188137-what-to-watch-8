export const INCREMENT_MOVIES_STEP = 8;

export const FIRST_LOADED_MOVIES = 8;

type Item = {
  id: number,
}

type User = Item & {
  name: string,
}

export type Review = Item & {
  user: User,
  rating: number,
  comment: string,
  date: Date,
}
