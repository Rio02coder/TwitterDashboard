import React, {useContext} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {SCROLL_OFFSET, TweetOptions, tweetScreenContext} from '../../metadata';
// import {TweetOptions, tweetScreenContext} from '../../index';
import {tweetOptionStyles} from './styles';

const TweetOptionsComponent = () => {
  const {scrollY, selectedOption, onSelectOption} =
    useContext(tweetScreenContext);
  const VIEW_Y = scrollY.interpolate({
    inputRange: [0, SCROLL_OFFSET],
    outputRange: [26, 6],
    extrapolate: 'clamp',
  });

  const isOptionSelected = (
    currentOption: TweetOptions,
    selectedOption: TweetOptions,
  ) => {
    return currentOption === selectedOption;
  };
  return (
    <Animated.View
      style={[tweetOptionStyles.view, {transform: [{translateY: VIEW_Y}]}]}>
      {Object.values(TweetOptions).map(option => (
        <TouchableOpacity
          style={tweetOptionStyles.touchableContainer}
          onPress={() => onSelectOption(option)}
          key={option}>
          <Text
            style={[
              tweetOptionStyles.text,
              isOptionSelected(option, selectedOption)
                ? tweetOptionStyles.selectedText
                : tweetOptionStyles.unSelectedText,
            ]}
            key={option}>
            {option}
          </Text>
          {isOptionSelected(option, selectedOption) ? (
            <View style={tweetOptionStyles.selectedTextView} />
          ) : (
            <></>
          )}
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

export default React.memo(TweetOptionsComponent);
