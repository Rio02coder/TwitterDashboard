import React from 'react';
import {View, Image} from 'react-native';
import {loginStyles} from '../styles';

const LoginHeader = () => {
  return (
    <View>
      <Image
        source={require('../../../icons/AppIcon.png')}
        style={loginStyles.headerImage}
      />
    </View>
  );
};

export default React.memo(LoginHeader);
