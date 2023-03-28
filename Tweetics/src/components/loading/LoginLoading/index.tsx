import React from 'react';
import {Image} from 'react-native';
import {loginLoadingStyle} from './styles';

const LoginLoading = () => {
  return (
    <Image
      source={require('../../../icons/ScreenLoading.gif')}
      style={loginLoadingStyle.image}
    />
  );
};

export default React.memo(LoginLoading);
