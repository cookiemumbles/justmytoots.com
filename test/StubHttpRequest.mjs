/** @implements {XMLHttpRequest} */
// @ts-ignore

export default class StubHttpRequest {
    constructor() {
        this.requestHeaders = {};
        this.onload = function() { };
        this.onerror = function() { };
        this.ontimeout = function() { };
        this.status = 200;
        this.response = "SUCCESS";
        this.statusText = "SUCCESS";
    }

    /**
     * @param {string} method
     * @param {string | URL} url
     */
    open(method, url) {
        this.opened = true;
        this.requestMethod = method;
        this.url = url;
    }

    /**
     * @param {string} data
     */
    send(data) {
        this.sentData = data;
    }

    /**
     * @param {string} key
     * @param {string} value
     */
    setRequestHeader(key, value) {
        this.requestHeaders[key] = value;
    }
}

