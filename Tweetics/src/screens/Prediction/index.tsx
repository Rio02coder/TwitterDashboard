import React from 'react';
import {SafeAreaView} from 'react-native';
import connector from '../../redux/connector';
import appStyle from '../styles/appStyle';

const Prediction = () => {
  return <SafeAreaView style={[appStyle.background, {flex: 1}]}></SafeAreaView>;
};

export default connector(Prediction);
