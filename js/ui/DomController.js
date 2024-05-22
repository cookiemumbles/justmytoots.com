import { addUrlSearchParam, removeUrlSearchParam } from "../utils/Browser.js"
import LoggerImpl from "../utils/LoggerImpl.js"
import MastodonApi from "../utils/MastodonApi.js"
import { getLastTootId, getLoggedInUserData, getTargetUserData, setLastTootId } from "../utils/MemoryData.js"
import { copyToClipboard } from "../utils/System.js"
import { createElement } from "./HtmlBuilder.js"
import { showAboutModal, showImageModal, showLoginModal } from "./Modal.js"
import { showSnacError, showSnacSuccess } from "./Snacbar.js"
import { createTootDomItem } from "./TootHtmlBuilder.js"
import { addUniqueClickListenerForId, addUniqueClickListenerForEachOfClass, addUniqueListenerForEachOfClass, toggleHiddenElement } from "./Utils.js"
import { getForcedOptions, getValueForOption, Options } from "../utils/Options.js";
import CookieStore from "../utils/CookieStore.js"


/** @typedef { import("../testData.js").TootJson } TootJson */

/** 
 * @see https://docs.joinmastodon.org/entities/Status/#visibility
 * @enum {string}
 */
const Visibility = {
  PUBLIC : "public", // Visible to everyone, shown in public timelines.
  UNLISTED : "unlisted", // Visible to public, but not included in public timelines.
  PRIVATE : "private", // Visible to followers only, and to any mentioned users.
  DIRECT : "direct" // Visible only to mentioned users.
};

var log = new LoggerImpl()


export function addInitialListeners() {
  addUniqueClickListenerForId("loginEvent", "btn_login", (/** @type MouseEvent */ event) => {
    const target = /** @type HTMLButtonElement */ (event.target)
    if (target.textContent == "Logout") {
      const cookieStore = new CookieStore()
      cookieStore.reset()
      location.reload()
    } else {
      showLoginModal()
    }
  })

  addUniqueClickListenerForId("toggleOptionsEvent", "btn_options", (/** @type MouseEvent */ event) => {
    /** @type HTMLElement */
    const optionsContainer = document.getElementById("options_container")
    if (optionsContainer.classList.contains("show")) {
      optionsContainer.classList.remove("show")
    } else {
      optionsContainer.classList.add("show")
    }
  })

  addUniqueClickListenerForId("aboutEvent", "btn_about", () => {
    showAboutModal()
  })

  addUniqueClickListenerForId('applyOptions', 'btn_apply_options', () => {
    location.reload()
  })

  addUniqueListenerForEachOfClass('toggleOptionsCheck', 'options_checkbox', 'change', (event) => {
    const target = /** @type HTMLInputElement */ (event.target)
    let param = checkboxIdToParamName(target.id)
    if (target.checked) {
      addUrlSearchParam(param, "true")
    } else {
      removeUrlSearchParam(param)
    }
  })
}

export function updateOptionsStates() {
  Array
    .from(document.getElementsByClassName('options_checkbox'))
    .forEach((/** @type HTMLInputElement */ checkbox) => {
      const paramName = checkboxIdToParamName(checkbox.id)
      checkbox.checked = getValueForOption(paramName) == 'true'
      if (getForcedOptions()[paramName]) {
        checkbox.classList.add("forced")
        const label = checkbox.parentNode.querySelector(".switch_label")
        label.textContent = label.textContent + " (forced by user)"
      }
    })
}

export function displayLoggedInState() {
  const data = getLoggedInUserData()
  if (data) {
    document.getElementById("btn_login").textContent = "Logout"
    const aviImage = createElement('img', { class: "avi small_avi", alt: `Avi for ${data.username}`, src: data.avatar, width:'32px', height:'32px' })

    const headerDiv = document.getElementById("nav_left")
    const loginButton = headerDiv.firstChild
    headerDiv.insertBefore(aviImage, loginButton)
  }
}

/** @param {string} id */
function checkboxIdToParamName(id) {
  switch (id) {
    case 'checkbox_replies':
      return Options.REPLIES
    case 'checkbox_media':
      return Options.MEDIA_ONLY
    case 'checkbox_public':
      return Options.PUBLIC_ONLY
  }
}

/**
 * @param {import("../utils/MemoryData.js").UserData} targetUserData
 * @param {string} [lastId]
 */
export function loadPageContent(targetUserData, lastId) {
  if (!isLoading()) {
    loaderOn()

    return Promise
      .resolve(new CookieStore().getData())
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
        /** @type {TootJson[]} */
        const resultToots = JSON.parse(result)

        if (resultToots.length > 0) {
          setLastTootId(resultToots[resultToots.length - 1]['id'])
        }

        loadToots(resultToots)
      })
  }
}

/** @param {TootJson[]} toots */
export function loadToots(toots) {
  log.d("Loading toots:", toots)

  const cookieStore = new CookieStore()
  let loginData = cookieStore.getData()
  toots
    .filter(toot =>  !toot['reblog'] )
    .filter(toot => toot['visibility'] != Visibility.DIRECT)
    .filter(toot => 
      getValueForOption(Options.REPLIES) == 'true'
      || (!toot['in_reply_to_id'] && !toot['in_reply_to_account_id'])
    )
    .filter(toot => 
      getValueForOption(Options.PUBLIC_ONLY) != 'true'
      || toot['visibility'] == Visibility.PUBLIC 
    )
    .filter(toot => 
      getValueForOption(Options.MEDIA_ONLY) != 'true'
      || toot['media_attachments'].length > 0
    )
    .forEach((toot) => {
    if (isLoggedIn()) {

      // https://ohai.social/@cookie_mumbles/109512725350000401
      // https://techhub.social/@cookie_mumbles@ohai.social/109512725627345234
      // https://${server}/@${handle}/${toot.id}
      toot['localized_profile_url'] = `https://${loginData.server}/${getTargetUserData().handle}`
      toot['localized_toot_url'] = `https://${loginData.server}/${getTargetUserData().handle}/${toot.id}`
    }
    document.getElementById('tweet_list')
      .appendChild(createTootDomItem(toot));
  })

  loaderOff()
  addPostLoadListeners()
  window.addEventListener("scroll", checkInfiniteScroll);
}


function addPostLoadListeners() {
  addUniqueClickListenerForId("loadMoreEvent", 'down_arrow', function() {
    loadPageContent(getTargetUserData(), getLastTootId())
  })


  addUniqueClickListenerForEachOfClass("copyEvent", "btn_action_copy", (/** @type MouseEvent */ event) => {
    const target = /** @type HTMLButtonElement */ (event.target)
    const prentDiv = /** @type HTMLElement */ (target.closest('.single_tweet_wrap'))
    log.d("Clicked copy:" + prentDiv.dataset.tootUrl)
    copyToClipboard(prentDiv.dataset.tootUrl)

    showSnacSuccess("Copied toot url. Now paste it in your mastodon search.")
  })

  if (isLoggedIn()) {
    Array.from(document.getElementsByClassName('toot_footer_btn'))
      .forEach((/** @type HTMLElement */ element) => {
        element.classList.add("enabled")
      })
  }

  addUniqueClickListenerForEachOfClass("boostClickEvent", "btn_action_boost", (/** @type MouseEvent */ event) => {
    if (isLoggedIn()) {
      const target = /** @type HTMLButtonElement */ (event.target)
      const prentDiv = /** @type HTMLElement */ (target.closest('.single_tweet_wrap'))
      const btn = target.closest('.toot_footer_btn')
      const cookieStore = new CookieStore()
      const loginData = cookieStore.getData()

      const txtCount = /** @type HTMLElement */ (prentDiv.querySelector('.text_boost_count'))
      if (!btn.classList.contains('active')) {
        MastodonApi
          .boost(
            loginData.server,
            loginData.bearer_token,
            prentDiv.dataset.tootId
          )
          .then(_ => {
            txtCount.textContent = (parseInt(txtCount.textContent) + 1).toString()
            console.log("Successfully boosted.")
          })
        btn.classList.add("active")
        btn['title'] = "Unboost"
      } else {
        MastodonApi
          .unboost(
            loginData.server,
            loginData.bearer_token,
            prentDiv.dataset.tootId
          )
          .then(_ => {
            txtCount.textContent = (parseInt(txtCount.textContent) - 1).toString()
            console.log("Successfully unboosted.")
          })
        btn.classList.remove("active")
        btn['title'] = "Boost"
      }
    } else {
      showSnacError("Please log in or just copy the link.")
    }
  })


  addUniqueClickListenerForEachOfClass("favoriteClickEvent", "btn_action_favorite", (/** @type MouseEvent */ event) => {
    if (isLoggedIn()) {
      const target = /** @type HTMLButtonElement */ (event.target)
      const prentDiv = /** @type HTMLElement */ (target.closest('.single_tweet_wrap'))
      const btn = /** @type HTMLButtonElement */ (target.closest('.toot_footer_btn'))
      const txtCount = /** @type HTMLElement */ (prentDiv.querySelector('.text_favorite_count'))

      const cookieStore = new CookieStore()
      const loginData = cookieStore.getData()
      if (!btn.classList.contains('active')) {
        MastodonApi
          .favorite(
            loginData.server,
            loginData.bearer_token,
            prentDiv.dataset.tootId
          )
          .then(_ => {
            txtCount.textContent = (parseInt(txtCount.textContent) + 1).toString()
            console.log("Successfully faved.")
          })
        btn.classList.add("active")
        btn.title = "Unfavorite"
      } else {
        MastodonApi
          .unfavorite(
            loginData.server,
            loginData.bearer_token,
            prentDiv.dataset.tootId
          )
          .then(_ => {
            txtCount.textContent = (parseInt(txtCount.textContent) - 1).toString()
            console.log("Successfully unfaved.")
          })
        btn.classList.remove("active")
        btn.title = "Favorite"
      }
    } else {
      showSnacError("Please log in or just copy the link.")
    }
  })


  addUniqueClickListenerForEachOfClass("contentWarningClickEvent", "content_warning", (/** @type MouseEvent */ event) => {
    const target = /** @type HTMLButtonElement */ (event.target)
    Array
      .from(document.getElementsByClassName(`hidden_${target.dataset.tootId}`))
      .forEach(hiddenElement => {
        toggleHiddenElement(/** @type HTMLButtonElement */ (hiddenElement))
      })
  })

  addUniqueClickListenerForEachOfClass("tootPicClickEvent", "toot_pic", (/** @type MouseEvent */ event) => {
    const img = /** @type HTMLImageElement  */ (event.target)
    showImageModal(img.src)
  })
}

export function checkInfiniteScroll() {
  const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

  if (endOfPage) {
    loadPageContent(getTargetUserData(), getLastTootId())
  }
};


export function isLoading() {
  return document.getElementById("down_arrow").style.display == 'none'
}

export function isLoggedIn() {
  const cookieStore = new CookieStore()
  const currentCookieData = cookieStore.getData()
  return 'bearer_token' in currentCookieData
}

export function loaderOn() {
  document.getElementById("loader").style.display = "block";
  document.getElementById("down_arrow").style.display = "none";
}


export function loaderOff() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("down_arrow").style.display = "inline-block";
}

