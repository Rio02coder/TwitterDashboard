import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenNames} from '../../../types/ScreenNames';
import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {NavigationStackTypes} from '../../../types/NavigationStackTypes';
import {unverifiedStyles} from './styles';

type TProps = {
  navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenNames>;
};

const Unverified = ({navigation}: TProps) => {
  return (
    <SafeAreaView style={unverifiedStyles.mainContainer}>
      <Text style={unverifiedStyles.mainText}>Search Flu predictions</Text>
      <Text style={unverifiedStyles.supportingText}>
        You must get verified to use this feature.
      </Text>
      <Image
        source={require('../../../icons/AnalyticsLogo2.png')}
        style={unverifiedStyles.image}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.Dashboard)}
        style={unverifiedStyles.buttonContainer}>
        <Text style={unverifiedStyles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default React.memo(Unverified);
