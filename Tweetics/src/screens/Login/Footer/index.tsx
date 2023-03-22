import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationStackTypes} from '../../../types/NavigationStackTypes';
import {ScreenNames} from '../../../types/ScreenNames';
import {noAccount} from '../../../constants';
import {loginFooterStyles} from './styles';

type TProps = {
  navigation: NativeStackNavigationProp<
    NavigationStackTypes,
    ScreenNames.Login
  >;
};

const LoginFooter = ({navigation}: TProps) => {
  return (
    <View style={loginFooterStyles.footerContainer}>
      <Text style={loginFooterStyles.noAccountText}>{noAccount}</Text>
      <TouchableOpacity
        style={loginFooterStyles.signupContainer}
        onPress={() => {
          navigation.navigate(ScreenNames.Email);
        }}>
        <Text style={loginFooterStyles.signupText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(LoginFooter);
