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

const FirsNameScreen = ({
  navigation,
  route,
}: ScreenProps<ScreenNames.FirstName>) => {
  const email = route.params.email;
  console.log(email);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <SafeAreaView style={signupStyles.mainContainer}>
        <Header />
        <SignupText />
        <StepCount step={2} />
        <Form navigation={navigation} email={email} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default connector(FirsNameScreen);
