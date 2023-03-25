import {StyleSheet} from 'react-native';

export const logoutButtonStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '6%',
    height: '5%',
    width: '50%',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
  },
  text: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
