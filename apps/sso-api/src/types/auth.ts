export enum EUserRole {
  Admin = 'admin',
  Plus = 'plus',
  Member = 'member',
  Guest = 'guest',
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface ITokenPayload {
  id: string;
  role: EUserRole;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    username: string;
    role: EUserRole;
  };
}

export interface IRefreshTokenRequest {
  refreshToken: string;
}
