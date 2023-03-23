import {passwordForm} from '../NavigationStackTypes';

export type BackendSignupData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  twitter_name: string;
};

export const convertToBackendSignupData = (
  signUpFrontend: passwordForm,
): BackendSignupData => {
  return {
    first_name: signUpFrontend.firstName,
    last_name: signUpFrontend.lastName,
    email: signUpFrontend.email,
    password: signUpFrontend.password,
    twitter_name: signUpFrontend.twitterName,
  };
};
