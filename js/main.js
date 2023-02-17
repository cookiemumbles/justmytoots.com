import { test_toots } from './testData.js';
import { displayServerError, displayMissingUserMessage, NoConsentError, displayNoConsentError } from './ui/ErrorScreen.js';
import Logger from './utils/Logger.js';
import { getDataCookie } from './utils/Cookie.js';
import MastodonApi from './utils/MastodonApi.js';
import { getUrlParams, getUserDataFromUrl } from './utils/Browser.js';
import { handleLoginPartTwoOrContinue, verifyLoginOrContinue } from './login.js';
import { addInitialListeners, displayLoggedInState, loadPageContent, loadToots, updateOptionsStates } from './ui/DomController.js';
import { getTargetUserData, setTargetUserData } from './utils/MemoryData.js';
import { setForcedOptions } from './utils/Options.js';

var log = new Logger()

// NOTEs:
// Disable pagespeed: url/?PageSpeed=off
// https://stackoverflow.com/a/49243560/3968618
// https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html
// https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#types

function main() {
  addInitialListeners()

  try {
    setTargetUserData(getUserDataFromUrl())
  } catch (e) {
    displayMissingUserMessage(e)
    return
  }

  if (getUrlParams().has('testdata')) {
    loadToots(test_toots)
    return
  }

  handleLoginPartTwoOrContinue()
    .then(() => {
      return verifyLoginOrContinue()
    })
    .then(() => {
      const loginData = getDataCookie();
      if ('bearer_token' in loginData) {
        const loginData = getDataCookie();
        return MastodonApi
          .getAccountInfo(loginData.server, getTargetUserData().handle, loginData.bearer_token)
      } else {
        return MastodonApi
          .getAccountInfo(getTargetUserData().server, getTargetUserData().handle)
      }
    })
    .then((/** @type {object} */ result) => {
      const resultUserData = JSON.parse(result);
      log.t('resultUserData:', resultUserData);
      const targetUserData = getTargetUserData()

      const regex = new RegExp(
        `https://(www.)?justmytoots.com/@?${targetUserData.userName}@${targetUserData.server}(.*)`
      )
      const urlsGivingConsent = Array.from(resultUserData['fields'])
        .map(field => field.value)
        .concat(resultUserData['note'])
        // now is array of all texts that could have an url
        .flatMap(text => text.match(/(https?:\/\/[^\s\"]+)/g))
        .filter(it => (it)) // remove 'null' matches
        .filter((/** @type string */ it) => regex.test(it.toLowerCase())) // matches validation regex


      urlsGivingConsent.map(it => {
        // the [2] match group has the ?prop=value&prop=value elements
        setForcedOptions(htmlDecode(regex.exec(it)[2]))
      })
      updateOptionsStates()

      if (urlsGivingConsent.length > 0) {
        log.d("consent granted")

      } else {
        throw new NoConsentError(targetUserData)
      }

      // merge the values we need into our data
      targetUserData['id'] = resultUserData['id'];
      targetUserData['avatar'] = resultUserData['avatar'];
      targetUserData['display_name'] = resultUserData['display_name'];
      targetUserData['url'] = resultUserData['url'];
      log.d("Enriched target user data:", targetUserData);
      setTargetUserData(targetUserData)

      displayLoggedInState()
      loadPageContent(targetUserData);
    })
    .catch((/** @type {Error} */ error) => {
      if (error instanceof NoConsentError) {
        displayNoConsentError(error)
      } else {
        displayServerError(error)
      }
    })
}

/** @param {string} input */
function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

document.addEventListener("DOMContentLoaded", function() {
  main();
});
