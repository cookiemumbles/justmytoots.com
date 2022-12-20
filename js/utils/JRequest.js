import Logger from './Logger.js';

export default class JRequest {

  /**
   * @param {URL | string} url
   * @param {{}} [data]
   */
  static post(url, data) {
    return JRequest.request('POST', url, data);
  }

  /**
   * @param {URL | string} url
   * @param {{}} [data]
   */
  static delete(url, data) {
    return JRequest.request('DELETE', url, data)
  }

  /**
   * @param {URL | string} url
   * @param {{}} [data]
   */
  static put(url, data) {
    return JRequest.request('PUT', url, data);
  }

  /**
   * @param {URL | string} url
   * @param {{}} [data]
   */
  static get(url, data) {
    return JRequest.request('GET', url, data);
  }

  /**
     * @param {string} method
     * @param {string | URL} url
     * @param {{}} jsonData
     * @param {{}} [headers]
     */
  static request(method, url, jsonData, headers) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url);
      if (headers) {
        for (let key in headers) {
          xhr.setRequestHeader(key, headers[key])
        }
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      }

      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject(new Error(
            `[${this.status}] ${xhr.statusText} (${xhr.response})`,
          // @ts-ignore
            {cause: `Http status error connecting to ${url}`}
          ));
        }
      };
      xhr.onerror = function () {
        reject(new Error(
          `Unable to connect to server.`,
          // @ts-ignore
          {cause: `Unknown problem connecting to ${url}`}
        ));
      };
      xhr.ontimeout = function() {
        reject(new Error(
          `Connection to server timed out.`,
          // @ts-ignore
          {cause: `Timeout connecting to ${url}`}
        ));
      }


      const log = new Logger()
      log.d(`Requesting: ${url}`, jsonData)
      log.t("headers:", headers)

      xhr.send(JSON.stringify(jsonData));
    });
  }
}

/**
 * @param {string | URL} inputUrl
 * @param {string | string[][] | Record<string, string> | URLSearchParams} querryParams
 */
export function buildUrl(inputUrl, querryParams) {
  const url = new URL(inputUrl);
  url.search = new URLSearchParams(querryParams).toString()
  return url
}
