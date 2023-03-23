import React, {useEffect, useState} from 'react';
import {
  Alert,
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

const Login = (props: ScreenProps<ScreenNames.Login>) => {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setAdjustNothing();
  }, []);
  useEffect(() => {
    tokenMemory.getToken().then(token => {
      if (token) {
        setLoading(true);
        completeLogin(token, props).catch(() => {
          setLoading(false);
        });
      }
    });
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
            <LoginLoading />
          ) : (
            <Form
              props={props}
              responseHandler={(user: User) => {
                props.loginUser(user);
                props.navigation.navigate(ScreenNames.Main);
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
          )}
          <Footer navigation={props.navigation} />
        </>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default connector(Login);
