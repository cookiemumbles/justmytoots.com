import { buildUrl } from "./JRequest.js"

export function getUserDataFromUrl() {
  var userData = {}
  var handle = getUserHandle()
  const splitAccount = handle.split("@")
  if (splitAccount.length == 2) {
    userData.handle = handle
    userData.server = splitAccount[1]
    userData.userName = splitAccount[0]
  } else if (splitAccount.length == 3) {
    userData.handle = handle
    if (splitAccount[0] != "" || splitAccount[2] == "") {
      throw new Error(`Invalid username ${handle}`)
    }
    userData.server = splitAccount[2]
    userData.userName = splitAccount[1]
  } else {
    throw new Error(`Invalid username ${handle}`)
  }

  return userData
}


export function getUserHandle() {
  const urlParams = new URLSearchParams(window.location.search);
  if (window.location.pathname != "/") {
    return window.location.pathname.slice(1)
  } else if (urlParams.has('acct')) {
    return urlParams.get('acct')
  } else {
    throw new Error("No username found.")
  }
}

export function clearCodeTokenFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  while (urlParams.has('code')) { // in case old ones
    urlParams.delete('code')
  }
  const newUrl = buildUrl(window.location.href, urlParams)
  window.history.replaceState({}, "", newUrl);
}
