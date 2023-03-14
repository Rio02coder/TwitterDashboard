import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {ScreenNames} from '../src/types/ScreenNames';
import {NavigationStackTypes} from '../src/types/NavigationStackTypes';
import Home from '../src/screens/Home';

const Stack = createNativeStackNavigator<NavigationStackTypes>();

export default class Navigator extends React.Component {
  public render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={ScreenNames.Home}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name={ScreenNames.Home} component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
