import UrlCall from "../js/utils/UrlCall.js";

/** @implements UrlCall */
export class StubUrlCall extends UrlCall {
  constructor() {
    super(null, null)
  }

  /** Perform 'Read' operation. Request data from the server.
   *
   * Returns a Promise that performs the request.
   */
  get() {
    this.requestMethod = "GET"
    return new Promise(function (resolve, reject) {
    })
  }

  /** Perform 'Create' operation. Sends new data to a server.
   *
   * Returns a Promise that performs the request.
   */
  post() {
    this.requestMethod = "POST"
    return new Promise(function (resolve, reject) {
    })
  }

  /** Perform 'Update' operation. Sends new data to a server to update or replace something.
   *
   * Returns a Promise that performs the request.
   */
  put() {
    this.requestMethod = "PUT"
    return new Promise(function (resolve, reject) {
    })
  }

  /** Perform 'Delete' operation. Ask the server to delete something.
   *
   * Returns a Promise that performs the request.
   */
  delete() {
    this.requestMethod = "DELETE"
    return new Promise(function (resolve, reject) {
    })
  }


  /**
   * Adds a request header with the provided value.
   *
   * @param {string} headerId
   * @param {string} headerValue
   */
  addHeader(headerId, headerValue) {
    this.requestHeaders[headerId] = headerValue
    return this
  }
}


