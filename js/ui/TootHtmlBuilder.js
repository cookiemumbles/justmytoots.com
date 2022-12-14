import { wrapIn, createSvgRef, createElement } from './HtmlBuilder.js';

export default class TootHtmlBuilder {

  /**
     * @param {{
     *    id: string;
     *    url: string;
     *    created_at?: string;
     *    sensitive?: boolean;
     *    spoiler_text: string;
     *    localized_url?: string;
     *    account: { acct: string; }
     *    }} toot
     */
  createTootDomItem(toot) {
    return wrapIn('li',
      { class: 'bordered single_tweet_li', tabindex: 1 },
      wrapIn('div', {
        class: "single_tweet_wrap" ,
        'data-toot-user': toot["account"]["acct"],
        'data-toot-user-id': toot["account"]["id"],
        'data-toot-id': toot.id,
        'data-toot-url': toot.url,
      },
        [
          this.createAviDiv(toot["account"]["avatar"]),
          wrapIn('div', {class:"toot_content"}, [
            this.createTweetHeader(toot["account"]["display_name"], '@' + toot["account"]["username"], toot.created_at),
            this.createContentWarningDiv(toot.sensitive, toot.id, toot.spoiler_text),
            wrapIn('a', {'href': (toot.localized_url) ? toot.localized_url : toot.url }, [
              this.createTweetContent(toot.sensitive, toot.id, toot['content']),
            ]),
            this.createAttachmentsDiv(toot['media_attachments'], toot.id, toot.sensitive),
            this.createTootFooterDiv(toot['reblogs_count'], toot['favourites_count'], toot['favourited'], toot['reblogged']),
          ]),
        ]
      )
    )
  }

  /**
     * @param {string} aviUrl
     */
  createAviDiv(aviUrl) {
    return wrapIn('div', {class: "avi_container"},
      createElement('img', { class: "avi", src: aviUrl, width:'48px', height:'48px' })
    )
  }

  /**
     * @param {string} displayName
     * @param {string} handle
     * @param {string} createDate
     */
  createTweetHeader(displayName, handle, createDate) {
    return wrapIn('div', { class: "tweet_header"}, [
      wrapIn('div', { class: "toot_header_names"}, [
        createElement('div', { class: "toot_user_name" }, displayName),
        createElement('div', { class: "toot_screen_name" }, handle ),
      ]),
      createElement('div', { class: "toot_time" }, this.dateToString(createDate) ),
    ])
  }

  /**
     * @param {boolean} isSensitive
     * @param {string} tootId
     * @param {string} contentWarningText
     */
  createContentWarningDiv(isSensitive, tootId, contentWarningText) {
    return wrapIn('div', {class:"toot_content_warning_container"},
      (isSensitive) ? [
        createElement('div', { class: "content_warning", 'data-toot-id': tootId }, contentWarningText)
      ] : []
    )
  }

  /**
     * @param {boolean} isSensitive
     * @param {string} tootId
     * @param {string} text
     */
  createTweetContent(isSensitive, tootId, text) {
    return createElement(
      'div',
      { class: `hidden_${tootId}`, style: (isSensitive) ?  'visibility: hidden' : '' },
      text
    )
  }

  /**
     * @param {boolean} isSensitive
     * @param {string} tootId
     * @param {any[]} attatchments
     */
  createAttachmentsDiv(attatchments, tootId, isSensitive) {
    return wrapIn('div', {},
      attatchments.map(attatchment => {
        return createElement('img', {
          class: (isSensitive) ? `twit_pic hidden_${tootId} blur` : 'twit_pic',
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
  createTootFooterDiv(reblogsCount, favoritesCount, favorited, boosted) {
    return wrapIn('div', { class: "tweet_footer"}, [
      wrapIn('div', { class: "toot_footer_item"}, [
        createSvgRef(
          "svg_icon_retweet_active",
          { class:`toot_footer_btn svg_icon btn_action_boost ${(boosted) ? "active" : ""}`, width:"24", height:"24" }
        ),
        createElement('div', {class:"toot_footer_txt"}, reblogsCount),
      ]),
      wrapIn('div', { class: "toot_footer_item"}, [
        createSvgRef(
          "svg_icon_star",
          { class:`toot_footer_btn svg_icon btn_action_favorite ${(favorited) ? "active" : ""}`, width:"24", height:"24" }
        ),
        createElement('div', {class:"toot_footer_txt"}, favoritesCount),
      ]),
      wrapIn('div', { class: "toot_footer_item"},
        createSvgRef("svg_icon_copy", {
          class:"toot_footer_btn svg_icon enabled btn_action_copy",
          width:"24", height:"24"
        }),
      )
    ])
  }

  /** @param {string} date */
  dateToString(date) {
    let millis = Date.now() - Date.parse(date)
    let minutes = millis / 60000
    switch (true) {
      case minutes < 1:
        return "< 1m"
      case minutes < 60:
        return minutes.toFixed() + "m"
        break;
      case (minutes / 60 < 24):
        return (minutes / 60).toFixed() + "h"
      default:
        let month = new Date(date).toLocaleString('default', { month: 'short' });
        let day = new Date(date).getDate();
        return `${month} ${day}`
      break;
    }
  }

}


