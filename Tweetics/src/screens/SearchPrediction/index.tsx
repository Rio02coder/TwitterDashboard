import React, {useState} from 'react';
import {Keyboard, SafeAreaView, TouchableWithoutFeedback} from 'react-native';
import connector from '../../redux/connector';
import appStyle from '../styles/appStyle';
import SearchBar from './SearchBar';
import {searchFluContext} from './metadata';
import Result from './Result';
import {ScreenProps} from '../../types/Screen';
import {ScreenNames} from '../../types/ScreenNames';
import Unverified from './Unverified';

const SearchPrediction = (props: ScreenProps<ScreenNames.SearchPrediction>) => {
  const [data, setData] = useState<string>('');
  const [canClear, setCanClear] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<number | undefined>(undefined);
  const onSearch = () => {
    setCanClear(true);
  };

  const onClear = () => {
    setCanClear(false);
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
          <Result />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </searchFluContext.Provider>
  );
};

export default connector(SearchPrediction);
