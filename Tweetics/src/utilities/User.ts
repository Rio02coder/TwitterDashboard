import {User} from '../types/User';
import store from '../redux/store';
import RequireAtLeastOne from '../types/RequireAtLeastOne';

export default class UserManager {
  private user: User | null;

  constructor() {
    this.user = store.getState().user;
  }

  private isUpdatingNullUser(): Error | void {
    if (!this.user) {
      return new Error('Tried updating null user');
    }
  }

  public updateCurrentUser(userToUpdate: RequireAtLeastOne<User>): User {
    this.isUpdatingNullUser();
    return {...(this.user as User), ...userToUpdate};
  }
}
