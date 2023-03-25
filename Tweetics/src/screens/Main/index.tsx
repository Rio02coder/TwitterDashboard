import React, {useEffect, useState} from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import ScreenLoading from '../../components/loading/ScreenLoading';
import ScreenHeader from '../../components/ScreenHeader';
import connector from '../../redux/connector';
import {retriever} from '../../service/contacter/retriever';
import {URLS} from '../../service/urls';
import {ScreenProps} from '../../types/Screen';
import {ScreenNames} from '../../types/ScreenNames';
import appStyle from '../styles/appStyle';
import {mainScreenStyles} from './styles';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tweets from '../Tweets';
import getNavBarIcon from './NavBarIcon';
import {NavigationStackTypes} from '../../types/NavigationStackTypes';
import Prediction from '../Prediction';
import SearchPrediction from '../SearchPrediction';
import Dashboard from '../Dashboard';

const MainScreen = (props: ScreenProps<ScreenNames.Main>) => {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!props.user) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [props.user]);
  const Tab = createBottomTabNavigator<NavigationStackTypes>();
  return loading ? (
    <ScreenLoading />
  ) : (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) =>
          getNavBarIcon(route.name as ScreenNames, focused),
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: 'black',
          borderTopColor: '#353535',
        },
      })}>
      <Tab.Screen name={ScreenNames.Tweets} component={Tweets} />
      <Tab.Screen name={ScreenNames.Prediction} component={Prediction} />
      <Tab.Screen
        name={ScreenNames.SearchPrediction}
        component={SearchPrediction}
      />
      <Tab.Screen name={ScreenNames.Dashboard} component={Dashboard} />
    </Tab.Navigator>
  );
};

export default connector(MainScreen);
