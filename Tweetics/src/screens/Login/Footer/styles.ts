import {StyleSheet} from 'react-native';

export const loginFooterStyles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: '7%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  noAccountText: {
    color: 'white',
  },
  signupContainer: {
    marginLeft: '3%',
  },
  signupText: {
    fontWeight: '800',
    color: 'white',
    textDecorationLine: 'underline',
  },
});
