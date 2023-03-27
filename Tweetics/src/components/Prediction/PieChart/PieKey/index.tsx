import React from 'react';
import {View, Text} from 'react-native';
import {pieKeyStyles as StyleWithoutProps} from './styles';

type TProps = {
  categoryLabel: string;
  complementaryLabel: string;
  categoryValue: string;
  complementaryValue: string;
  categoryColor: string;
  complementaryColor: string;
};

const PieKey = ({
  categoryLabel,
  categoryValue,
  complementaryLabel,
  complementaryValue,
  categoryColor,
  complementaryColor,
}: TProps) => {
  const styles = StyleWithoutProps(complementaryColor, categoryColor);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.keyValueContainer}>
        <View style={styles.categoryView} />
        <Text
          style={styles.text}>{`${categoryLabel} - ${categoryValue}%`}</Text>
      </View>
      <View style={styles.keyValueContainer}>
        <View style={styles.complementaryView} />
        <Text
          style={
            styles.text
          }>{`${complementaryLabel} - ${complementaryValue}%`}</Text>
      </View>
    </View>
  );
};

export default React.memo(PieKey);
