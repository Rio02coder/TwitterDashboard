import {AxiosError} from 'axios';
import React, {useState} from 'react';
import {
  Alert,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../../../components/header';
import LoginLoading from '../../../components/loading/LoginLoading';
import connector from '../../../redux/connector';
import {ScreenProps} from '../../../types/Screen';
import {ScreenNames} from '../../../types/ScreenNames';
import SignupText from '../SignupText';
import StepCount from '../StepCount';
import {signupStyles} from '../styles';
import Form from './Form';

const PasswordScreen = (props: ScreenProps<ScreenNames.Password>) => {
  const twitterName = props.route.params.twitterName;
  const [loading, setLoading] = useState<boolean>(false);
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
        {loading ? (
          <LoginLoading />
        ) : (
          <>
            <ImageBackground
              source={require('../../../icons/AnalyticsLogo.png')}
              style={{flex: 1, height: 490, width: 400, alignSelf: 'center'}}
              imageStyle={{marginTop: -19}}
              resizeMode={'cover'}>
              <Form
                props={props}
                twitterName={twitterName}
                responseHandler={() =>
                  props.navigation.navigate(ScreenNames.Login, {
                    logout: undefined,
                  })
                }
                errorHandler={(error: AxiosError) => {
                  setLoading(false);
                  Alert.alert('Error', error.message);
                }}
                submissionHandler={() => setLoading(true)}
              />
            </ImageBackground>
          </>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default connector(PasswordScreen);
