import React, {useContext} from 'react';
import {Animated, Image, Platform, Text, View} from 'react-native';
import {SCROLL_OFFSET, tweetScreenContext} from '../metadata';
import {headerStyles} from './styles';
import TweetOptionsComponent from './TweetOptionsComponent';

type TProps = {
  offset: Animated.Value;
};

const Header = () => {
  const {scrollY} = useContext(tweetScreenContext);

  const IMAGE_Y_OFFSET = Platform.OS === 'ios' ? -30 : -40;

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
