import React, {useState} from 'react';
import {Keyboard, SafeAreaView, TouchableWithoutFeedback} from 'react-native';
import ScreenLoading from '../../components/loading/ScreenLoading';
import connector from '../../redux/connector';
import {ScreenProps} from '../../types/Screen';
import {ScreenNames} from '../../types/ScreenNames';
import appStyle from '../styles/appStyle';
import Form from './Form';
import Header from './Header';

const ApplicationForm = (props: ScreenProps<ScreenNames.ApplicationForm>) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={[appStyle.background, {flex: 1, paddingHorizontal: '7%'}]}>
        <Header
          isFormSubmitted={props.user.flu_application !== null}
          navigation={props.navigation}
        />
        {!loading ? (
          <Form
            flu_application={props.user.flu_application}
            responseHandler={response => {
              props.updateUser({flu_application: response});
              setLoading(false);
              // props.navigation.goBack();
            }}
            props={props}
            submissionHandler={() => setLoading(true)}
            errorHandler={() => setLoading(false)}
          />
        ) : (
          <ScreenLoading />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default connector(ApplicationForm);
