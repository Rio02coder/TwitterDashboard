import {StyleSheet} from 'react-native';

export const tweetStyles = StyleSheet.create({
  container: {
    marginBottom: '10%',
    shadowRadius: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 30},
    shadowOpacity: 1,
    elevation: 5,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#003049',
    padding: '3%',
  },
  tweetText: {
    marginTop: '2%',
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
