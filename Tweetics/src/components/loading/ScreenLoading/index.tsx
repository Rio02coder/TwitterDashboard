import React from 'react';
import {Image} from 'react-native';
import {screenLoadingStyle} from './styles';

const LoginLoading = () => {
  return (
    <Image
      source={require('../../../icons/ScreenLoading.gif')}
      style={screenLoadingStyle.image}
    />
  );
};

export default React.memo(LoginLoading);
