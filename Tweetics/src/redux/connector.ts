import {connect} from 'react-redux';
import RootState from '../types/redux/states/root';
import RequireAtLeastOne from '../types/RequireAtLeastOne';
import {User} from '../types/User';
import UserManager from '../utilities/User';
import generateUserAction from './actions/user';

const mapState = (state: RootState) => ({
  user: state.user,
});

const userManager = new UserManager();

const mapDispatch = {
  updateUser: (user: RequireAtLeastOne<User>) =>
    generateUserAction.update(userManager.updateCurrentUser(user)),
  loginUser: (user: User) => generateUserAction.login(user),
  logoutUser: () => generateUserAction.logout(),
};
const connector = connect(mapState, mapDispatch);

export default connector;
