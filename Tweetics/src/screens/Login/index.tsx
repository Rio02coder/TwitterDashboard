import React, {useEffect} from 'react';
import {Keyboard, SafeAreaView, TouchableWithoutFeedback} from 'react-native';
import appStyle from '../styles/appStyle';
import {loginStyles} from './styles';
import JoinText from './JoinText';
import Form from './Form';
import {setAdjustNothing} from 'rn-android-keyboard-adjust';
import Footer from './Footer';
import {ScreenProps} from '../../types/Screen';
import {ScreenNames} from '../../types/ScreenNames';
import connector from '../../redux/connector';
import Header from '../../components/header';

const Login = ({navigation, user}: ScreenProps<ScreenNames.Login>) => {
  useEffect(() => {
    setAdjustNothing();
  }, []);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <SafeAreaView style={[loginStyles.mainContainer]}>
        <>
          <Header />
          <JoinText />
          <Form />
          <Footer navigation={navigation} />
        </>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default connector(Login);
