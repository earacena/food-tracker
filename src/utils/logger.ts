/* eslint-disable no-console -- This file defines a class that only allows usage of console when in "development" mode */

export class Logger {
  log(...objects: unknown[]): void {
    if (this.isDevEnv()) {
      console.log(objects);
    }
  }

  logError(error: unknown): void {
    if (this.isDevEnv()) {
      console.error(error);
    }
  }

  isDevEnv(): boolean {
    return import.meta.env.DEV;
  }
}

export const logger = new Logger();
