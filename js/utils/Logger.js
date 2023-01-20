
export default class Logger {

  constructor() {
    this.ERROR = 0
    this.WARN  = 1
    this.INFO  = 2
    this.DEBUG = 3
    this.TRACE = 4

    this.logLevel = this.INFO

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('log')) {
      this.logLevel = Number.parseInt(urlParams.get('log'))
      switch (urlParams.get('log')) {
        case 'e':
          this.logLevel = this.ERROR
          break;
        case 'w':
          this.logLevel = this.WARN
          break;
        case 'i':
          this.logLevel = this.INFO
          break;
        case 'd':
          this.logLevel = this.DEBUG
          break;
        case 't':
          this.logLevel = this.TRACE
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
