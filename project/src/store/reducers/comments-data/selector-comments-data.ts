import { State } from '../../../types/state';
import { NameSpace } from '../../root-reducer';
import { Comment } from '../../../types/types';
import { createSelector } from 'reselect';

export const getComments = (state: State): Comment[] => state[NameSpace.CommentsData].comments;

export const getCommentsSelector = createSelector(getComments, (comments) =>
  comments,
);
