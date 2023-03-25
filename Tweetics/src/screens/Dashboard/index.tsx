import React from 'react';
import {SafeAreaView} from 'react-native';
import connector from '../../redux/connector';
import {ScreenProps} from '../../types/Screen';
import {ScreenNames} from '../../types/ScreenNames';
import appStyle from '../styles/appStyle';
import Logout from './Logout';
import UserAvatar from './UserAvatar';
import UserData from './UserData';
import UserStats from './UserStats';
import UserVerificationButton from './UserVerificationButton';

const DashBoard = (props: ScreenProps<ScreenNames.Dashboard>) => {
  return (
    <SafeAreaView style={[appStyle.background, {flex: 1}]}>
      <UserAvatar />
      <UserData />
      <UserVerificationButton />
      <UserStats />
      <Logout props={props} />
    </SafeAreaView>
  );
};

export default connector(DashBoard);
