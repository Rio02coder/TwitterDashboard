import React, {useContext} from 'react';
import {View, TextInput} from 'react-native';
import {searchFluContext, SearchFluContext} from '../metadata';
import Cross from './cross';
import Search from './search';
import {searchBarStyles} from './styles';

const SearchBar = () => {
  const {text, setText} = useContext<SearchFluContext>(searchFluContext);
  return (
    <View style={searchBarStyles.bar}>
      <TextInput
        style={searchBarStyles.text}
        value={text}
        placeholder={'Search flu prediction of twitter users'}
        onChangeText={setText}
      />
      <Cross />
      <Search />
    </View>
  );
};

export default React.memo(SearchBar);
