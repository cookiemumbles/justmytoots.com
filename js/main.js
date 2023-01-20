import { test_toots } from './testData.js';
import { displayServerError, displayMissingUserMessage, NoConsentError, displayNoConsentError } from './ui/ErrorScreen.js';
import Logger from './utils/Logger.js';
import { getDataCookie } from './utils/Cookie.js';
import MastodonApi from './utils/MastodonApi.js';
import { getUrlParams, getUserDataFromUrl } from './utils/Browser.js';
import { handleLoginPartTwoOrContinue, verifyLoginOrContinue } from './login.js';
import { addInitialListeners, getTargetUserData, loadPageContent, loadToots, setTargetUserData, updateOptionsStates } from './ui/DomController.js';

var log = new Logger()

// NOTEs:
// Disable pagespeed: url/?PageSpeed=off
// https://stackoverflow.com/a/49243560/3968618
// https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html
// https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#types

function main() {
  addInitialListeners()

  updateOptionsStates()
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
      verifyLoginOrContinue()
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

      // no regex, so special characters in handles/server names can not cause problems
      const possibleConsentUrls = [
        `https://justmytoots.com/${targetUserData.handle}`,
        `https://justmytoots.com/${targetUserData.userName}@${targetUserData.server}`,
      ]
      if (
        possibleConsentUrls.some(consUrl => resultUserData['note'].includes(consUrl)) ||
        /** @type Array */(resultUserData['fields']).some(element =>
          possibleConsentUrls.some(consUrl => element.value.includes(consUrl))
        )
      ) {
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


document.addEventListener("DOMContentLoaded", function() {
  main();
});
