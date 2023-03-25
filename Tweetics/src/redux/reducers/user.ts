import {Reducer} from 'redux';
import UserAction, {UserActions} from '../../types/redux/actions/user';
import {Token} from '../../types/Token';
import {User} from '../../types/User';
import {
  addUserTokenToMemory,
  deleteTokenFromMemory,
} from '../../utilities/ManageSession/user';

// The reason for null is because initially the user might not be present.
// Example situations are before login and after logout.

export type ReducerType = Reducer<User | null, UserAction<User | null>>;

const reducer: ReducerType = (state = null, action): User | null => {
  switch (action.type) {
    case UserActions.LOGIN:
      addUserTokenToMemory(action.payload?.token as Token);
      return action.payload as User;
    case UserActions.LOGOUT:
      deleteTokenFromMemory();
      return null;
    case UserActions.UPDATE:
      return {...state, ...action.payload} as User;
    default:
      return state;
  }
};

export default reducer;
