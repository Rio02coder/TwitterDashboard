import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {ScreenNames} from './ScreenNames';
import {NavigationStackTypes} from './NavigationStackTypes';

export interface ScreenProps<ScreenName extends ScreenNames> {
  navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenName>;
  route: RouteProp<NavigationStackTypes, ScreenName>;
}
