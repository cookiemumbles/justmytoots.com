import Logger from '/js/utils/Logger.js';

export default class JRequest {

  static post(url, data) {
    return JRequest.request('POST', url, data);
  }

  static delete(url, data) {
    return JRequest.request('DELETE', url, data)
  }

  static put(url, data) {
    return JRequest.request('PUT', url, data);
  }

  static get(url, data) {
    return JRequest.request('GET', url, data);
  }

  static request(method, url, jsonData) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Content-Type','application/json')
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject(new Error(
            `[${this.status}] ${xhr.statusText} (${xhr.response})`,
            {cause: `Http status error connecting to ${url}`}
          ));
        }
      };
      xhr.onerror = function () {
        reject(new Error(
          `Unable to connect to server.`,
          {cause: `Unknown problem connecting to ${url}`}
        ));
      };
      xhr.ontimeout = function() {
        reject(new Error(
          `Connection to server timed out.`,
          {cause: `Timeout connecting to ${url}`}
        ));
      }

      new Logger().d(`Requesting: ${url}`, JSON.stringify(jsonData))
      xhr.send(JSON.stringify(jsonData));
    });
  }
}
