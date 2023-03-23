import React from 'react';
import {View, Image} from 'react-native';
import {headerStyles} from './styles';

const ScreenHeader = () => {
  return (
    <View>
      <Image
        source={require('../../icons/AppLogoBlue.png')}
        style={headerStyles.headerImage}
      />
    </View>
  );
};

export default React.memo(ScreenHeader);
