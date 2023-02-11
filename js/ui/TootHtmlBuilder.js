import { wrapIn, createSvgRef, createElement } from './HtmlBuilder.js';

/** @param {import('../testData.js').TootJson} toot */
export function createTootDomItem(toot) {
  // @ts-ignore
  const hasContentWarning = (/** @type boolean */ (toot.spoiler_text))
  return wrapIn('li',
    { class: 'bordered single_tweet_li' },
    wrapIn('div', {
      class: "single_tweet_wrap" ,
      'data-toot-user': toot["account"]["acct"],
      'data-toot-user-id': toot["account"]["id"],
      'data-toot-id': toot.id,
      'data-toot-url': toot.url,
    },
      [
        createAviDiv(toot["account"]["display_name"], toot["account"]["avatar"], (toot.localized_profile_url) ? toot.localized_profile_url : toot.account.url),
        wrapIn('div', {class:"toot_content"}, [
          createTweetHeader(
            emojify(toot["account"]["display_name"],
              toot.account.emojis), '@' + toot["account"]["username"],
            toot.created_at
          ),
          createContentWarningDiv(hasContentWarning, toot.id, toot.spoiler_text),
          wrapIn('a', { class: 'no_hover', 'href': (toot.localized_toot_url) ? toot.localized_toot_url : toot.url }, [
            createTweetContent(hasContentWarning, toot.id, emojify(toot['content'], toot.emojis)),
          ]),
          createAttachmentsDiv(toot['media_attachments'], toot.id, hasContentWarning),
          createTootFooterDiv(toot['reblogs_count'], toot['favourites_count'], toot['favourited'], toot['reblogged']),
        ]),
      ]
    )
  )
}

/**
 * @param {string} accountName
 * @param {string} imageUrl
 * @param {string} profileUrl
 */
function createAviDiv(accountName, imageUrl, profileUrl) {
  return wrapIn('a', {href: profileUrl, class: "avi_container"},
    createElement('img', { class: "avi", alt: "Avatar for " + accountName, src: imageUrl, width:'48px', height:'48px' })
  )
}

/**
 * @param {string} displayName
 * @param {string} handle
 * @param {string} createDate
 */
function createTweetHeader(displayName, handle, createDate) {
  return wrapIn('div', { class: "tweet_header"}, [
    wrapIn('div', { class: "toot_header_names"}, [
      createElement('div', { class: "toot_user_name" }, displayName),
      createElement('div', { class: "toot_screen_name" }, handle ),
    ]),
    createElement('div', { class: "toot_time" }, dateToString(createDate) ),
  ])
}

/**
 * @param {boolean} hasContentWarning
 * @param {string} tootId
 * @param {string} contentWarningText
 */
function createContentWarningDiv(hasContentWarning, tootId, contentWarningText) {
  return wrapIn('div', {class:"toot_content_warning_container"},
    (hasContentWarning) ? [
      createElement('div', { class: "content_warning", 'data-toot-id': tootId }, contentWarningText)
    ] : []
  )
}

/**
 * @param {boolean} hasContentWarning
 * @param {string} tootId
 * @param {string} text
 */
function createTweetContent(hasContentWarning, tootId, text) {
  return createElement(
    'div',
    { class: `toot_text hidden_${tootId}`, style: (hasContentWarning) ?  'visibility: hidden' : '' },
    text
  )
}

/**
 * @param {boolean} hasContentWarning
 * @param {string} tootId
 * @param {any[]} attatchments
 */
function createAttachmentsDiv(attatchments, tootId, hasContentWarning) {
  return wrapIn('div', {},
    attatchments.map(attatchment => {
      return createElement('img', {
        class: (hasContentWarning) ? `toot_pic hidden_${tootId} blur` : 'toot_pic',
        alt: attatchment.description,
        src: attatchment['preview_url']
      })
    })
  )
}

/**
 * @param {number} reblogsCount
 * @param {number} favoritesCount
 * @param {boolean} favorited
 * @param {boolean} boosted
 */
function createTootFooterDiv(reblogsCount, favoritesCount, favorited, boosted) {
  return wrapIn('div', { class: "tweet_footer"}, [
    wrapIn('div', { class: "toot_footer_item"}, [
      wrapIn('button', {
        title: (!boosted) ? "Boost" : "Unboost",
        class: `toot_footer_btn btn_action_boost ${(boosted) ? "active" : ""}`
      }, 
        createSvgRef("svg_icon_boost", { class:`svg_icon`, width:"24", height:"24" }),
      ),
      createElement('div', { class:"toot_footer_txt text_boost_count"}, reblogsCount.toString()),
    ]),
    wrapIn('div', { class: "toot_footer_item"}, [
      wrapIn('button', {
        title: (!favorited) ? "Favorite" : "Unfavorite",
        class: `toot_footer_btn btn_action_favorite ${(favorited) ? "active" : ""}`
      }, 
        createSvgRef( "svg_icon_fave", { class:`svg_icon`, width:"24", height:"24" }),
      ),
      createElement('div', {class:"toot_footer_txt text_favorite_count"}, favoritesCount.toString()),
    ]),
    wrapIn('div', { class: "toot_footer_item"},
      wrapIn('button', { title:"Copy link", class: "toot_footer_btn btn_action_copy enabled" }, 
        createSvgRef("svg_icon_copy", { class:"svg_icon", width:"24", height:"24" }),
      )
    )
  ])
}

/** @param {string} date */
function dateToString(date) {
  let millis = Date.now() - Date.parse(date)
  let minutes = millis / 60000
  switch (true) {
    case minutes < 1:
      return "< 1m"
    case minutes < 60:
      return minutes.toFixed() + "m"
    case (minutes / 60 < 24):
      return (minutes / 60).toFixed() + "h"
    default:
      let month = new Date(date).toLocaleString('default', { month: 'short' });
      let day = new Date(date).getDate();
      return `${month} ${day}`
  }
}

/** 
 * @param {string} text
 * @param {any[]} emojis
 */
function emojify(text, emojis) {
  emojis.forEach(emojiMapping => {
    text = text.replaceAll(
      `:${emojiMapping.shortcode}:`,
      createElement('img', { alt: emojiMapping.shortcode, src: emojiMapping.url, width:'16px', height:'16px' })
      .outerHTML
    )
  })
  return text
}


