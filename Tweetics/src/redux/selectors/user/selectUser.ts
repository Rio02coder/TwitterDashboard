import {createSelector} from 'reselect';
import RootState from '../../../types/redux/states/root';
import {User} from '../../../types/User';

export const selectUser = createSelector(
  (state: RootState): User => state.user,
  e => e,
);
