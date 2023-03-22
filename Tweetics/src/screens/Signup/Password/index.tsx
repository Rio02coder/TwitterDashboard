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

const PasswordScreen = ({
  navigation,
  route,
}: ScreenProps<ScreenNames.Password>) => {
  const twitterName = route.params.twitterName;
  console.log(twitterName);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <SafeAreaView style={signupStyles.mainContainer}>
        <Header />
        <SignupText />
        <StepCount step={5} />
        <Form navigation={navigation} twitterName={twitterName} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default connector(PasswordScreen);
