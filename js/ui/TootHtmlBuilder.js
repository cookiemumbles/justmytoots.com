import { wrapIn, createSvgRef, createElement } from '/js/ui/HtmlBuilder.js';

export default class TootHtmlBuilder {

  createTootDomItem(toot) {

    const text = toot['content']
    const acct = toot["account"]["acct"]
    const acctId = toot["account"]["id"]
    const displayName = toot["account"]["display_name"]

    return wrapIn('li',
      { class: 'bordered single_tweet_li', tabindex: 1 },
      wrapIn('div', {
        class: "single_tweet_wrap" ,
        'data-toot-user': acct,
        'data-toot-user-id': acctId,
        'data-toot-id': toot.id,
        'data-toot-url': toot.url,
      },
        [
          wrapIn('div', {class: "avi_container"},
            createElement('img', { class: "avi", src: toot["account"]["avatar"], width:'48px', height:'48px' })
          ),
          wrapIn('div', {class:"toot_content"}, [
            wrapIn('div', { class: "tweet_header"}, [
              wrapIn('div', { class: "toot_header_names"}, [
                createElement('div', { class: "toot_user_name" }, displayName),
                createElement('div', { class: "toot_screen_name" }, '@' + acct ),
              ]),
              createElement('div', { class: "toot_time" }, this.dateToString(toot.created_at) ),
            ]),
            wrapIn('div', {class:"toot_content_warning_container"},
              (toot.sensitive) ? [
                createElement('div', { class: "content_warning", 'data-toot-id': toot.id }, toot.spoiler_text)
              ] : []
            ),
            wrapIn('a', {href: toot['url']}, [
              createElement('div', {
                class: `hidden_${toot.id}`,
                style: (toot.sensitive) ?  'visibility: hidden' : ''
              }, text),
            ]),
            wrapIn('div', {},
              toot['media_attachments'].map(attatchment => {
                return createElement('img', {
                  class: (toot.sensitive) ? `twit_pic hidden_${toot.id} blur` : 'twit_pic',
                  src: attatchment['preview_url']
                })
              })
            ),
            wrapIn('div', { class: "tweet_footer"},
              [
                wrapIn('div', { class: "toot_footer_item"}, [
                  createSvgRef(
                    "svg_icon_retweet_active",
                    { class:"toot_footer_btn svg_icon btn_action_boost", width:"24", height:"24" }
                  ),
                  createElement( 'div', {class:"toot_footer_txt"}, toot['reblogs_count']),
                ]),
                wrapIn('div', { class: "toot_footer_item"}, [
                  createSvgRef(
                  "svg_icon_star",
                    { class:"toot_footer_btn svg_icon btn_action_boost", width:"24", height:"24" }
                  ),
                  createElement('div', {class:"toot_footer_txt"}, toot['favourites_count']),
                ]),
                wrapIn('div', { class: "toot_footer_item"},
                  createSvgRef("svg_icon_copy",
                    {
                      class:"toot_footer_btn svg_button btn_action_copy",
                      width:"24", height:"24"
                    }
                  ),
                )
              ]
            ),
          ]),
        ]
      )
    )
  }


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


