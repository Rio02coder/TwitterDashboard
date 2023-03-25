import React from 'react';
import {View, Text} from 'react-native';
import {Tweet as TweetType} from '../../types/Tweet';
import {tweetStyles} from './styles';
import UserMetadata from './UserMetadata';

type TProps = {
  tweet: TweetType;
};

const Tweet = ({tweet}: TProps) => {
  return (
    <View style={tweetStyles.container}>
      <UserMetadata />
      <Text style={tweetStyles.tweetText}>{tweet.text}</Text>
    </View>
  );
};

export default React.memo(Tweet);
