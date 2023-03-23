import React, {useEffect, useState} from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import ScreenLoading from '../../components/loading/ScreenLoading';
import ScreenHeader from '../../components/ScreenHeader';
import connector from '../../redux/connector';
import {retriever} from '../../service/contacter/retriever';
import {URLS} from '../../service/urls';
import {ScreenProps} from '../../types/Screen';
import {ScreenNames} from '../../types/ScreenNames';
import appStyle from '../styles/appStyle';
import {mainScreenStyles} from './styles';

const MainScreen = (props: ScreenProps<ScreenNames.Main>) => {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!props.user) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [props.user]);
  return (
    <SafeAreaView style={[appStyle.background, mainScreenStyles.container]}>
      <TouchableOpacity
        onPress={() => {
          retriever(URLS.USER.profile, props, undefined);
        }}>
        <ScreenHeader />
      </TouchableOpacity>
      {loading ? <ScreenLoading /> : <></>}
    </SafeAreaView>
  );
};

export default connector(MainScreen);
