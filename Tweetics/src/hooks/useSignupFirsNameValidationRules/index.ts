import * as Yup from 'yup';

export const useSignupFirstNameValidationRules = () => {
  const validationRules = {
    firstName: Yup.string()
      .max(500, () => 'First name is required')
      .required(() => 'First name is required'),
  };
  return Yup.object(validationRules);
};
