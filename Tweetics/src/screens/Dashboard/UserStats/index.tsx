import React from 'react';
import {View} from 'react-native';
import store from '../../../redux/store';
import Stat from './Stat';
import {userStatsStyle} from './styles';

const UserStats = () => {
  const user = store.getState().user;
  return (
    <View style={userStatsStyle.container}>
      <Stat keyToDisplay="Email" value={user.email} />
      <Stat
        keyToDisplay="Recent Tweets"
        value={user.recent_tweets.length.toString()}
      />
      <Stat
        keyToDisplay="Last Month Tweets"
        value={user.last_month_tweets.length.toString()}
      />
    </View>
  );
};

export default React.memo(UserStats);
