

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

// TODO: This is a model saving all data as globals. Should probably be a
// simple model instance that is passed around, but need to look into this when
// refactoring and testing the main.js for example.

/** @type {UserData} */
var g_targetUserData = null

/** @type string */
var g_lastTootId = null

/** @type {import("../testData").AccountJson} */
var g_accountData = null

var g_optionsData = null

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

/** @param {any} optionsData */
export function setOptions(optionsData) {
  g_optionsData = optionsData
}

export function getOptions() {
  return g_optionsData
}
