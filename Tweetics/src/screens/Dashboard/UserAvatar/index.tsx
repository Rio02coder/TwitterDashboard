import React from 'react';
import {Image, View} from 'react-native';
import {userAvatarStyles} from './styles';

const UserAvatar = () => {
  return (
    <View style={userAvatarStyles.container}>
      <Image
        source={require('../../../icons/TweetUserIcon.png')}
        style={userAvatarStyles.image}
      />
    </View>
  );
};

export default React.memo(UserAvatar);
