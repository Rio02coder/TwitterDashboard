import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {applicationInReviewText, getVerificationText} from '../../../constants';
import store from '../../../redux/store';
import {User} from '../../../types/User';
import {userVerificationButtonStyles} from './styles';

type TProps = {
  user: User;
};

const ReviewButton = ({user}: TProps) => {
  return user.flu_application !== null ? (
    <View style={userVerificationButtonStyles.reviewContainer}>
      <Text style={userVerificationButtonStyles.text}>
        {applicationInReviewText}
      </Text>
    </View>
  ) : (
    <></>
  );
};

const UserVerificationButton = () => {
  const user = store.getState().user;
  const isVerified = user.is_verified;
  return !isVerified ? (
    <TouchableOpacity style={userVerificationButtonStyles.container}>
      <Text style={userVerificationButtonStyles.text}>
        {getVerificationText}
      </Text>
    </TouchableOpacity>
  ) : (
    <ReviewButton user={user} />
  );
};

export default React.memo(UserVerificationButton);
