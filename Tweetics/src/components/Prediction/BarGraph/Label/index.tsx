import React from 'react';
import {View, Text} from 'react-native';
import {labelStyles} from './styles';

type TProps = {
  keyToUse: string;
  value: string;
};

const Label = ({keyToUse, value}: TProps) => {
  return (
    <>
      <Text style={labelStyles.key}>{keyToUse}</Text>
      <Text style={labelStyles.value}>{`(${value})`}</Text>
    </>
  );
};

export default React.memo(Label);
