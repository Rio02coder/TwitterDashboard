import React from 'react';
import {TouchableOpacity, Text, Alert} from 'react-native';
import {retriever} from '../../../service/contacter/retriever';
import {URLS} from '../../../service/urls';
import {ScreenProps} from '../../../types/Screen';
import {ScreenNames} from '../../../types/ScreenNames';
import {logoutButtonStyles} from './styles';

type TProps = {
  props: ScreenProps<ScreenNames>;
};

const networkRequest = (props: ScreenProps<ScreenNames>) => {
  return retriever<void, void>(
    URLS.AUTHENTICATION.logout,
    props,
    undefined,
    undefined,
  );
};

const Logout = ({props}: TProps) => {
  const onPress = () => {
    Alert.alert('Logout', 'Do you wish to logout ?', [
      {
        text: 'Yes',
        onPress: () => {
          networkRequest(props)
            .then(() =>
              props.navigation.replace(ScreenNames.Login, {logout: true}),
            )
            .catch(() => {});
        },
        style: 'destructive',
      },
      {
        text: 'Cancel',
        style: 'default',
      },
    ]);
  };
  return (
    <TouchableOpacity style={logoutButtonStyles.container} onPress={onPress}>
      <Text style={logoutButtonStyles.text}>Logout</Text>
    </TouchableOpacity>
  );
};

export default React.memo(Logout);
