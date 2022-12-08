
export default class Logger {

  ERROR = 0
  WARN  = 1
  INFO  = 2
  DEBUG = 3
  TRACE = 4

  logLevel = this.INFO

  constructor() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('log')) {
      this.logLevel = urlParams.get('log')
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

  e(...args) {
    console.error(...args)
  }

  /** Normal logging */
  w(...args) {
    if (this.logLevel >= this.WARN) {
      console.warn(...args)
    }
  }

  /** Normal logging */
  i(...args) {
    if (this.logLevel >= this.INFO) {
      console.log(...args)
    }
  }

  /** Normal logging */
  d(...args) {
    if (this.logLevel >= this.DEBUG) {
      console.log(...args)
    }
  }

  /** Normal logging */
  t(...args) {
    if (this.logLevel >= this.TRACE) {
      console.log(...args)
    }
  }

}
