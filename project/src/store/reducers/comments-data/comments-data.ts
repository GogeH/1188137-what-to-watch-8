import { CommentsData } from '../../../types/state';
import { Actions, ActionType } from '../../../types/action';
import { CommentsFromServer } from '../../../types/types';

const initialState: CommentsData = {
  loadComments: [],
};

const commentsData = (state = initialState, action: Actions): CommentsData => {
  switch (action.type) {
    case ActionType.LoadComments:
      return {...state, loadComments: action.payload as CommentsFromServer[]};
    default:
      return state;
  }
};

export {commentsData};
