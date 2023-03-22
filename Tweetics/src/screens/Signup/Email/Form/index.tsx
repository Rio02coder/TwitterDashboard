import React from 'react';
import {Formik} from 'formik';
import {Platform, View} from 'react-native';
import {InputTypes} from '../../../../components';
import Input from '../../../../components/forms/inputs/Input';
import Submit from '../../../../components/forms/submit';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigationStackTypes} from '../../../../types/NavigationStackTypes';
import {ScreenNames} from '../../../../types/ScreenNames';
import {useSignupEmailValidationRules} from '../../../../hooks/useSignupEmailValidationRules';
import {signupStyles} from '../../styles';

type TProps = {
  navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenNames>;
};

const EmailForm = ({navigation}: TProps) => {
  const emailSchema = useSignupEmailValidationRules();
  return (
    <Formik
      onSubmit={values => {
        navigation.navigate(ScreenNames.FirstName, {email: {...values}});
      }}
      validationSchema={emailSchema}
      initialValues={{
        email: '',
      }}>
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
        <Submit
          height={Platform.OS === 'ios' ? '10%' : '12%'}
          width={'45%'}
          top={'10%'}
        />
      </View>
    </Formik>
  );
};

export default React.memo(EmailForm);
