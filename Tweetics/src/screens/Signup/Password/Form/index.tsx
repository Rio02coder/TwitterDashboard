import React from 'react';
import {Formik} from 'formik';
import {Platform, View} from 'react-native';
import {InputTypes} from '../../../../components';
import Input from '../../../../components/forms/inputs/Input';
import Submit from '../../../../components/forms/submit';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  NavigationStackTypes,
  twitterNameForm,
} from '../../../../types/NavigationStackTypes';
import {ScreenNames} from '../../../../types/ScreenNames';
import {signupStyles} from '../../styles';
import {useSignupTwitterNameValidationRules} from '../../../../hooks/useSignupTwitterNameValidationRules';
import {useSignupPasswordValidationRules} from '../../../../hooks/useSignupPasswordValidationRules';

type TProps = {
  twitterName: twitterNameForm;
  navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenNames>;
};

const PasswordForm = ({navigation, twitterName}: TProps) => {
  const passwordSchema = useSignupPasswordValidationRules();
  return (
    <Formik
      onSubmit={() => {}}
      validationSchema={passwordSchema}
      initialValues={{
        password: '',
        passwordConfirm: '',
      }}>
      <View style={signupStyles.formView}>
        <Input
          type={InputTypes.TEXT_INPUT}
          inputProps={{
            props: {
              autoCapitalize: 'none',
              field: 'password',
              secureTextEntry: true,
              isMandatory: true,
              placeholder: 'Password',
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
              secureTextEntry: true,
              isMandatory: true,
              placeholder: 'Password Confirmation',
              height: Platform.OS === 'ios' ? '11%' : '14%',
              width: '70%',
            },
          }}
        />
        <Submit
          height={Platform.OS === 'ios' ? '10%' : '12%'}
          width={'45%'}
          top={'10%'}
        />
      </View>
    </Formik>
  );
};

export default React.memo(PasswordForm);
