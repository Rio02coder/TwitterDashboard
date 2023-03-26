import React from 'react';
import {Text, View} from 'react-native';
import Label from './Label';
import {barGraphStyles as StylesWithoutProps} from './styles';

/**
 * This component currently
 * shows a binary bar graph. So once the
 * number for a given category is given, the
 * number for the other category is 1 - <that number>.
 * The number should be passed between 0 and 1.
 */
type TProps = {
  value: number;
  categoryLabel: string;
  compelmentaryLabel: string;
  title: string;
};

const BarGraph = ({
  value,
  categoryLabel,
  compelmentaryLabel,
  title,
}: TProps) => {
  const complementValue = ((1 - value) * 100).toFixed(0);
  const categoryValue = (value * 100).toFixed(0);
  const styles = StylesWithoutProps(categoryValue, complementValue);

  return (
    <>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.container}>
        <View style={styles.categoryView}>
          <Label keyToUse={categoryLabel} value={categoryValue + '%'} />
        </View>
        <View style={styles.complementaryView}>
          <Label keyToUse={compelmentaryLabel} value={complementValue + '%'} />
        </View>
      </View>
    </>
  );
};

export default React.memo(BarGraph);
