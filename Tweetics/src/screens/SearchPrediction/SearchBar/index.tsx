import React from 'react';
import {View, TextInput} from 'react-native';
import {searchBarStyles} from './styles';

const SearchBar = () => {
  return (
    <View style={searchBarStyles.bar}>
      <TextInput />
    </View>
  );
};

export default React.memo(SearchBar);
