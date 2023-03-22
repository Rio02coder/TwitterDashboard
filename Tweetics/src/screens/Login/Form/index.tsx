import React from 'react';
import {Formik} from 'formik';
import Input, {InputTypes} from '../../../components/forms/inputs/Input';
import {Platform, View} from 'react-native';
import {loginStyles} from '../styles';
import Submit from '../../../components/forms/submit';
import {useLoginFormValidationRules} from '../../../hooks/useLoginlFormValidationRules';

const Form = () => {
  const loginSchema = useLoginFormValidationRules();
  return (
    <Formik
      onSubmit={() => {}}
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
