import React from 'react';
import {View, Text} from 'react-native';
import {userNameStyles} from './styles';

type TProps = {
  fullName: string;
  twitterName: string;
};

const UserNameData = ({fullName, twitterName}: TProps) => {
  return (
    <View style={userNameStyles.container}>
      <Text style={userNameStyles.fullNameText}>{fullName}</Text>
      <Text style={userNameStyles.twitterNameText}>{twitterName}</Text>
    </View>
  );
};

export default React.memo(UserNameData);
