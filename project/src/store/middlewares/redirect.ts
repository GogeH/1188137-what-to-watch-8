import browserHistory from '../../browser-history';
import { ActionType } from '../../types/action';

export const redirect: any = (_store: any) => (dispatch: any) => (action: any) => {
  if (action.type === ActionType.RedirectToRoute) {
    browserHistory.push(action.payload);
  }
  return dispatch(action);
};
