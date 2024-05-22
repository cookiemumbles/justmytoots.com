
/**
 * @implements {DocumentWrapper}
 */
export default class DocumentWrapperStub {
  constructor() {
    this.cookie = "";
  }
  /** @param {string} string */
  writeCookieString(string) {
    return this.cookie = string
      // live cookies only return key=value
      .substring(0, string.lastIndexOf('; expires='))
  }

  /** @returns {string} cookie value */
  readCookieString() {
    return this.cookie
  }
}

