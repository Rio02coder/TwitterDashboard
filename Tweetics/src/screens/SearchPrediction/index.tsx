import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import connector from '../../redux/connector';
import appStyle from '../styles/appStyle';
import SearchBar from './SearchBar';
import {searchFluContext} from './metadata';
import Result from './Result';
import {ScreenProps} from '../../types/Screen';
import {ScreenNames} from '../../types/ScreenNames';
import Unverified from './Unverified';
import {URLS} from '../../service/urls';
import {sender} from '../../service/contacter/sender';
import {
  BackUserSearchPredictionRequest,
  BackendUserSearchPrediction,
} from '../../types/backend/prediction';
import AnalyticsLoading from '../../components/loading/AnalyticsLoading';

const SearchPrediction = (props: ScreenProps<ScreenNames.SearchPrediction>) => {
  const [data, setData] = useState<string>('');
  const [canClear, setCanClear] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const networkRequest = (twitter_name: string) => {
    return sender<
      BackUserSearchPredictionRequest,
      BackendUserSearchPrediction,
      void
    >(
      URLS.USER.fluPredictionSearch,
      {twitter_name},
      props,
      res => {
        setPrediction(res.prediction);
      },
      err =>
        Alert.alert(
          'Something went wrong with our server. Please try again later.',
        ),
    );
  };
  const onSearch = () => {
    Keyboard.dismiss();
    setLoading(true);
    networkRequest(data)
      .then(() => setCanClear(true))
      .finally(() => setLoading(false));
  };

  const onClear = () => {
    setData('');
    setCanClear(false);
    setPrediction(undefined);
  };

  if (!props.user.is_verified) {
    return <Unverified navigation={props.navigation} />;
  }

  return (
    <searchFluContext.Provider
      value={{
        text: data,
        setText: newText => setData(newText),
        prediction,
        setPrediction: pred => setPrediction(pred),
        canClear,
        onSearchAction: onSearch,
        onClear,
      }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={[appStyle.background, {flex: 1}]}>
          <SearchBar />

          {loading ? <AnalyticsLoading /> : <Result />}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </searchFluContext.Provider>
  );
};

export default connector(SearchPrediction);
