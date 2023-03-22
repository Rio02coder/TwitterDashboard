import React from 'react';
import {Text} from 'react-native';
import {FormikErrors, FormikTouched} from 'formik';
import {errorStyles} from './styles';

type TProps<D> = {
  touched: FormikTouched<D>;
  field: keyof D;
  errors: FormikErrors<D>;
};

function FormFieldError<D>({touched, field, errors}: TProps<D>) {
  const canDisplay = touched[field] as boolean;
  const errorMessages = errors[field];
  const isErrorVisible = (canDisplay && errorMessages) as boolean;

  return (
    <Text style={errorStyles.error}>
      {isErrorVisible ? (errorMessages as string) : ' '}
    </Text>
  );
}

export default React.memo(FormFieldError) as unknown as typeof FormFieldError;
