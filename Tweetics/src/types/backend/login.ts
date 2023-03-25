import {Use} from 'react-native-svg';
import {User} from '../User';

export type LoginRequest = {
  email: User['email'];
  password: string;
};

export type BackendLoginResponse = {
  token: User['token'];
  user: {
    first_name: User['first_name'];
    last_name: User['last_name'];
    twitter_name: User['twitter_name'];
    email: User['email'];
    recent_tweets: User['recent_tweets'];
    last_month_tweets: User['last_month_tweets'];
    flu_application: User['flu_application'];
    recent_prediction?: User['recent_prediction'];
    last_month_prediction?: User['last_month_prediction'];
    is_verified: User['is_verified'];
  };
};
