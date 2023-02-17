import { getUrlParams } from "./Browser.js";

/** @enum {string} */
export const Options = {
  REPLIES: 'replies',
  MEDIA_ONLY: 'media_only',
  PUBLIC_ONLY: 'public_only',
};

var g_forcedOptions = {}


/** @param {string} optionName */
export function getValueForOption(optionName) {
  if (g_forcedOptions[optionName]) {
    return g_forcedOptions[optionName]
  } else {
    return getUrlParams().get(optionName)
  }
}

export function getForcedOptions() {
  return g_forcedOptions
}

/** @param {string} searchParams */
export function setForcedOptions(searchParams) {
  console.log("setForcedOptions:", searchParams)
  const urlParams = new URLSearchParams(searchParams)
  Array
    .from(urlParams)
    .forEach(([key, value]) => {
      console.log("set:", key, value)
      if (Object.values(Options).includes(key)) {
        g_forcedOptions[key] = value
      }
    })
}

