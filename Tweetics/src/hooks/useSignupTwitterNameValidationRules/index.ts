import * as Yup from 'yup';

export const useSignupTwitterNameValidationRules = () => {
  const validationRules = {
    twitterName: Yup.string().required(() => 'You twitter name is required'),
  };
  return Yup.object(validationRules);
};
