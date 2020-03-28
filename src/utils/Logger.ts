class Logger {
  private logPrefix: string;
  private errorPrefix: string;

  constructor() {
    this.logPrefix = "[MNL-Cards::LOG] ";
    this.errorPrefix = "[MNL-Cards::ERROR] ";
  }

  log(message: string) {
    console.log(`${this.logPrefix}${message}`);
  }

  error(message: string) {
    console.error(`${this.errorPrefix}${message}`);
  }
}

export default new Logger();
