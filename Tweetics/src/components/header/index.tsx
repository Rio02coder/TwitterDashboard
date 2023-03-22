import React from 'react';
import {View, Image} from 'react-native';
import {headerStyles} from './styles';

const LoginHeader = () => {
  return (
    <View>
      <Image
        source={require('../../icons/AppIcon.png')}
        style={headerStyles.headerImage}
      />
    </View>
  );
};

export default React.memo(LoginHeader);
