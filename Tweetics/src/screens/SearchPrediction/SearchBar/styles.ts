import {Dimensions, StyleSheet} from 'react-native';

export const searchBarStyles = StyleSheet.create({
  bar: {
    height: '20%',
    width: Dimensions.get('screen').width - 10,
    borderRadius: 20,
    color: 'white',
  },
});
