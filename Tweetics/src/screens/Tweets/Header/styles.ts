import {Platform, StyleSheet} from 'react-native';

export const headerStyles = StyleSheet.create({
  header: {
    borderBottomColor: '#353535',
    borderBottomWidth: 1,
    opacity: 1,
    marginTop: Platform.OS === 'android' ? 8 : undefined,
  },
});
