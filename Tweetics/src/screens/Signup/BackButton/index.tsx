import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {NavigationStackTypes} from '../../../types/NavigationStackTypes';
import {ScreenNames} from '../../../types/ScreenNames';
import {backButtonStyles} from './styles';

type TProps = {
  navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenNames>;
};

const BackButton = ({navigation}: TProps) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={require('../../../icons/BackArrow.png')}
        style={backButtonStyles.backIcon}
      />
    </TouchableOpacity>
  );
};

export default React.memo(BackButton);
