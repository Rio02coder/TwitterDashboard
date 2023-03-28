import React from 'react';
import {Formik} from 'formik';
import {Platform, View} from 'react-native';
import {InputTypes} from '../../../../components';
import Input from '../../../../components/forms/inputs/Input';
import Submit from '../../../../components/forms/submit';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  emailForm,
  NavigationStackTypes,
} from '../../../../types/NavigationStackTypes';
import {ScreenNames} from '../../../../types/ScreenNames';
import {signupStyles} from '../../styles';
import {useSignupFirstNameValidationRules} from '../../../../hooks/useSignupFirsNameValidationRules';

type TProps = {
  email: emailForm;
  navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenNames>;
};

const FirstNameForm = ({email, navigation}: TProps) => {
  const firsNameSchema = useSignupFirstNameValidationRules();
  return (
    <Formik
      onSubmit={values => {
        navigation.navigate(ScreenNames.LastName, {
          firstName: {...values, ...email},
        });
      }}
      validationSchema={firsNameSchema}
      initialValues={{
        firstName: '',
      }}>
      <View style={signupStyles.formView}>
        <Input
          type={InputTypes.TEXT_INPUT}
          inputProps={{
            props: {
              field: 'firstName',
              isMandatory: true,
              placeholder: 'First Name',
              height: Platform.OS === 'ios' ? '11%' : '15%',
              width: '70%',
            },
          }}
        />
        <Submit
          height={Platform.OS === 'ios' ? '10%' : '14%'}
          width={'45%'}
          top={'10%'}
        />
      </View>
    </Formik>
  );
};

export default React.memo(FirstNameForm);
