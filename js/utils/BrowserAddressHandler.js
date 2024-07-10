import WindowWrapperImpl from "./WindowWrapperImpl.js";

export default class BrowserAddressHandler {

  /**
   * @param {WindowWrapper} windowWrapper
   */
  constructor(windowWrapper = new WindowWrapperImpl()) {
    this.windowWrapper = windowWrapper
  }

  getUserHandleData() {
    var handle = this.getUserHandle()

    const splitHandle = handle.split("@")
    return {
      handle: handle,
      userName : splitHandle[1],
      server : splitHandle[2],
    }
  }

  getUserHandle() {
    const location = this.windowWrapper.location
    const urlParams = new URLSearchParams(location.search);

    let handle = ""
    if (location.pathname != "/" && location.pathname != "") {
      handle = location.pathname.slice(1)
    } else if (urlParams.has('acct')) {
      handle = urlParams.get('acct')
    } else {
      throw new Error("No username found.")
    }

    if (handle.at(0) != "@") {
      handle = "@" + handle
    }
    if (handle.split("@").length != 3) {
      throw new Error(`Invalid username '${handle}'`)
    }

    return handle
  }
}
