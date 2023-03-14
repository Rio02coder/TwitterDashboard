import {Tweet} from './Tweet';
import {Token} from './Token';

export type User = {
  token: Token;
  first_name: string;
  last_name: string;
  twitter_name: string;
  email: string;
  recent_tweets: Tweet[];
  last_month_tweets: Tweet[];
  recent_prediction?: number;
  last_month_prediction?: number;
};
