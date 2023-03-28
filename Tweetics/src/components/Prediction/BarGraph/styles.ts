import {Platform, StyleSheet} from 'react-native';

export const barGraphStyles = (
  categoryHeight: string,
  complementaryHeight: string,
) =>
  StyleSheet.create({
    categoryView: {
      width: '30%',
      height: categoryHeight + '%',
      backgroundColor: '#ed1a52',
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
      position: 'absolute',
      bottom: 0,
      left: '10%',
    },
    complementaryView: {
      width: '30%',
      height: complementaryHeight + '%',
      backgroundColor: '#ffd166',
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
      position: 'absolute',
      bottom: 0,
      right: '10%',
    },
    titleText: {
      color: 'white',
      marginLeft: '12%',
      marginTop: '10%',
      fontSize: 22,
      fontWeight: '700',
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      height: '31%',
      width: '80%',
      alignSelf: 'center',
      borderBottomWidth: Platform.OS === 'ios' ? 3 : 1,
      borderBottomColor: 'grey',
    },
  });
