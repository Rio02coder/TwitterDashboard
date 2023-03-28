import React from 'react';
import {
  ImageBackground,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../../../components/header';
import connector from '../../../redux/connector';
import {ScreenProps} from '../../../types/Screen';
import {ScreenNames} from '../../../types/ScreenNames';
import SignupText from '../SignupText';
import StepCount from '../StepCount';
import {signupStyles} from '../styles';
import Form from './Form';

const TwitterNameScreen = ({
  navigation,
  route,
}: ScreenProps<ScreenNames.TwitterName>) => {
  const lastName = route.params.lastName;
  console.log(lastName);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <SafeAreaView style={signupStyles.mainContainer}>
        <Header />
        <SignupText />
        <StepCount step={4} />
        <ImageBackground
          source={require('../../../icons/AnalyticsLogo.png')}
          style={{flex: 1, height: 490, width: 400, alignSelf: 'center'}}
          imageStyle={{marginTop: -19}}
          resizeMode={'cover'}>
          <Form navigation={navigation} lastName={lastName} />
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default connector(TwitterNameScreen);
