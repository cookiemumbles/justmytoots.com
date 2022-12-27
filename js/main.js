import { copyToClipboard } from './utils/System.js';
import TootHtmlBuilder from './ui/TootHtmlBuilder.js';
import { showSnacError, showSnacSuccess } from './ui/Snacbar.js';
import { test_toots } from './testData.js';
import { displayServerError, displayMissingUserMessage } from './ui/ErrorScreen.js';
import Logger from './utils/Logger.js';
import { showHelpModal, showImageModal, showLoginModal } from './ui/Modal.js';
import { setDataCookie, getDataCookie, appendDataCookie, deleteDataCookie } from './utils/Cookie.js';
import MastodonApi from './utils/MastodonApi.js';
import { replaceClickListenerForEachOfClass, addClickListenerForId, toggleHiddenElement } from './ui/Utils.js';
import { clearCodeTokenFromUrl, getUserDataFromUrl } from './utils/Browser.js';

var g_targetUserData = null
var g_lastTootId = null

var log = new Logger()

// NOTE:
// Disable pagespeed: url/?PageSpeed=off
// https://stackoverflow.com/a/49243560/3968618
// https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html

function main() {
  const urlParams = new URLSearchParams(window.location.search);

  addInitialListeners()
  try {
    g_targetUserData = getUserDataFromUrl()
  } catch (e) {
    displayMissingUserMessage(e)
    return
  }

  if (urlParams.has('testdata')) {
    loadToots(test_toots)
    return
  }

  handleLoginPartTwoOrContinue()
    .then(() => {
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
    })
    .then(() => {
      const loginData = getDataCookie();
      if ('bearer_token' in loginData) {
        const loginData = getDataCookie();
        return MastodonApi
          .getAccountInfo(loginData.server, g_targetUserData.handle, loginData.bearer_token)
      } else {
        return MastodonApi
          .getAccountInfo(g_targetUserData.server, g_targetUserData.handle)
      }
    })
    .then((/** @type {object} */ result) => {
        const resultUserData = JSON.parse(result);
        log.t('resultUserData:', resultUserData);
        // merge the values we need into our data
        g_targetUserData['id'] = resultUserData['id'];
        g_targetUserData['avatar'] = resultUserData['avatar'];
        g_targetUserData['display_name'] = resultUserData['display_name'];
        g_targetUserData['url'] = resultUserData['url'];
        log.d("Enriched target user data:", g_targetUserData);

        loadPageContent(g_targetUserData);
    })
    .catch((/** @type {Error} */ error) => {
      displayServerError(error)
    })
}




/**
 * @param {{ id: string; server: string; }} targetUserData
 * @param {string} [lastId]
 */
function loadPageContent(targetUserData, lastId) {
  if (!isLoading()) {
    loaderOn()

    Promise
      .resolve(getDataCookie())
      .then(loginData => {
        if ('bearer_token' in loginData) {
          return MastodonApi
            .requestStatusses(loginData.server, targetUserData.id, lastId, loginData.bearer_token)
        } else {
          return MastodonApi
            .requestStatusses(targetUserData.server, targetUserData.id, lastId)
        }
      })
      .then(function(result) {
        const resultToots = JSON.parse(result)
        log.t("All toots returned:", resultToots)

        if (resultToots.length > 0) {
          g_lastTootId = resultToots[resultToots.length - 1]['id']
        }

        return resultToots
          .filter((/** @type {{ [x: string]: any; }} */ toot) =>
            !toot['reblog'] && !toot['in_reply_to_id'] && !toot['in_reply_to_account_id'])
      })
      .then(toots => {
        loadToots(toots)
      })
  }
}

/**
 * @param {[{
 *    id: string;
 *    url: string;
 *    created_at?: string;
 *    sensitive?: boolean;
 *    spoiler_text: string;
 *    localized_toot_url?: string;
 *    account: { acct: string; }
 *    }]} toots
 */
function loadToots(toots) {
  log.d("Loading toots:", toots)

  let loginData = getDataCookie()
  toots.forEach((toot) => {
    if (isLoggedIn()) {

      // https://ohai.social/@cookie_mumbles/109512725350000401
      // https://techhub.social/@cookie_mumbles@ohai.social/109512725627345234
      // https://${server}/@${handle}/${toot.id}
      toot['localized_profile_url'] = `https://${loginData.server}/${g_targetUserData.handle}`
      toot['localized_toot_url'] = `https://${loginData.server}/${g_targetUserData.handle}/${toot.id}`
    }
    document.getElementById('tweet_list')
      .appendChild(new TootHtmlBuilder().createTootDomItem(toot));
  })

  loaderOff()
  addPostLoadListeners()
  window.addEventListener("scroll", checkInfiniteScroll);
}


function addInitialListeners() {
  addClickListenerForId("btn_login", (/** @type MouseEvent */ event) => {
    if (event.target.textContent == "Logout") {
      deleteDataCookie()
      document.getElementById("btn_login").textContent = "Login"
    } else {
      openLoginModal()
    }
  })

  addClickListenerForId("btn_help", () => {
    showHelpModal()
  })
}


function addPostLoadListeners() {
  addClickListenerForId('down_arrow', function() {
    loadPageContent(g_targetUserData, g_lastTootId)
  })


  replaceClickListenerForEachOfClass("btn_action_copy", (/** @type MouseEvent */ event) => {
    const prentDiv = event.target.closest('.single_tweet_wrap');
    log.d("Clicked copy:" + prentDiv.dataset.tootUrl)
    copyToClipboard(prentDiv.dataset.tootUrl)

    showSnacSuccess("Copied toot url. Now paste it in your mastodon search.")
  })

  if (isLoggedIn()) {
    Array.from(document.getElementsByClassName('toot_footer_btn'))
      .forEach(element => {
        if (element.classList.contains("svg_icon")) {
          element.classList.add("enabled")
        }
      })
  }

  replaceClickListenerForEachOfClass("btn_action_boost", (/** @type MouseEvent */ event) => {
    if (isLoggedIn()) {
      const prentDiv = event.target.closest('.single_tweet_wrap');
      const btn = event.target.closest('.toot_footer_btn')
      const loginData = getDataCookie()
      if (!btn.classList.contains('active')) {
        MastodonApi.boost(
          loginData.server,
          loginData.bearer_token,
          prentDiv.dataset.tootId
        )
          .then(_ => {
            console.log("Successfully boosted.")
          })
        btn.classList.add("active")
      } else {
        MastodonApi.unboost(
          loginData.server,
          loginData.bearer_token,
          prentDiv.dataset.tootId
        )
          .then(_ => {
            console.log("Successfully unboosted.")
          })
        btn.classList.remove("active")
      }
    } else {
      showSnacError("Please log in or just copy the link.")
    }
  })


  replaceClickListenerForEachOfClass("btn_action_favorite", (/** @type MouseEvent */ event) => {
    if (isLoggedIn()) {
      const prentDiv = event.target.closest('.single_tweet_wrap');
      const btn = event.target.closest('.toot_footer_btn')

      const loginData = getDataCookie()
      if (!btn.classList.contains('active')) {
        MastodonApi.favorite(
          loginData.server,
          loginData.bearer_token,
          prentDiv.dataset.tootId
        )
          .then(_ => {
            console.log("Successfully faved.")
          })
        btn.classList.add("active")
      } else {
        MastodonApi.unfavorite(
          loginData.server,
          loginData.bearer_token,
          prentDiv.dataset.tootId
        )
          .then(_ => {
            console.log("Successfully unfaved.")
          })
        btn.classList.remove("active")
      }
    } else {
      showSnacError("Please log in or just copy the link.")
    }
  })


  replaceClickListenerForEachOfClass("content_warning", (/** @type MouseEvent */ event) => {
    Array
      .from(document.getElementsByClassName(`hidden_${event.target.dataset.tootId}`))
      .forEach(hiddenElement => {
        toggleHiddenElement(hiddenElement)
      })
  })

  replaceClickListenerForEachOfClass("twit_pic", (/** @type MouseEvent */ event) => {
    /** @type HTMLImageElement  */
    const img = event.target
    showImageModal(img.src)
  })
}


function checkInfiniteScroll() {
  const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

  if (endOfPage) {
    loadPageContent(g_targetUserData, g_lastTootId)
  }
};

function isLoading() {
  return document.getElementById("down_arrow").style.display == 'none'
}

function loaderOff() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("down_arrow").style.display = "inline-block";
}

function loaderOn() {
  document.getElementById("loader").style.display = "block";
  document.getElementById("down_arrow").style.display = "none";
}

function openLoginModal() {

  showLoginModal()

  document.getElementById("login_form_submit").onsubmit = function() {
    /** @type {HTMLInputElement} */
    // @ts-ignore
    const inputElement = document.getElementById("input_server")
    const value = inputElement.value.trim().toLowerCase()
    performLogin(value)
    return false // prevent default behavior
  }
}

/**
 * @param {string} server
 */
function performLogin(server) {
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


async function handleLoginPartTwoOrContinue() {
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

function isLoggedIn() {
  const currentCookieData = getDataCookie()
  return 'bearer_token' in currentCookieData
}


document.addEventListener("DOMContentLoaded", function() {
  main();
});
