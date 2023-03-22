import React from 'react';
import {Formik} from 'formik';
import {Platform, View} from 'react-native';
import {InputTypes} from '../../../../components';
import Input from '../../../../components/forms/inputs/Input';
import Submit from '../../../../components/forms/submit';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  lastNameForm,
  NavigationStackTypes,
} from '../../../../types/NavigationStackTypes';
import {ScreenNames} from '../../../../types/ScreenNames';
import {signupStyles} from '../../styles';
import {useSignupTwitterNameValidationRules} from '../../../../hooks/useSignupTwitterNameValidationRules';

type TProps = {
  lastName: lastNameForm;
  navigation: NativeStackNavigationProp<NavigationStackTypes, ScreenNames>;
};

const TwitterNameForm = ({navigation, lastName}: TProps) => {
  const twitterNameSchema = useSignupTwitterNameValidationRules();
  return (
    <Formik
      onSubmit={values => {
        navigation.navigate(ScreenNames.Password, {
          twitterName: {...values, ...lastName},
        });
      }}
      validationSchema={twitterNameSchema}
      initialValues={{
        twitterName: '',
      }}>
      <View style={signupStyles.formView}>
        <Input
          type={InputTypes.TEXT_INPUT}
          inputProps={{
            props: {
              autoCapitalize: 'none',
              field: 'twitterName',
              isMandatory: true,
              placeholder: 'Twitter Username',
              textAlign: 'center',
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

export default React.memo(TwitterNameForm);
