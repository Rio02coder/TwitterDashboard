import {ScreenNames} from './ScreenNames';

type NavigationStackTypesStructure = {[key in string]: any};

export interface NavigationStackTypes extends NavigationStackTypesStructure {
  [ScreenNames.Home]: undefined;
}
