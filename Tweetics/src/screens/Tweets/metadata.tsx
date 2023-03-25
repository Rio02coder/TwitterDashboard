import {createContext} from 'react';
import {Animated} from 'react-native';
import {Tweet} from '../../types/Tweet';

export enum TweetOptions {
  RECENT = 'New Tweets',
  LAST_MONTH = 'Last Month',
}

export type TweetScreenContext = {
  selectedOption: TweetOptions;
  onSelectOption: (option: TweetOptions) => void;
  scrollY: Animated.Value;
  tweets: Tweet[];
};

export const tweetScreenContext = createContext<TweetScreenContext>({
  selectedOption: TweetOptions.RECENT,
  onSelectOption: option => {},
  scrollY: new Animated.Value(0),
  tweets: [],
});
