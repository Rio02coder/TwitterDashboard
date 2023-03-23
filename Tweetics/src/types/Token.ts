export type Token = {
  access: string;
  refresh: string;
  expires_in: number;
};

export type AccessTokenRequest = {
  token: Token['refresh'];
};
