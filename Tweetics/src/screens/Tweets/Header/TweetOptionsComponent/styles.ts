import {StyleSheet} from 'react-native';

export const tweetOptionStyles = StyleSheet.create({
  selectedText: {
    color: 'white',
  },
  touchableContainer: {
    width: '30%',
  },
  selectedTextView: {
    backgroundColor: '#5ba8ff',
    width: '100%',
    height: 3,
    borderRadius: 45,
    alignSelf: 'center',
  },
  unSelectedText: {
    color: '#939393',
  },
  text: {
    fontSize: 18,
    fontWeight: '900',
    alignSelf: 'center',
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
