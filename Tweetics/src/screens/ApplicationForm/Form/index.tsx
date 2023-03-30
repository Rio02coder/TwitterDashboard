import React, {useState} from 'react';
import {Formik} from 'formik';
import {
  Alert,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {User} from '../../../types/User';
import Input, {InputTypes} from '../../../components/forms/inputs/Input';
import Submit from '../../../components/forms/submit';
import {formStyles} from './styles';
import {sender} from '../../../service/contacter/sender';
import {BackendFluApplication} from '../../../types/backend/application';
import {URLS} from '../../../service/urls';
import {ReduxProps} from '../../../types/redux/props';

type TProps = {
  flu_application: User['flu_application'];
  responseHandler: (response: User['flu_application']) => void;
  submissionHandler: () => void;
  errorHandler: () => void;
  props: ReduxProps;
};

const Form = ({
  flu_application,
  props,
  submissionHandler,
  errorHandler,
  responseHandler,
}: TProps) => {
  return (
    <Formik
      initialValues={{
        application:
          flu_application !== null ? flu_application.flu_application : '',
      }}
      onSubmit={value => {
        submissionHandler();
        sender<BackendFluApplication, User['flu_application'], void>(
          URLS.USER.fluApplication,
          value,
          props,
          responseHandler,
        ).catch(() => {
          Alert.alert(
            'Error',
            'There has been an error sending your application',
          );
          errorHandler();
        });
      }}>
      <>
        <Input
          type={InputTypes.TEXT_INPUT}
          inputProps={{
            props: {
              field: 'application',
              isMandatory: true,
              placeholder: 'Your application',
              height: '60%',
              width: '93%',
              editable: flu_application === null,
              multiline: true,
              contentStyle: formStyles.input,
            },
          }}
        />
        <Submit
          height={'6%'}
          width={'40%'}
          disabled={flu_application !== null}
          top={3}
          style={[
            {opacity: flu_application !== null ? 0.5 : 1},
            formStyles.button,
          ]}
        />
      </>
    </Formik>
  );
};

export default React.memo(Form);
