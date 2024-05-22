import UrlCall from './UrlCall.js';


export class UrlCallFactory {

  constructor(
    httpRequest = new XMLHttpRequest(),
    providedLogger = new LoggerImpl()
  ) {
    this.httpRequest = httpRequest
    this.logger = providedLogger
  }

    build() {
        return new UrlCall(this.httpRequest, this.logger);
    }

}

