import {Token} from '../../types/Token';
import Memory from './Memory';
const TOKEN_STRING = 'USER_AUTH_TOKEN';

class TokenMemory extends Memory<Token> {
  constructor() {
    super(TOKEN_STRING);
  }

  private isTokenValid(token: Token | undefined) {
    return token ? true : false;
  }

  public async getToken(): Promise<false | Token> {
    const data = await this.getData();
    if (data) {
      return data;
    } else {
      return false;
    }
  }
}

// Exposing singleton
export const tokenMemory = new TokenMemory();
