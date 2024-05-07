export interface IUser {
  email: string;
  name: string;
}

export interface IClient {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
