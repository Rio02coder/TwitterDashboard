import * as Yup from 'yup';

export const useLoginFormValidationRules = () => {
  const validationRules = {
    email: Yup.string()
      .required(() => 'Email is required')
      .email(() => 'Email is invalid'),
    password: Yup.string().required(() => 'Password is required'),
  };
  return Yup.object(validationRules);
};
