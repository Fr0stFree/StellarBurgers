export interface ICredentials {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface IUser {
  readonly email: string;
  readonly name: string;
}

export interface IUserWithPassword extends IUser {
  readonly password: string;
}

export interface IClient extends ICredentials {
  readonly user: IUser;
}
