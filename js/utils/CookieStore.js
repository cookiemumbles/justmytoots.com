import DocumentWrapperImpl from "./DocumentWrapperImpl.js";
import LoggerImpl from "./LoggerImpl.js";

/**
 * Wrapper class around the basic cookie structure to provide
 * safe reading and writing of json objects.
 */
export default class CookieStore {

  /**
   * @param {DocumentWrapper} providedDocument
   * @param {Logger} providedLogger
   */
  constructor(
    providedDocument = new DocumentWrapperImpl(),
    providedLogger = new LoggerImpl()
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
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    const jsonString = JSON.stringify(jsonData);
    this.documentWrapper.writeCookieString(`data=${jsonString}; expires=${expirationDate.toUTCString()}; path=/`)
  }

  reset() {
    this.documentWrapper.writeCookieString("data={};expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;")
    this.logger.d("cleared cookie")
  }

  /** @param {{}} inputData */
  appendData(inputData) {
    const data = this.getData()
    for (const key in inputData) {
      data[key] = inputData[key]
    }
    this.setData(data)
  }

}

