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
        'data-toot-id':toot["id"],
        'data-toot-url':toot['url'],
      },
        [
          wrapIn('div', {},
            createElement('img', { class: "avi", src: toot["account"]["avatar"], width:'48px', height:'48px' })
          ),
          wrapIn('div', {class:"tweet_text"}, [
            wrapIn('div', { class: "tweet_header"}, [
              createElement('div', { class: "tweet_user_name" }, displayName),
              createElement('div', { class: "tweet_screen_name" }, '@' + acct ),
            ]),
            wrapIn('a', {href: toot['url']}, [
              createElement('div', {}, text),
            ]),
            wrapIn('div', {},
              toot['media_attachments'].map(attatchment => {
                return createElement('img', { class: "twit_pic", src: attatchment['preview_url']})
              })
            ),
            wrapIn('div', { class: "tweet_footer"},
              [
                createSvgRef("svg_icon_retweet_active",
                  {
                    class:"btn_bar_item svg_icon btn_action_boost",
                    width:"24", height:"24"
                  }
                ),
                createElement('div', {class:"btn_bar_item"}, toot['reblogs_count']),
                createSvgRef("svg_icon_star",
                  {
                    class:"btn_bar_item svg_icon btn_action_favorite",
                    width:"24", height:"24"
                  }
                ),
                createElement('div', {class:"btn_bar_item"}, toot['favourites_count']),
                createSvgRef("svg_icon_copy",
                  {
                    class:"btn_bar_item svg_button btn_action_copy",
                    width:"24", height:"24"
                  }
                ),
              ]
            ),
          ]),
        ]
      )
    )
  }



}


