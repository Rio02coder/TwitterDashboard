export type Tweet = {
  id: number;
  text: string;
};

export type BackendRecentTweets = {
  recent_tweets: Tweet[];
};

export type BackendLastMonthTweets = {
  last_month_tweets: Tweet[];
};
