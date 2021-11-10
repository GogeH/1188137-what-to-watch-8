import { AuthorizationStatus } from '../../../types/enum';
import { UserAuth } from '../../../types/state';
import { Actions, ActionType } from '../../../types/action';
import { AuthInfo } from '../../../types/types';

const initialState: UserAuth = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: {
    avatarUrl: '',
    email: '',
    id: 0,
    name: '',
    token: '',
  },
};

const userAuth = (state = initialState, action: Actions): UserAuth   => {
  switch (action.type) {
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload as AuthorizationStatus};
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    case ActionType.RequireAuthInfo:
      return { ...state, authInfo: action.payload as AuthInfo };
    default:
      return state;
  }
};

export {userAuth};
