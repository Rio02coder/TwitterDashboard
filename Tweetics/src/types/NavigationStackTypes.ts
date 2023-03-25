import {ScreenNames} from './ScreenNames';

type NavigationStackTypesStructure = {[key in string]: any};

export type emailForm = {
  email: string;
};

export type firsNameForm = {
  firstName: string;
} & emailForm;

export type lastNameForm = {
  lastName: string;
} & firsNameForm;

export type twitterNameForm = {
  twitterName: string;
} & lastNameForm;

export type passwordForm = {
  password: string;
  passwordConfirm: string;
} & twitterNameForm;

export interface NavigationStackTypes extends NavigationStackTypesStructure {
  [ScreenNames.Login]: {logout?: boolean};
  [ScreenNames.Main]: undefined;
  [ScreenNames.Email]: undefined;
  [ScreenNames.FirstName]: {
    email: emailForm;
  };
  [ScreenNames.LastName]: {
    firstName: firsNameForm;
  };
  [ScreenNames.TwitterName]: {
    lastName: lastNameForm;
  };
  [ScreenNames.Password]: {
    twitterName: twitterNameForm;
  };
  [ScreenNames.Tweets]: undefined;
  [ScreenNames.Prediction]: undefined;
  [ScreenNames.SearchPrediction]: undefined;
  [ScreenNames.Dashboard]: undefined;
}
