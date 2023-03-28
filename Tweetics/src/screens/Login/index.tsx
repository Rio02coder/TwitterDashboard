import React, {useEffect, useState} from 'react';
import {
  Alert,
  ImageBackground,
  Image,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import {loginStyles} from './styles';
import JoinText from './JoinText';
import Form from './Form';
import {setAdjustNothing} from 'rn-android-keyboard-adjust';
import Footer from './Footer';
import {ScreenProps} from '../../types/Screen';
import {ScreenNames} from '../../types/ScreenNames';
import connector from '../../redux/connector';
import Header from '../../components/header';
import {tokenMemory} from '../../utilities/NativeStorage/TokenMemory';
import LoginLoading from '../../components/loading/LoginLoading';
import {completeLogin} from '../../utilities/ManageSession/login';
import {AxiosError} from 'axios';
import {User} from '../../types/User';
import {BackendLoginResponse} from '../../types/backend/login';
import {manageLogoutSession} from '../../utilities/ManageSession/logout';
import ScreenLoading from '../../components/loading/ScreenLoading';

const Login = (props: ScreenProps<ScreenNames.Login>) => {
  const logout = props.route.params ? props.route.params.logout : undefined;
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setAdjustNothing();
  }, []);
  useEffect(() => {
    if (!logout) {
      tokenMemory.getToken().then(token => {
        if (token) {
          setLoading(true);
          completeLogin(token, props).catch(() => {
            setLoading(false);
          });
        }
      });
    } else {
      manageLogoutSession(props);
    }
  }, []);
  const getErrorMessage = (statusNumber: number) => {
    console.log(statusNumber);
    switch (statusNumber) {
      case 401:
        return 'Unauthorized access. Check you username / password.';
      case 404:
        return 'User not found';
      default:
        return 'An error has occurred with username and password';
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <SafeAreaView style={[loginStyles.mainContainer]}>
        <>
          <Header />
          <JoinText />
          {loading ? (
            <ScreenLoading />
          ) : (
            <ImageBackground
              source={require('../../icons/AnalyticsLogo.png')}
              style={{flex: 1, height: 490, width: 400, alignSelf: 'center'}}
              imageStyle={{marginTop: -19}}
              resizeMode={'cover'}>
              <Form
                props={props}
                responseHandler={(response: BackendLoginResponse) => {
                  const user: User = {token: response.token, ...response.user};
                  props.loginUser(user);
                  props.navigation.replace(ScreenNames.Main);
                }}
                submissionHandler={() => setLoading(true)}
                errorHandler={(err: AxiosError) => {
                  setLoading(false);
                  Alert.alert(
                    'Error',
                    getErrorMessage(err.response?.status as number),
                  );
                }}
              />
            </ImageBackground>
          )}

          <Footer navigation={props.navigation} />
        </>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default connector(Login);
