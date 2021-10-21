import { Reviews } from '../types/types';

const now = Date.now();
const yearAgo = now - 365 * 24 * 60 * 60 * 1000;

const getRandomInteger = (a = 0, b = 1): number => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const reviewsList: Reviews = [
  {
    id:'1',
    name: 'Kate Muir',
    date: new Date(getRandomInteger(yearAgo, now)),
    comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed films in years.',
    rating: '8,9',
  },
  {
    id:'2',
    name: 'Bill Goodykoontz',
    date: new Date(getRandomInteger(yearAgo, now)),
    comment: 'Anderson\'s films are too precious for some, but for those of us willing to lose ourselves in them, they\'re a delight. &#39;The Grand Budapest Hotel&#39; is no different, except that he has added a hint of gravitas to the mix, improving the recipe.',
    rating: '8,0',
  },
  {
    id:'3',
    name: 'Amanda Greever',
    date: new Date(getRandomInteger(yearAgo, now)),
    comment: 'I didn\'t find it amusing, and while I can appreciate the creativity, it\'s an hour and 40 minutes I wish I could take back.',
    rating: '8,0',
  },
  {
    id:'4',
    name: 'Matthew Lickona',
    date: new Date(getRandomInteger(yearAgo, now)),
    comment: 'The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.',
    rating: '7,2',
  },
  {
    id:'5',
    name: 'Paula Fleri-Soler',
    date: new Date(getRandomInteger(yearAgo, now)),
    comment: 'It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.',
    rating: '7,6',
  },
  {
    id:'6',
    name: 'Paula Fleri-Soler',
    date: new Date(getRandomInteger(yearAgo, now)),
    comment: 'It is certainly a magical and childlike way of storytelling, even if the content is a little more adult',
    rating: '7,0',
  },
];
