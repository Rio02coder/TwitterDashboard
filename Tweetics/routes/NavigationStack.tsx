import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {ScreenNames} from '../src/types/ScreenNames';
import {NavigationStackTypes} from '../src/types/NavigationStackTypes';
import Login from '../src/screens/Login';
import FirstName from '../src/screens/Signup/FirstName';
import LastName from '../src/screens/Signup/LastName';
import TwitterName from '../src/screens/Signup/TwitterName';
import Password from '../src/screens/Signup/Password';
import Main from '../src/screens/Main';
import Email from '../src/screens/Signup/Email';
import ApplicationForm from '../src/screens/ApplicationForm';

const Stack = createNativeStackNavigator<NavigationStackTypes>();

export default class Navigator extends React.Component {
  public render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={ScreenNames.Login}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name={ScreenNames.Login} component={Login} />
          <Stack.Screen name={ScreenNames.Email} component={Email} />
          <Stack.Screen name={ScreenNames.FirstName} component={FirstName} />
          <Stack.Screen name={ScreenNames.LastName} component={LastName} />
          <Stack.Screen
            name={ScreenNames.TwitterName}
            component={TwitterName}
          />
          <Stack.Screen name={ScreenNames.Password} component={Password} />
          <Stack.Screen name={ScreenNames.Main} component={Main} />
          <Stack.Screen
            name={ScreenNames.ApplicationForm}
            component={ApplicationForm}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
