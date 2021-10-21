export type FilmCard = {
  id: string,
  title: string,
  genre: string,
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

export type FilmCards = FilmCard[];
export type Reviews = Review[];
