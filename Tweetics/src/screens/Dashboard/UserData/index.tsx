import React from 'react';
import {View, Text, Image} from 'react-native';
import store from '../../../redux/store';
import {User} from '../../../types/User';
import {userDataStyles} from './styles';

type TProps = {
  user: User;
};

const NameData = ({user}: TProps) => {
  return (
    <View style={userDataStyles.nameContainer}>
      <Text
        style={
          userDataStyles.nameText
        }>{`${user.first_name} ${user.last_name}`}</Text>
      {user.is_verified ? (
        <Image
          source={require('../../../icons/TwitterVerified.png')}
          style={userDataStyles.verifiedIcon}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const TwitterNameData = ({user}: TProps) => {
  return (
    <Text style={userDataStyles.twitterNameText}>{user.twitter_name}</Text>
  );
};

const UserData = () => {
  const user = store.getState().user;
  return (
    <View style={userDataStyles.container}>
      <NameData user={user} />
      <TwitterNameData user={user} />
    </View>
  );
};

export default React.memo(UserData);
