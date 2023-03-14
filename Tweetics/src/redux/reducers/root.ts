import {combineReducers, Reducer} from 'redux';
import userReducer from './user';
import {filterActions} from 'redux-ignore';
import UserAction, {UserActions} from '../../types/redux/actions/user';
import {User} from '../../types/User';

const reducer = combineReducers({
  user: filterActions(userReducer as Reducer<User>, action =>
    Object.values(UserActions).includes(action.type),
  ) as Reducer<User, UserAction>,
});

export default reducer;
