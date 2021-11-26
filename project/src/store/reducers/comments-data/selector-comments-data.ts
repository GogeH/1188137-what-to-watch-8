import { State } from '../../../types/state';
import { NameSpace } from '../../root-reducer';
import { Comment } from '../../../types/types';

export const getComments = (state: State): Comment[] => state[NameSpace.CommentsData].comments;
