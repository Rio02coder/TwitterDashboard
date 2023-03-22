import React from 'react';
import {Keyboard, SafeAreaView, TouchableWithoutFeedback} from 'react-native';
import Header from '../../../components/header';
import connector from '../../../redux/connector';
import {ScreenProps} from '../../../types/Screen';
import {ScreenNames} from '../../../types/ScreenNames';
import SignupText from '../SignupText';
import StepCount from '../StepCount';
import {signupStyles} from '../styles';
import Form from './Form';

const EmailScreen = ({navigation}: ScreenProps<ScreenNames.Email>) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <SafeAreaView style={signupStyles.mainContainer}>
        <Header />
        <SignupText />
        <StepCount step={1} />
        <Form navigation={navigation} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default connector(EmailScreen);
