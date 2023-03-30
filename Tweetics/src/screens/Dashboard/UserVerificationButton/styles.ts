import {Platform, StyleSheet} from 'react-native';

export const userVerificationButtonStyles = StyleSheet.create({
  container: {
    backgroundColor: '#03A9F4',
    width: '30%',
    height: Platform.OS === 'ios' ? '4%' : '5%',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: '4%',
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  reviewContainer: {
    backgroundColor: '#fcc319',
    width: '30%',
    height: '4%',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: '4%',
    alignSelf: 'center',
  },
});
