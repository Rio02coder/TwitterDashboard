import React from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import Prediction from '../../components/Prediction';
import ScreenHeader from '../../components/ScreenHeader';
import connector from '../../redux/connector';
import appStyle from '../styles/appStyle';
import {fluPredictionScreenStyles} from './styles';

const FluPrediction = () => {
  return (
    <SafeAreaView style={[appStyle.background, {flex: 1}]}>
      <ScreenHeader />
      <Text style={fluPredictionScreenStyles.headerText}>Flu Prediction</Text>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Prediction prediction={0.38} title={'Recent'} />
        <Prediction prediction={0.64} title={'Last Month'} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default connector(FluPrediction);
