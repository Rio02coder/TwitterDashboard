import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {ScreenNames} from './ScreenNames';
import {NavigationStackTypes} from './NavigationStackTypes';
import {ReduxProps} from './redux/props';

export interface ScreenProps<ScreenName extends ScreenNames>
  extends ReduxProps {
  navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenName>;
  route: RouteProp<NavigationStackTypes, ScreenName>;
}
