
/**
 * Simple wrapper for the 'document' variable to allow stub replacement in tests
 * @implements {DocumentWrapper}
 */
export default class DocumentWrapperImpl {
  /** @param {string} string */
  writeCookieString(string) {
    return document.cookie = string
  }

  /** @returns {string} cookie value */
  readCookieString() {
    return document.cookie
  }
}
