import React from 'react';
import {SafeAreaView} from 'react-native';
import connector from '../../redux/connector';
import appStyle from '../styles/appStyle';
import SearchBar from './SearchBar';

const SearchPrediction = () => {
  return (
    <SafeAreaView style={[appStyle.background, {flex: 1}]}>
      <SearchBar />
    </SafeAreaView>
  );
};

export default connector(SearchPrediction);
