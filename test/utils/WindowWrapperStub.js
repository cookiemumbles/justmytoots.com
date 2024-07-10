

/**
 * @implements {WindowWrapper}
 */
export default class WindowWrapperStub {
  // @ts-ignore
  location = { }
  // @ts-ignore
  history = { }

  /**
     * @param {string} url
     */
  setLocation(url) {
    this.location['href'] = url
    this.location['protocol'] = url.split("://")[0] + ":"
    const extendedProtocol = this.location['protocol'] + "//"
    const hrefWithoutExtendedProtocol = url.substring(extendedProtocol.length)

    this.location['host'] = hrefWithoutExtendedProtocol.split(/[\/\?#$]/)[0]
    this.location['origin'] = extendedProtocol + this.location['host']

    const hostSplit = this.location['host'].split(":")
    this.location['hostname'] = hostSplit[0]
    if (hostSplit.length == 2) {
      this.location['port'] = hostSplit[1]
    } else {
      this.location['port'] = ""
    }

    const completePath = hrefWithoutExtendedProtocol.substring(this.location['host'].length)

    const splitAfterHost = completePath.split(/[\?#]/)
    if (splitAfterHost.length == 3) {
      this.location['pathname'] = splitAfterHost[0]
      this.location['search'] = "?" + splitAfterHost[1]
      this.location['hash'] = "#" +  splitAfterHost[2]
    } else if (splitAfterHost.length == 2) {
      this.location['pathname'] = splitAfterHost[0]
      if (completePath.indexOf("#") == -1) {
        this.location['search'] = "?" + splitAfterHost[1]
        this.location['hash'] = ""
      } else {
        this.location['search'] = ""
        this.location['hash'] = "#" + splitAfterHost[1]
      }
    } else if (splitAfterHost.length == 1) {
      this.location['pathname'] = splitAfterHost[0]
      this.location['search'] = ""
      this.location['hash'] = ""
    }
  }
}
