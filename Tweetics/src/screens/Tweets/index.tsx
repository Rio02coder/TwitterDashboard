import React, {createContext, useRef, useState} from 'react';
import {Animated, SafeAreaView, Text} from 'react-native';
import connector from '../../redux/connector';
import {retriever} from '../../service/contacter/retriever';
import {URLS} from '../../service/urls';
import {ScreenProps} from '../../types/Screen';
import {ScreenNames} from '../../types/ScreenNames';
import {BackendLastMonthTweets, BackendRecentTweets} from '../../types/Tweet';
import appStyle from '../styles/appStyle';
import Header from './Header';
import {TweetOptions, tweetScreenContext, TweetScreenContext} from './metadata';
import TweetList from './TweetList';

const TweetScreen = (props: ScreenProps<ScreenNames.Tweets>) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedOption, updateSelectedOption] = useState<TweetOptions>(
    TweetOptions.RECENT,
  );
  const getTweets = () => {
    // console.log(props.user.recent_tweets);
    switch (selectedOption) {
      case TweetOptions.RECENT:
        return props.user.recent_tweets;
      case TweetOptions.LAST_MONTH:
        return props.user.last_month_tweets;
      default:
        return [];
    }
  };
  const getRefreshAction = () => {
    switch (selectedOption) {
      case TweetOptions.RECENT:
        return () =>
          retriever<BackendRecentTweets, void>(
            URLS.USER.recentTweets + 'true/',
            props,
            tweets => props.updateUser({recent_tweets: tweets.recent_tweets}),
          );
      case TweetOptions.LAST_MONTH:
        return () =>
          retriever<BackendLastMonthTweets, void>(
            URLS.USER.lastMonthTweets,
            props,
            tweets => {
              props.updateUser({last_month_tweets: tweets.last_month_tweets});
            },
          );
    }
  };
  const getNoDataContent = () => {
    switch (selectedOption) {
      case TweetOptions.RECENT:
        return (
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>
            {'Seems like you have no \n recent interactions on twitter'}
          </Text>
        );
      case TweetOptions.LAST_MONTH:
        return (
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>
            {'Seems like you have no \n last month activity on twitter'}
          </Text>
        );
    }
  };
  return (
    <tweetScreenContext.Provider
      value={{
        selectedOption,
        onSelectOption: option => updateSelectedOption(option),
        scrollY,
        tweets: getTweets(),
      }}>
      <SafeAreaView style={[appStyle.background, {flex: 1}]}>
        <Header />
        <TweetList
          noDataContent={getNoDataContent()}
          refreshAction={getRefreshAction()}
        />
      </SafeAreaView>
    </tweetScreenContext.Provider>
  );
};

export default connector(TweetScreen);
