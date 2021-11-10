import { State } from '../../../types/state';
import { NameSpace } from '../../root-reducer';
import { CommentsFromServer } from '../../../types/types';

export const getLoadComments = (state: State): CommentsFromServer[] => state[NameSpace.comments].loadComments;
