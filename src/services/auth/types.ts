export interface IClient {
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}
