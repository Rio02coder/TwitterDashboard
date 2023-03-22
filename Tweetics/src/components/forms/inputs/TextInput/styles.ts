import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 30,
    // paddingLeft: Platform.OS === 'ios' ? '6%' : '10%',
    textAlign: 'center',
    marginTop: '3%',
    color: 'black',
  },
  errors: {
    marginTop: '0.5%',
    alignSelf: 'center',
  },
});

export default styles;
