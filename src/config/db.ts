interface IMongoUrlConfig {
  user?: string;
  password?: string;
}

class Mongo {
  user?: string;
  password?: string;

  constructor(config:IMongoUrlConfig) {
    this.user = config.user;
    this.password = config.password;
  }

  get url() {
    return `mongodb+srv://${this.user}:${this.password}@cluster0-tjt0u.mongodb.net/test?retryWrites=true&w=majority`
  }
}

export default Mongo;
