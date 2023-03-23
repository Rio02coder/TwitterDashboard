import {User} from '../User';

export type LoginRequest = {
  email: User['email'];
  password: string;
};
