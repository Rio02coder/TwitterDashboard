import * as Yup from 'yup';

export const useSignupLastNameValidationRules = () => {
  const validationRules = {
    lastName: Yup.string()
      .max(500, () => 'Last name too long')
      .required(() => 'Last name is required'),
  };
  return Yup.object(validationRules);
};
