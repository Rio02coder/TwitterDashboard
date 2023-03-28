import Config from 'react-native-config';
console.log('Config', Config.BASEURL);

export const URLS = {
  BASE: Config.BASEURL,
  AUTHENTICATION: {
    signup: 'user/signup/',
    login: 'user/login/',
    refreshToken: 'user/token/refresh/',
    logout: 'user/logout/',
  },
  USER: {
    profile: 'user/profile/',
    recentTweets: 'user/tweets/',
    lastMonthTweets: 'user/tweets_last_month/',
    fluPrediction: 'user/prediction/',
    fluApplication: 'user/application/',
    fluPredictionSearch: 'user/flu_search/',
  },
};

export const PORT = '8000';
