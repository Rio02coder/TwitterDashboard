import * as Yup from 'yup';

export const useSignupFormValidationRules = () => {
  const validationRules = {
    firstName: Yup.string()
      .max(500, () => 'First name is required')
      .required(() => 'First name is required'),
    lastName: Yup.string()
      .max(500, () => 'Last name too long')
      .required(() => 'Last name is required'),
    email: Yup.string()
      .required(() => 'Email is required')
      .email(() => 'Email is invalid'),
    twitterName: Yup.string().required(() => 'You twitter name is required'),
  };
  return Yup.object(validationRules);
};
