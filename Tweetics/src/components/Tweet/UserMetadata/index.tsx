import React from 'react';
import {View, Image} from 'react-native';
import store from '../../../redux/store';
import UserNameData from './UserNameData';

const UserMetaData = () => {
  const user = store.getState().user;
  const fullName = `${user.first_name} ${user.last_name}`;
  const twitterName = user.twitter_name;
  return (
    <View>
      <UserNameData fullName={fullName} twitterName={twitterName} />
      {/* <Image source={require('../../../icons/RetweetIcon.png')} /> */}
    </View>
  );
};

export default React.memo(UserMetaData);
