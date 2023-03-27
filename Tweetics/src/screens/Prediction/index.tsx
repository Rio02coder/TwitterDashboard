import React, {useEffect, useState} from 'react';
import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import AnalyticsLoading from '../../components/loading/AnalyticsLoading';
import Prediction from '../../components/Prediction';
import ScreenHeader from '../../components/ScreenHeader';
import connector from '../../redux/connector';
import {retriever} from '../../service/contacter/retriever';
import {URLS} from '../../service/urls';
import {BackendFluPrediction} from '../../types/backend/prediction';
import {ScreenProps} from '../../types/Screen';
import {ScreenNames} from '../../types/ScreenNames';
import appStyle from '../styles/appStyle';
import {fluPredictionScreenStyles} from './styles';

const FluPrediction = (props: ScreenProps<ScreenNames.Prediction>) => {
  const user = props.user;
  const [loading, setLoading] = useState<boolean>(false);
  const networkRequest = () => {
    setLoading(true);
    retriever<BackendFluPrediction, void>(
      URLS.USER.fluPrediction,
      props,
      response => {
        props.updateUser({
          recent_prediction: response.recent_prediction,
          last_month_prediction: response.last_month_prediction,
        });
      },
    )
      .then(() => setLoading(false))
      .catch(() =>
        Alert.alert(
          'Error',
          'There has been an error in getting the prediction, please try again',
        ),
      );
  };
  useEffect(() => {
    if (!user.recent_prediction || !user.last_month_prediction) {
      networkRequest();
    }
  }, []);
  return (
    <SafeAreaView style={[appStyle.background, {flex: 1}]}>
      <ScreenHeader />
      <Text style={fluPredictionScreenStyles.headerText}>Flu Prediction</Text>
      {loading ? (
        <AnalyticsLoading />
      ) : (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingBottom: '60%'}}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => networkRequest()}
              colors={['white']}
              tintColor={'white'}
            />
          }>
          <>
            <Prediction
              pieChart={{prediction: props.user.recent_prediction as number}}
              title={'Recent'}
            />
            <Prediction
              pieChart={{
                prediction: props.user.last_month_prediction as number,
              }}
              title={'Last Month'}
            />
            <Prediction
              barGraph={{
                categoricalLabel: 'Recent',
                complementaryLabel: 'Last Month',
                catergoricalValue: props.user.recent_prediction as number,
                complementaryValue: props.user.last_month_prediction as number,
              }}
              title={'Comparison'}
            />
          </>
        </ScrollView>
      )}
      {/* <Prediction prediction={0.38} title={'Recent'} /> */}
    </SafeAreaView>
  );
};

export default connector(FluPrediction);
