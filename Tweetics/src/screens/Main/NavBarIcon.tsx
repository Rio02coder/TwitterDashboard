import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {ScreenNames} from '../../types/ScreenNames';

const defaultStyle = StyleSheet.create({
  image: {
    height: 25,
    width: 25,
  },
});

const getNavBarIcon = (
  name: ScreenNames,
  focused: boolean,
): React.ReactNode => {
  switch (name) {
    case ScreenNames.Tweets: {
      return focused ? (
        <Image
          source={require('../../icons/TweetScreenIconFocused.png')}
          style={defaultStyle.image}
        />
      ) : (
        <Image
          source={require('../../icons/TweetScreenIconUnfocused.png')}
          style={defaultStyle.image}
        />
      );
    }
    case ScreenNames.Prediction: {
      return focused ? (
        <Image
          source={require('../../icons/FluPredictionFocused.png')}
          style={defaultStyle.image}
        />
      ) : (
        <Image
          source={require('../../icons/FluPredictionUnfocused.png')}
          style={defaultStyle.image}
        />
      );
    }
    case ScreenNames.SearchPrediction: {
      return focused ? (
        <Image
          source={require('../../icons/PredictionSearchFocused.png')}
          style={defaultStyle.image}
        />
      ) : (
        <Image
          source={require('../../icons/PredictionSearchUnfocused.png')}
          style={defaultStyle.image}
        />
      );
    }
    case ScreenNames.Dashboard: {
      return focused ? (
        <Image
          source={require('../../icons/UserFocused.png')}
          style={defaultStyle.image}
        />
      ) : (
        <Image
          source={require('../../icons/UserUnfocused.png')}
          style={defaultStyle.image}
        />
      );
    }
    default:
      return <></>;
  }
};

export default getNavBarIcon;
