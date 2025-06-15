export interface IJwtRes {
  accessToken: string;
  refreshToken: string;
  expires: string;
}

export interface ISignInArgs {
  username: string;
  password: string;
}
