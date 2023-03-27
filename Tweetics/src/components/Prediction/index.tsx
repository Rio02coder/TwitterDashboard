import React from 'react';
import BarGraph from './BarGraph';
import PieChart from './PieChart';

type TProps = {
  pieChart?: {
    prediction: number;
  };
  title: string;
  barGraph?: {
    complementaryLabel: string;
    categoricalLabel: string;
    complementaryValue: number;
    catergoricalValue: number;
  };
};

const Prediction = ({pieChart, title, barGraph}: TProps) => {
  let prediction = 0;
  if (pieChart) {
    prediction = pieChart.prediction;
  }
  return barGraph ? (
    <BarGraph
      categoryLabel={barGraph.categoricalLabel}
      compelmentaryLabel={barGraph.complementaryLabel}
      categoryValue={barGraph.catergoricalValue}
      complementaryValue={barGraph.complementaryValue}
      title={title}
    />
  ) : (
    <PieChart prediction={prediction} title={title} />
  );
};

export default React.memo(Prediction);
