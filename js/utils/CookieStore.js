import DocumentWrapper from "./DocumentWrapper.js";
import LoggerLive from "./LoggerLive.js";

/**
 * Wrapper class around the basic cookie structure to provide
 * safe reading and writing of json objects.
 */
export default class CookieStore {

  /**
   * @param {any} providedDocument
   * @param {Logger} providedLogger
   */
  constructor(
    providedDocument = new DocumentWrapper(),
    providedLogger = new LoggerLive()
  ) {
    this.documentWrapper = providedDocument
    this.logger = providedLogger
  }

  getData() {
    if (this.documentWrapper.readCookieString().length != 0) {
      try {
        const stringValue = this
          .documentWrapper
          .readCookieString()
          .substring("data=".length)
        return JSON.parse(stringValue);
      } catch {
        this.logger.e("Invalid cookie data. Deleting cookie. Had value:", this.documentWrapper.readCookieString())
        this.reset()
        return {}
      }
    } else {
      return {}
    }
  }

  /** @param {{}} jsonData */
  setData(jsonData) {
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    var jsonString = JSON.stringify(jsonData);
    this.documentWrapper.writeCookieString(`data=${jsonString}; expires=${expirationDate.toUTCString()}; path=/`)
  }

  reset() {
    this.documentWrapper.writeCookieString("data={};expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;")
    this.logger.d("cleared cookie")
  }

  /** @param {{}} inputData */
  appendData(inputData) {
    let data = this.getData()
    for (let key in inputData) {
      data[key] = inputData[key]
    }
    this.setData(data)
  }

}

