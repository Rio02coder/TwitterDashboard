import * as Yup from 'yup';

export const useSignupEmailValidationRules = () => {
  const validationRules = {
    email: Yup.string()
      .required(() => 'Email is required')
      .email(() => 'Email is invalid'),
  };
  return Yup.object(validationRules);
};
