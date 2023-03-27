import {StyleSheet} from 'react-native';

export const pieKeyStyles = (
  complementaryColor: string,
  categoryColor: string,
) =>
  StyleSheet.create({
    keyColorView: {
      height: '3%',
      width: '3%',
    },
    keyValueContainer: {
      flexDirection: 'row',
    },
    text: {
      color: 'white',
    },
    mainContainer: {
      alignSelf: 'flex-end',
    },
    categoryView: {
      height: '70%',
      width: '9%',
      marginRight: '1%',
      backgroundColor: categoryColor,
    },
    complementaryView: {
      height: '70%',
      width: '9%',
      backgroundColor: complementaryColor,
      marginRight: '1%',
    },
  });
