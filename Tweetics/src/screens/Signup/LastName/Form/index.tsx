import React from 'react';
import {Formik} from 'formik';
import {Platform, View} from 'react-native';
import {InputTypes} from '../../../../components';
import Input from '../../../../components/forms/inputs/Input';
import Submit from '../../../../components/forms/submit';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  firsNameForm,
  NavigationStackTypes,
} from '../../../../types/NavigationStackTypes';
import {ScreenNames} from '../../../../types/ScreenNames';
import {signupStyles} from '../../styles';
import {useSignupLastNameValidationRules} from '../../../../hooks/useSignupLastNameValidationRules';

type TProps = {
  firstName: firsNameForm;
  navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenNames>;
};

const LastNameForm = ({firstName, navigation}: TProps) => {
  const lastNameSchema = useSignupLastNameValidationRules();
  return (
    <Formik
      onSubmit={values => {
        navigation.navigate(ScreenNames.TwitterName, {
          lastName: {...values, ...firstName},
        });
      }}
      validationSchema={lastNameSchema}
      initialValues={{
        lastName: '',
      }}>
      <View style={signupStyles.formView}>
        <Input
          type={InputTypes.TEXT_INPUT}
          inputProps={{
            props: {
              field: 'lastName',
              isMandatory: true,
              placeholder: 'Last Name',
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

export default React.memo(LastNameForm);
