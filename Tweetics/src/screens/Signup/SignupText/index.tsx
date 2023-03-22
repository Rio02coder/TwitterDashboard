import React from 'react';
import {View, Text} from 'react-native';
import {signupText} from '../../../constants';
import {signupStyles} from '../styles';

const SignupText = () => {
  return (
    <View style={signupStyles.signupTextView}>
      <Text style={signupStyles.signupText}>{signupText}</Text>
    </View>
  );
};

export default React.memo(SignupText);
