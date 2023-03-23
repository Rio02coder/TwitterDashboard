import Requester from '../../service/requester';
import {URLS} from '../../service/urls';
import {ScreenProps} from '../../types/Screen';
import {ScreenNames} from '../../types/ScreenNames';
import {Token} from '../../types/Token';
import {User} from '../../types/User';

export const completeLogin = (
  userToken: Token,
  props: ScreenProps<ScreenNames.Login>,
) => {
  return new Requester<undefined, User, void>(
    undefined,
    URLS.USER.profile,
    'GET',
    props,
    (user: User) => {
      user.token = userToken;
      props.loginUser(user);
    },
  )
    .queryWithCustomToken(userToken.access)
    .then(() => {
      props.navigation.replace(ScreenNames.Main);
    })
    .catch(() => {
      return Promise.reject('Invalid Token. User needs to login.');
    });
};
