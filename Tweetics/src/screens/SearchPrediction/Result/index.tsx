import React, {useContext} from 'react';
import {View, Image} from 'react-native';
import Prediction from '../../../components/Prediction';
import {searchFluContext, SearchFluContext} from '../metadata';
import {resultStyles} from './styles';

const Result = () => {
  const {prediction} = useContext<SearchFluContext>(searchFluContext);
  return prediction ? (
    <Prediction pieChart={{prediction}} title={'Prediction'} />
  ) : (
    <Image
      source={require('../../../icons/AnalyticsLogo2.png')}
      style={resultStyles.image}
    />
  );
};

export default React.memo(Result);
