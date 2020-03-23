interface IAuthConfig {
  expires: string;
  secret: string;
}

const config: IAuthConfig = {
  expires: "7d",
  secret: "568bb298b173899f584db1d6f8f3f7cd",
};

export default config;
