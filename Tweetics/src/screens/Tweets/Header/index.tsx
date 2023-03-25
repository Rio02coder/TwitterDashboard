import React, {useContext} from 'react';
import {Animated, Image, Text, View} from 'react-native';
import {tweetScreenContext} from '../metadata';
import {headerStyles} from './styles';
import TweetOptionsComponent from './TweetOptionsComponent';

export const SCROLL_OFFSET = 160;

type TProps = {
  offset: Animated.Value;
};

const Header = () => {
  const {scrollY} = useContext(tweetScreenContext);

  const HEADER_HEIGHT = scrollY.interpolate({
    inputRange: [0, SCROLL_OFFSET],
    outputRange: [80, 60],
    extrapolate: 'clamp',
  });

  const IMAGE_OPACITY = scrollY.interpolate({
    inputRange: [0, SCROLL_OFFSET],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const IMAGE_Y_TRANSLATE = scrollY.interpolate({
    inputRange: [0, SCROLL_OFFSET],
    outputRange: [-5, -30],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[headerStyles.header, {height: HEADER_HEIGHT}]}>
      <Animated.Image
        source={require('../../../icons/AppLogoBlue.png')}
        style={{
          alignSelf: 'center',
          opacity: IMAGE_OPACITY,
          transform: [{translateY: IMAGE_Y_TRANSLATE}],
        }}
      />
      <TweetOptionsComponent />
    </Animated.View>
  );
};

export default React.memo(Header);
