import {Secret} from "jsonwebtoken";

export enum ExpireLenght {
  day = '1d',
  week = '7d',
  month = '30d'
};

interface IAuthConfig {
  secret?: Secret,
  expires?: ExpireLenght
}

class Auth {
  secret?: Secret;
  expires?: ExpireLenght;

  constructor(config: IAuthConfig) {
    this.secret = config.secret;
    this.expires = config.expires;
  }
}

export default Auth;