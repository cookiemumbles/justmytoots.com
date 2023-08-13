import CookieStore from './utils/CookieStore.js';
import MastodonApi from './utils/MastodonApi.js';
import LoggerLive from './utils/LoggerLive.js';
import { clearCodeTokenFromUrl } from './utils/Browser.js';
import { showSnacError } from './ui/Snacbar.js';
import { setLoggedInUserData } from './utils/MemoryData.js';

var log = new LoggerLive()


/**
 * @param {string} server
 */
export function performLogin(server) {
  const data = { 'server': server }
  const cookieStore = new CookieStore()
  cookieStore.setData(data) // overwrite old info

  // there can be some weird whitespace characters in there for some reason
  const callbackUrl = decodeURIComponent(window.location.href.toString())

  MastodonApi.requestNewApiApp('justmytoots_test', server, callbackUrl)
    .then(function(result) {
      log.t("requesting api app result:", result)
      const resultData = JSON.parse(result)
      let cookieStore = new CookieStore()
      cookieStore.appendData({
        client_id: resultData.client_id,
        client_secret: resultData.client_secret,
      })

      clearCodeTokenFromUrl() // in case something whent really wrong last time remove leftovers

      const loginData = cookieStore.getData()
      MastodonApi.requestLoginPage(
        loginData.server,
        loginData.client_id,
        callbackUrl
      )
    })
}

export function verifyLoginOrContinue() {
  const cookieStore = new CookieStore()
  const loginData = cookieStore.getData();
  if ('bearer_token' in loginData) {
    return MastodonApi
      .verifyCredentials(loginData.server, loginData.bearer_token)
      .then((result) => {
        log.i("credentials valid")
        const loggedInUserData = JSON.parse(result)
        log.t("Logged in user data:", loggedInUserData)
        setLoggedInUserData(loggedInUserData)
        return Promise.resolve(true)
      })
      .catch((/** @type {Error} */ error) => {
        log.w("Credentials appear invalid. Deleting persisted values.");
        log.e(error);
        cookieStore.reset();
        showSnacError("Login error. Please try again.")
        return Promise.resolve(false)
      })
  } else {
    return Promise.resolve(false)
  }
}

export async function handleLoginPartTwoOrContinue() {
  const urlParams = new URLSearchParams(window.location.search);
  const cookieStore = new CookieStore()
  const currentCookieData = cookieStore.getData()

  if (urlParams.has('code')
    && 'client_id' in currentCookieData
    && !('bearer_token' in currentCookieData)) {

    log.i("Continuing login...")

    // returned from login
    cookieStore.appendData({ code: urlParams.get('code') })
    clearCodeTokenFromUrl()

    // there can be some weird whitespace characters in there for some reason
    const callbackUrl = decodeURIComponent(window.location.href.toString())

    try {
      const loginData = cookieStore.getData()
      const rawResultData = await MastodonApi.requestBearerToken(
        loginData.server,
        loginData.code,
        loginData.client_id,
        loginData.client_secret,
        callbackUrl
      );
      const resultData = JSON.parse(rawResultData);

      cookieStore.appendData({ bearer_token: resultData.access_token });

      log.i("Login complete");
    } catch (error) {
      showSnacError("Error validating login. Please try again.");
      log.e("Error during login. Deleting partial login data.", error);
      cookieStore.reset();
    }
  } else {
    return Promise.resolve()
  }
}
