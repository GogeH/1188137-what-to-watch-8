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
  isFavorite: boolean,
  comment: Comment,
}

export type Comment = {
  id: string,
  user: {
    id: string,
    name: string
  },
  rating: number,
  comment: string,
}

export type FilmCards = FilmCard[];
export type Comments = Comment[];
