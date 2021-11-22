import { datatype, date, internet, lorem, name } from 'faker';
import { Movie } from '../types/types';

const createFullName = () => `${name.firstName()} ${name.lastName()}`;

export const createMockMovie = (): Movie => {
  const starringCount = datatype.number({
    min: 3,
    max: 6,
  });

  const actors = new Array(starringCount).fill(null).map(() => createFullName());
  let count = 1;

  return {
    id: count++,
    name: lorem.words(),
    posterImage: internet.url(),
    previewImage: internet.url(),
    backgroundImage: internet.url(),
    backgroundColor: internet.color(),
    videoLink: internet.url(),
    previewVideoLink: internet.url(),
    description: lorem.paragraph(),
    rating: datatype.number(),
    scoresCount: datatype.number(),
    director: createFullName(),
    starring: actors,
    genre: lorem.word(9),
    runTime: datatype.number(),
    released: date.past().getFullYear(),
    isFavorite: datatype.boolean(),
  };
};

export const createMockMovies = (): Movie[] => {
  const moviesCount = datatype.number({
    min: 8,
    max: 8,
  });

  return new Array(moviesCount).fill(null).map(() => createMockMovie());
};

export const createStaticMockMovie = (): Movie => {
  let count = 1;

  return {
    id: count++,
    name: 'Bohemian Rhapsody',
    posterImage: 'https://8.react.pages.academy/static/film/poster/Bohemian_Rhapsody.jpg',
    previewImage: 'https://8.react.pages.academy/static/film/preview/bohemian_rhapsody.jpg',
    backgroundImage: 'https://8.react.pages.academy/static/film/background/Bohemian_Rhapsody.jpg',
    backgroundColor: '#929FA5',
    videoLink: 'http://media.xiph.org/mango/tears_of_steel_1080p.webm',
    previewVideoLink: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
    description: 'Bohemian Rhapsody is a foot-stomping celebration of Queen, their music and their extraordinary lead singer Freddie Mercury.',
    rating: 6.1,
    scoresCount: 338903,
    director: 'Bryan Singer',
    starring: ['Rami Malek','Lucy Boynton','Gwilym Lee'],
    runTime: 134,
    genre: 'Drama',
    released: 2018,
    isFavorite: true,
  };
};

export const createStaticMockMovies = (): Movie[] => {
  const moviesCount = datatype.number({
    min: 8,
    max: 8,
  });

  return new Array(moviesCount).fill(null).map(() => createMockMovie());
};
