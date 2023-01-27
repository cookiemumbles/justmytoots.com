

/**
 * @typedef {Object} UserData
 * @prop {string} server
 * @prop {string} userName
 * @prop {string} handle
 * @prop {string} [id]
 * @prop {string} [avatar]
 * @prop {string} [display_name]
 * @prop {string} [url]
 */

/** @type {UserData} */
var g_targetUserData = null

/** @type string */
var g_lastTootId = null

/** @type {import("../testData").AccountJson} */
var g_accountData = null


/** @param {UserData} targetUserData */
export function setTargetUserData(targetUserData) {
  g_targetUserData = targetUserData
}

/** @returns {UserData} */
export function getTargetUserData() {
  return g_targetUserData
}

/** @param {string} lastTootId */
export function setLastTootId(lastTootId) {
  g_lastTootId = lastTootId
}

/** @returns string */
export function getLastTootId() {
  return g_lastTootId
}

/** @param {import("../testData").AccountJson} accountData */
export function setLoggedInUserData(accountData) {
  g_accountData = accountData
}

export function getLoggedInUserData() {
  return g_accountData
}
