import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Circle, G, Svg} from 'react-native-svg';
import PieKey from './PieKey';
import {pieChartStyles} from './styles';

type TProps = {
  title: string;
  prediction: number;
};

const SVG_CANVAS_HEIGHT = '200';
const SVG_CANVAS_WIDTH = '200';
const FLU_COLOR = '#ed1a52';
const NORMAL_COLOR = '#30475E';
const RADIUS = 80;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CIRCLE_X = '50%';
const CIRCLE_Y = '50%';
const STROKE_WIDTH = '20';
const ORIGIN_X = '90';
const ORIGIN_Y = '90';

const PieChart = ({title, prediction}: TProps) => {
  const flu = prediction * 100;
  const normal = 100 - flu;
  const total = flu + normal;
  const fluPercentage = (flu / total) * 100;
  const normalPercentage = (normal / total) * 100;

  const fluStrokeDashoffset =
    CIRCUMFERENCE - (CIRCUMFERENCE * fluPercentage) / 100;
  const normalStrokeDashoffset =
    CIRCUMFERENCE - (CIRCUMFERENCE * normalPercentage) / 100;

  const fluAngle = (flu / total) * 360;

  return (
    <View style={pieChartStyles.container}>
      <Text style={pieChartStyles.titleText}>{title}</Text>
      <View style={pieChartStyles.graphWrapper}>
        <Svg
          height={SVG_CANVAS_HEIGHT}
          width={SVG_CANVAS_WIDTH}
          viewBox="0 0 180 180">
          <G rotation={-90} originX={ORIGIN_X} originY={ORIGIN_Y}>
            <>
              <Circle
                cx={CIRCLE_X}
                cy={CIRCLE_Y}
                r={RADIUS}
                stroke={FLU_COLOR}
                fill="transparent"
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={fluStrokeDashoffset}
                rotation={0}
                originX={ORIGIN_X}
                originY={ORIGIN_Y}
                strokeLinecap="round"
              />
              <Circle
                cx={CIRCLE_X}
                cy={CIRCLE_Y}
                r={RADIUS}
                stroke={NORMAL_COLOR}
                fill="transparent"
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={normalStrokeDashoffset}
                rotation={fluAngle}
                originX={ORIGIN_X}
                originY={ORIGIN_Y}
                strokeLinecap="round"
              />
            </>
          </G>
        </Svg>
      </View>
      <PieKey
        complementaryLabel={'Normal'}
        complementaryValue={normal.toFixed(0)}
        categoryLabel={'Flu'}
        categoryValue={flu.toFixed(0)}
        categoryColor={FLU_COLOR}
        complementaryColor={NORMAL_COLOR}
      />
    </View>
  );
};

export default React.memo(PieChart);
