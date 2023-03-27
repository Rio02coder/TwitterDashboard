import React from 'react';
import BarGraph from './BarGraph';
import PieChart from './PieChart';

type TProps = {
  prediction: number;
  title: string;
};

const Prediction = ({prediction, title}: TProps) => {
  return (
    <BarGraph
      value={prediction}
      categoryLabel={'Flu'}
      compelmentaryLabel={'Normal'}
      title={title}
    />
    // <PieChart />
  );
};

export default React.memo(Prediction);
