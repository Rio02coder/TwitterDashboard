import React from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Header from '../../components/header';
import connector from '../../redux/connector';
import {ScreenProps} from '../../types/Screen';
import {ScreenNames} from '../../types/ScreenNames';
import Form from './Form';
import SignupText from './SignupText';
import {signupStyles} from './styles';

const Signup = ({navigation}: ScreenProps<ScreenNames.Signup>) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <SafeAreaView style={signupStyles.mainContainer}>
        <Header />
        <SignupText />
        <Form />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default connector(Signup);
