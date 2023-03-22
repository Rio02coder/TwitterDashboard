import React from 'react';
import {Formik} from 'formik';
import Input, {InputTypes} from '../../../components/forms/inputs/Input';
import {Platform, View} from 'react-native';
import {signupStyles} from '../styles';
import Submit from '../../../components/forms/submit';
import {useSignupFormValidationRules} from '../../../hooks/useSignupFormValidationRules';

const Form = () => {
  const signupSchema = useSignupFormValidationRules();
  return (
    <Formik
      onSubmit={() => {}}
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        twitterName: '',
        password: '',
        passwordConfirm: '',
      }}
      validationSchema={signupSchema}>
      <View style={signupStyles.formView}>
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
              field: 'firstName',
              isMandatory: true,
              placeholder: 'First Name',
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
              field: 'lastName',
              isMandatory: true,
              placeholder: 'Last Name',
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
              field: 'twitterName',
              isMandatory: true,
              placeholder: 'Twitter Username',
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
        <Input
          type={InputTypes.TEXT_INPUT}
          inputProps={{
            props: {
              autoCapitalize: 'none',
              field: 'passwordConfirm',
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
          top={'0%'}
        />
      </View>
    </Formik>
  );
};

export default React.memo(Form);
