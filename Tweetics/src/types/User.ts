import {Tweet} from './Tweet';
import {Token} from './Token';
import {Application} from './Application';

export type User = {
  token: Token;
  first_name: string;
  last_name: string;
  twitter_name: string;
  email: string;
  recent_tweets: Tweet[];
  last_month_tweets: Tweet[];
  flu_application: Application | null;
  recent_prediction?: number;
  last_month_prediction?: number;
  is_verified: boolean;
};
