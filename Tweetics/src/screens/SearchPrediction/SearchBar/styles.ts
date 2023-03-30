import {Dimensions, Platform, StyleSheet} from 'react-native';

export const searchBarStyles = StyleSheet.create({
  bar: {
    height: '6.5%',
    width: '90%',
    borderRadius: 30,
    backgroundColor: '#969b97',
    alignSelf: 'center',
    marginTop: '5%',
    paddingHorizontal: Platform.OS === 'ios' ? '4%' : '2%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.5,
    elevation: 8,
  },
  text: {
    color: 'black',
    fontSize: 17,
    alignSelf: 'center',
  },
});
