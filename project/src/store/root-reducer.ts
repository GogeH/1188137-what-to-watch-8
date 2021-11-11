import { combineReducers } from '@reduxjs/toolkit';
import { moviesData } from './reducers/movies-data/movies-data';
import { commentsData } from './reducers/comments-data/comments-data';
import { userAuth } from './reducers/user-auth/user-auth';
import { processMovies } from './reducers/process-movies/process-movies';

export enum NameSpace {
  movies = 'MOVIES_DATA',
  comments = 'COMMENTS_DATA',
  user = 'USER_AUTH',
  moviesProcess = 'PROCESS_MOVIES',
}

export const rootReducer = combineReducers({
  [NameSpace.movies]: moviesData,
  [NameSpace.comments]: commentsData,
  [NameSpace.user]: userAuth,
  [NameSpace.moviesProcess]: processMovies,
});

export type RootState = ReturnType<typeof rootReducer>;
