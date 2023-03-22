import * as Yup from 'yup';

export const useSignupPasswordValidationRules = () => {
  const validationRules = {
    password: Yup.string()
      .min(6, 'Password has at least 6 characters')
      .required('Password Required'),
    passwordConfirm: Yup.string()
      .min(6, 'Password has at least 6 characters')
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Password confirmation is required'),
  };
  return Yup.object(validationRules);
};
