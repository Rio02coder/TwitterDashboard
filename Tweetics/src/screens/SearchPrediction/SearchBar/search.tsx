import React, {useContext} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {searchFluContext, SearchFluContext} from '../metadata';

const Cross = () => {
  const {onSearchAction, canClear, text} =
    useContext<SearchFluContext>(searchFluContext);
  return !canClear ? (
    <TouchableOpacity
      onPress={onSearchAction}
      disabled={text === ''}
      style={{opacity: text === '' ? 0.5 : 1}}>
      <Image
        source={require('../../../icons/SearchIcon.png')}
        style={{height: 28, width: 28}}
      />
    </TouchableOpacity>
  ) : (
    <></>
  );
};

export default React.memo(Cross);
