import React, {useCallback, useContext, useState} from 'react';
import {
  FlatList,
  Animated,
  View,
  RefreshControl,
  ScrollView,
  Dimensions,
} from 'react-native';
import Tweet from '../../../components/Tweet';
import store from '../../../redux/store';
import {Tweet as TweetType} from '../../../types/Tweet';
import {tweetScreenContext} from '../metadata';
import {tweetListStyles} from './styles';

type TProps = {
  refreshAction: () => Promise<void | undefined>;
  noDataContent: JSX.Element;
};

const TweetList = ({refreshAction, noDataContent}: TProps) => {
  const {tweets, scrollY} = useContext(tweetScreenContext);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = () => {
    setRefreshing(true);
    refreshAction().then(() => setRefreshing(false));
  };

  const canListBeShown = () => {
    if (!tweets) {
      return false;
    }
    if (tweets.length <= 0) {
      return false;
    }
    return true;
  };

  return canListBeShown() ? (
    <FlatList
      data={tweets}
      keyExtractor={tweet => tweet.id.toString()}
      renderItem={({item}) => <Tweet tweet={item} />}
      showsVerticalScrollIndicator={true}
      indicatorStyle={'white'}
      contentContainerStyle={{paddingTop: '4%', paddingHorizontal: '2%'}}
      decelerationRate={'fast'}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        useNativeDriver: false,
      })}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={'white'}
          colors={['white']}
        />
      }
    />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={'white'}
          colors={['white']}
        />
      }
      style={tweetListStyles.emptyView}>
      {noDataContent}
    </ScrollView>
  );
};

export default React.memo(TweetList);
