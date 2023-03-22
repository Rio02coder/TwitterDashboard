import React from 'react';
import {View, Text} from 'react-native';
import {joinText} from '../../../constants';
import {loginStyles} from '../styles';

const JoinText = () => {
  return (
    <View style={loginStyles.joinTextView}>
      <Text style={loginStyles.joinText}>{joinText}</Text>
    </View>
  );
};

export default React.memo(JoinText);
