import {Reducer} from 'redux';
import UserAction, {UserActions} from '../../types/redux/actions/user';
import {User} from '../../types/User';

// The reason for null is because initially the user might not be present.
// Example situations are before login and after logout.

export type ReducerType = Reducer<User | null, UserAction<User | null>>;

const reducer: ReducerType = (state = null, action): User | null => {
  switch (action.type) {
    case UserActions.LOGIN:
      return action.payload as User;
    case UserActions.LOGOUT:
      return null;
    case UserActions.UPDATE:
      return {...state, ...action.payload} as User;
    default:
      return state;
  }
};

export default reducer;