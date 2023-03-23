import React from 'react';
import {Formik, useFormik} from 'formik';
import Input, {InputTypes} from '../../../components/forms/inputs/Input';
import {Platform, View} from 'react-native';
import {loginStyles} from '../styles';
import Submit from '../../../components/forms/submit';
import {useLoginFormValidationRules} from '../../../hooks/useLoginlFormValidationRules';
import {ReduxProps} from '../../../types/redux/props';
import {sender} from '../../../service/contacter/sender';
import {LoginRequest} from '../../../types/backend/login';
import {User} from '../../../types/User';
import {URLS} from '../../../service/urls';
import {AxiosError} from 'axios';

type TProps = {
  props: ReduxProps;
  responseHandler: (user: User) => void;
  submissionHandler: () => void;
  errorHandler: (err: AxiosError) => void;
};

const Form = ({
  props,
  responseHandler,
  submissionHandler,
  errorHandler,
}: TProps) => {
  const loginSchema = useLoginFormValidationRules();

  return (
    <Formik
      onSubmit={data => {
        submissionHandler();
        sender<LoginRequest, User, void>(
          URLS.AUTHENTICATION.login,
          data,
          props,
          responseHandler,
          errorHandler,
          true,
        ).catch(() => {
          console.log('Error in login');
        });
      }}
      initialValues={{email: '', password: ''}}
      validationSchema={loginSchema}>
      <View style={loginStyles.formView}>
        <Input
          type={InputTypes.TEXT_INPUT}
          inputProps={{
            props: {
              autoCapitalize: 'none',
              field: 'email',
              isMandatory: true,
              placeholder: 'Email',
              height: Platform.OS === 'ios' ? '11%' : '14%',
              width: '70%',
            },
          }}
        />
        <Input
          type={InputTypes.TEXT_INPUT}
          inputProps={{
            props: {
              autoCapitalize: 'none',
              field: 'password',
              isMandatory: true,
              placeholder: 'Password',
              secureTextEntry: true,
              height: Platform.OS === 'ios' ? '11%' : '14%',
              width: '70%',
            },
          }}
        />
        <Submit
          height={Platform.OS === 'ios' ? '10%' : '12%'}
          width={'45%'}
          top={'20%'}
        />
      </View>
    </Formik>
  );
};

export default React.memo(Form);
