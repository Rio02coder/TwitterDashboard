import React from 'react';
import {View} from 'react-native';
import {Circle, Svg} from 'react-native-svg';

const PieChart = () => {
  return (
    <Svg width={400} height={500}>
      <Circle
        cx={200}
        cy={200}
        stroke="#f2f2f2"
        r={120}
        strokeLinejoin={'miter'}
        strokeWidth={30}
        strokeDasharray={'190 0'}
      />
    </Svg>
  );
};

export default React.memo(PieChart);
