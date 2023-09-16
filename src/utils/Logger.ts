class Logger {

  constructor() {}

  log(message: string): void {
    if (this.isDevEnv()) {
      console.log(message);
    }
  }

  logError(error: Error | string | unknown): void {
    if (this.isDevEnv()) {
      console.error(error);
    }
  }

  isDevEnv(): boolean {
    return import.meta.env.DEV
  }
}

const logger = new Logger();

export default logger;
