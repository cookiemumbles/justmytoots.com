
/**
 * Simple wrapper for the 'document' variable to allow stub replacement in tests
 */
export default class DocumentWrapper {
  /** @param {string} string */
  writeCookieString(string) {
    return document.cookie = string
  }

  /** @returns {string} cookie value */
  readCookieString() {
    return document.cookie
  }
}
