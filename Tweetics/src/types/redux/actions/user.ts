import {User} from '../../User';
import GeneralAction from './general';

export enum UserActions {
  UPDATE = 'UPDATE_USER',
  LOGIN = 'LOGIN_USER',
  LOGOUT = 'LOGOUT_USER',
}

export default interface UserAction<T = User> extends GeneralAction {
  type: UserActions;
  payload: T;
}
