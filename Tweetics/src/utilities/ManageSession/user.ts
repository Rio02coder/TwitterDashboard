import {Token} from '../../types/Token';
import {tokenMemory} from '../NativeStorage/TokenMemory';

export const addUserTokenToMemory = (token: Token) => {
  tokenMemory.setData(token);
};
