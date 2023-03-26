import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {applicationInReviewText, getVerificationText} from '../../../constants';
import {NavigationStackTypes} from '../../../types/NavigationStackTypes';
import {ScreenNames} from '../../../types/ScreenNames';
import {User} from '../../../types/User';
import {userVerificationButtonStyles} from './styles';

type TProps = {
  user: User;
  navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenNames>;
};

const onPress = (navigation: TProps['navigation']) => {
  navigation.navigate(ScreenNames.ApplicationForm);
};

const ReviewButton = ({user, navigation}: TProps) => {
  return user.flu_application !== null ? (
    <TouchableOpacity
      style={userVerificationButtonStyles.reviewContainer}
      onPress={() => onPress(navigation)}>
      <Text style={userVerificationButtonStyles.text}>
        {applicationInReviewText}
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={userVerificationButtonStyles.container}
      onPress={() => onPress(navigation)}>
      <Text style={userVerificationButtonStyles.text}>
        {getVerificationText}
      </Text>
    </TouchableOpacity>
  );
};

const UserVerificationButton = ({user, navigation}: TProps) => {
  const isVerified = user.is_verified;
  return !isVerified ? (
    <ReviewButton user={user} navigation={navigation} />
  ) : (
    <></>
  );
};

export default React.memo(UserVerificationButton);
