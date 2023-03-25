import React from 'react';
import {View, Text} from 'react-native';
import {statStyles} from './styles';

type TProps = {
  keyToDisplay: string;
  value: string;
};

const Stat = ({keyToDisplay, value}: TProps) => {
  return (
    <View style={statStyles.container}>
      <Text style={statStyles.key}>{keyToDisplay}</Text>
      <Text style={statStyles.value}>{value}</Text>
    </View>
  );
};

export default React.memo(Stat);
