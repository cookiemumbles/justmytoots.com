import UrlCall from "../js/utils/UrlCall.js";

/** @implements UrlCall */
export class StubUrlCall extends UrlCall {
  constructor() {
    super(null, null)
  }

  // overwrites parent implementation
  // @ts-ignore
  #call() {
    return new Promise(function (resolve, reject) { })
  }
}


