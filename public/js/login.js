import { getDataCookie, appendDataCookie, deleteDataCookie, setDataCookie } from './utils/Cookie.js';
import MastodonApi from './utils/MastodonApi.js';
import Logger from './utils/Logger.js';
import { clearCodeTokenFromUrl } from './utils/Browser.js';
import { showSnacError } from './ui/Snacbar.js';

var log = new Logger()

export function verifyLoginOrContinue() {
  const loginData = getDataCookie();
  if ('bearer_token' in loginData) {
    return MastodonApi
      .verifyCredentials(loginData.server, loginData.client_id, loginData.bearer_token)
      .then(() => {
        log.i("credentials valid")
        document.getElementById("btn_login").textContent = "Logout"
        Promise.resolve(true)
      })
      .catch((/** @type {Error} */ error) => {
        log.w("Credentials appear invalid. Deleting persisted values.");
        log.e(error);
        deleteDataCookie();
        showSnacError("Login error. Please try again.")
        Promise.resolve(false)
      })
  } else {
    return Promise.resolve(false)
  }
}


/**
 * @param {string} server
 */
export function performLogin(server) {
  const data = { 'server': server }
  setDataCookie(data) // overwrite old info

  // there can be some weird whitespace characters in there for some reason
  const callbackUrl = decodeURIComponent(window.location.href.toString())

  MastodonApi.requestNewApiApp('justmytoots_test', server, callbackUrl)
    .then(function(result) {
      console.log(result)
      const resultData = JSON.parse(result)
      appendDataCookie({
        client_id: resultData.client_id,
        client_secret: resultData.client_secret,
      })

      clearCodeTokenFromUrl() // in case something whent really wrong last time remove leftovers

      const loginData = getDataCookie()
      MastodonApi.requestLoginPage(
        loginData.server,
        loginData.client_id,
        callbackUrl
      )
    })
}

export async function handleLoginPartTwoOrContinue() {
  const urlParams = new URLSearchParams(window.location.search);
  const currentCookieData = getDataCookie()

  if (urlParams.has('code')
    && 'client_id' in currentCookieData
    && !('bearer_token' in currentCookieData)) {

    log.i("Continuing login...")

    // returned from login
    appendDataCookie({ code: urlParams.get('code') })
    clearCodeTokenFromUrl()

    // there can be some weird whitespace characters in there for some reason
    const callbackUrl = decodeURIComponent(window.location.href.toString())

    try {
      const loginData = getDataCookie()
      const rawResultData = await MastodonApi.requestBearerToken(
        loginData.server,
        loginData.code,
        loginData.client_id,
        loginData.client_secret,
        callbackUrl
      );
      const resultData = JSON.parse(rawResultData);

      appendDataCookie({ bearer_token: resultData.access_token });

      log.i("Login complete");
    } catch (error) {
      showSnacError("Error validating login. Please try again.");
      log.e("Error during login. Deleting partial login data.", error);
      deleteDataCookie();
    }
  } else {
    return Promise.resolve()
  }
}
