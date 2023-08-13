
const LogLevel = {
  ERROR : 0,
  WARN  : 1,
  INFO  : 2,
  DEBUG : 3,
  TRACE : 4,
};


/** @implements {Logger} */
export default class LoggerLive {

  constructor() {
    this.logLevel = LogLevel.INFO

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('log')) {
      this.logLevel = Number.parseInt(urlParams.get('log'))
      switch (urlParams.get('log')) {
        case 'e':
          this.logLevel = LogLevel.ERROR
          break;
        case 'w':
          this.logLevel = LogLevel.WARN
          break;
        case 'i':
          this.logLevel = LogLevel.INFO
          break;
        case 'd':
          this.logLevel = LogLevel.DEBUG
          break;
        case 't':
          this.logLevel = LogLevel.TRACE
          break;
        default:
          // keep default
          break;
      }
    }
  }

  /** Error log
   * @param {...any} args */
  e(...args) {
    console.error(...args)
  }

  /** Warning log
   * @param {...any} args */
  w(...args) {
    if (this.logLevel >= this.WARN) {
      console.warn(...args)
    }
  }

  /** Normal logging
   * @param {...any} args */
  i(...args) {
    if (this.logLevel >= this.INFO) {
      console.log(...args)
    }
  }

  /** Debug log, written to console.log
   * @param {...any} args */
  d(...args) {
    if (this.logLevel >= this.DEBUG) {
      console.log(...args)
    }
  }

  /** Trace log, written to console.log
   * @param {...any} args */
  t(...args) {
    if (this.logLevel >= this.TRACE) {
      console.log(...args)
    }
  }

}
