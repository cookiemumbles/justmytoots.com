import LoggerLive from './LoggerLive.js';

/**
 * Perform a basic (curl style) HttpRequest using a convenient builder pattern.
 */
export default class UrlCall {

  constructor(
    httpRequest = new XMLHttpRequest(),
    providedLogger = new LoggerLive()
  ) {
    this.httpRequest = httpRequest
    this.requestHeaders = {}
    this.logger = providedLogger
  }

  /** @param {string} url */
  withUrl(url) {
    this.url = url
    return this
  }

  /**
   * Adds querry parameters to the url.
   * E.g. providing { param: 'value' } will result in: http://my.url?param=value
   *
   * @param { {} | string | string[][] | Record<string, string> | URLSearchParams} [querryParams]
   */
  withParams(querryParams) {
    const url = new URL(this.url);
    url.search = new URLSearchParams(querryParams).toString()
    this.url = url.toString()
    return this
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

  /** Add a header specifying the data has the json content type. */
  addJsonDataHeader() {
    this.addHeader('Content-Type', 'application/json;charset=UTF-8')
    return this
  }

  /** Provide json or string data to send in the request.
   *
   * @param {{}} jsonData
   */
  withData(jsonData) {
    this.jsonData = jsonData
    return this
  }

  /** Perform 'Read' operation. Request data from the server.
   *
   * Returns a Promise that performs the request.
   */
  get() {
    this.requestMethod = "GET"
    return this.#call()
  }

  /** Perform 'Create' operation. Sends new data to a server.
   *
   * Returns a Promise that performs the request.
   */
  post() {
    this.requestMethod = "POST"
    return this.#call()
  }

  /** Perform 'Update' operation. Sends new data to a server to update or replace something.
   *
   * Returns a Promise that performs the request.
   */
  put() {
    this.requestMethod = "PUT"
    return this.#call()
  }

  /** Perform 'Delete' operation. Ask the server to delete something.
   *
   * Returns a Promise that performs the request.
   */
  delete() {
    this.requestMethod = "DELETE"
    return this.#call()
  }

  #call() {
    const urlCall = this
    return new Promise(function (resolve, reject) {
      urlCall.httpRequest.open(urlCall.requestMethod, urlCall.url);

      for (let key in urlCall.requestHeaders) {
        urlCall.httpRequest.setRequestHeader(key, urlCall.requestHeaders[key])
      }

      urlCall.httpRequest.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(urlCall.httpRequest.response);
        } else {
          reject(new ErrorResponse(
            this.status,
            urlCall.httpRequest.statusText,
            urlCall.httpRequest.response,
            urlCall.url
          ))
        }
      };

      urlCall.httpRequest.onerror = function () {
        reject(new Error(
          `Unable to connect to server.`,
          // @ts-ignore
          {cause: `Unknown problem connecting to ${urlCall.url}`}
        ));
      };

      urlCall.httpRequest.ontimeout = function() {
        reject(new Error(
          `Connection to server timed out.`,
          // @ts-ignore
          {cause: `Timeout connecting to ${urlCall.url}`}
        ));
      }

      urlCall.logger.d(`Requesting: ${urlCall.url}`, urlCall.jsonData)
      urlCall.logger.t("headers:", urlCall.requestHeaders)

      urlCall.httpRequest.send(JSON.stringify(urlCall.jsonData));

    })
  }
}


export class ErrorResponse extends Error {
  /** @type {number} */
  httpCode = 0
   /** @type {string} */
  statusText = ""
  /** @type {any} */
  response = ""
  /** @type {string | URL} */
  requestUrl = ""
  /**
     * @param {number} httpCode
     * @param {string} statusText
     * @param {any} response
     * @param {string | URL} requestUrl
     */
  constructor(httpCode, statusText, response, requestUrl) {
    super(`[${httpCode}] ${statusText}.\nRequested:${requestUrl}\n Response:\n${response}`);
    this.name = "ErrorResponse";

    this.httpCode = httpCode
    this.statusText = statusText
    this.response = response
    this.requestUrl = requestUrl
  }
}


