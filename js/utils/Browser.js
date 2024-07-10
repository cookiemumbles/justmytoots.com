import { buildUrl } from "./JRequest.js"

// TODO: Test this data:
// - replace window calls with WindowWrapper
// - replace JRequest with UrlCall
// - write good tests

export function getUserDataFromUrl() {
  var userData = {}
  var handle = getUserHandle()
  const splitAccount = handle.split("@")
  if (splitAccount.length == 2) {
    userData.server = splitAccount[1]
    userData.userName = splitAccount[0]
    userData.handle = `@${userData.userName}@${userData.server}`
  } else if (splitAccount.length == 3) {
    if (splitAccount[0] != "" || splitAccount[2] == "") {
      throw new Error(`Invalid username ${handle}`)
    }
    userData.server = splitAccount[2]
    userData.userName = splitAccount[1]
    userData.handle = `@${userData.userName}@${userData.server}`
  } else {
    throw new Error(`Invalid username ${handle}`)
  }

  return userData
}


export function getUserHandle() {
  const urlParams = getUrlParams()
  if (window.location.pathname != "/") {
    return window.location.pathname.slice(1)
  } else if (urlParams.has('acct')) {
    return urlParams.get('acct')
  } else {
    throw new Error("No username found.")
  }
}

export function clearCodeTokenFromUrl() {
  removeUrlSearchParam('code')
}

/** @param {string} paramName */
export function removeUrlSearchParam(paramName) {
  const urlParams = getUrlParams()
  while (urlParams.has(paramName)) { // in case old ones
    urlParams.delete(paramName)
  }
  const newUrl = buildUrl(window.location.href, urlParams)
  window.history.replaceState({}, "", newUrl);
}

/**
 * @param {string} name
 * @param {string} value
 */
export function addUrlSearchParam(name, value) {
  const urlParams = getUrlParams()
  urlParams.set(name, value)
  const newUrl = buildUrl(window.location.href, urlParams)
  window.history.replaceState({}, "", newUrl);
}

export function getUrlParams() {
  return new URLSearchParams(window.location.search);
}
