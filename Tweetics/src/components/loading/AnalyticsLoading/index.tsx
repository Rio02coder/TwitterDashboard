import React from 'react';
import {Image} from 'react-native';
import {analyticsLoadingStyle} from './styles';

const AnalyticsLoading = () => {
  return (
    <Image
      source={require('../../../icons/Analytics.gif')}
      style={analyticsLoadingStyle.image}
    />
  );
};

export default React.memo(AnalyticsLoading);
