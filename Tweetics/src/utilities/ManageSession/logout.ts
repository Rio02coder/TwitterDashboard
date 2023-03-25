import {ReduxProps} from '../../types/redux/props';
import {deleteTokenFromMemory} from './user';

export const manageLogoutSession = (props: ReduxProps) => {
  props.logoutUser();
};
