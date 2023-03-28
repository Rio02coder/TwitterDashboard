import React, {useContext} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {searchFluContext, SearchFluContext} from '../metadata';

const Cross = () => {
  const {canClear, onClear} = useContext<SearchFluContext>(searchFluContext);
  return canClear ? (
    <TouchableOpacity onPress={onClear}>
      <Image source={require('../../../icons/CrossIcon.png')} />
    </TouchableOpacity>
  ) : (
    <></>
  );
};

export default React.memo(Cross);
