import React from 'react';
import {Text, View} from 'react-native';
import {stepStyles} from './styles';

type TProps = {
  step: number;
};

const StepCount = (props: TProps) => {
  return (
    <View style={stepStyles.container}>
      <Text style={stepStyles.text}>{`Step ${props.step} of 5`}</Text>
    </View>
  );
};

export default React.memo(StepCount);
