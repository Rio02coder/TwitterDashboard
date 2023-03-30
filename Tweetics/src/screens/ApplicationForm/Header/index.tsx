import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {NavigationStackTypes} from '../../../types/NavigationStackTypes';
import {ScreenNames} from '../../../types/ScreenNames';
import {headerStyles} from './styles';

type TProps = {
  isFormSubmitted: boolean;
  navigation: NativeStackNavigationProp<
    NavigationStackTypes,
    ScreenNames.ApplicationForm
  >;
};

const getMainText = (isFormSubmitted: boolean) => {
  if (isFormSubmitted) {
    return 'Your application';
  }
  return 'Submit your application';
};

const getSubText = (isFormSubmitted: boolean) => {
  if (isFormSubmitted) {
    return `Your application is currently being reviewed by someone in our team. If we need more information, we will contact you.`;
  }
  return `This is a chance to tell us why you would like us to allow you to search the Flu prediction of users. Once you submit your application, a member from our team would review this.`;
};

const Header = ({isFormSubmitted, navigation}: TProps) => {
  return (
    <View style={headerStyles.container}>
      <TouchableOpacity
        style={headerStyles.iconContainer}
        onPress={() => navigation.goBack()}>
        <Image
          source={require('../../../icons/BackArrow.png')}
          style={headerStyles.backIcon}
        />
      </TouchableOpacity>
      <Text style={headerStyles.mainText}>{getMainText(isFormSubmitted)}</Text>
      <Text style={headerStyles.subText}>{getSubText(isFormSubmitted)}</Text>
    </View>
  );
};

export default React.memo(Header);
