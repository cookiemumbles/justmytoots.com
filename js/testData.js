/**
 * @typedef {Object} AccountJson
 * @prop {string} id
 * @prop {string} username
 * @prop {string} acct
 * @prop {string} display_name
 * @prop {boolean} locked
 * @prop {boolean} bot
 * @prop {boolean} discoverable
 * @prop {boolean} group
 * @prop {string} created_at
 * @prop {string} note
 * @prop {string} url
 * @prop {string} avatar
 * @prop {string} avatar_static
 * @prop {string} header
 * @prop {string} header_static
 * @prop {number} followers_count
 * @prop {number} following_count
 * @prop {number} statuses_count
 * @prop {string} last_status_at
 * @prop {boolean} noindex
 * @prop {any[]} emojis
 * @prop {string} [role]
 * @prop {any[]} fields
 */


/**
 * @typedef {Object} TootJson
 * @prop {string} id
 * @prop {string} created_at
 * @prop {string} in_reply_to_id
 * @prop {string} in_reply_to_account_id
 * @prop {boolean} sensitive
 * @prop {string} spoiler_text
 * @prop {string} visibility
 * @prop {string} language
 * @prop {string} uri
 * @prop {string} url
 * @prop {number} replies_count
 * @prop {number} reblogs_count
 * @prop {number} favourites_count
 * @prop {string} edited_at
 * @prop {string} content
 * @prop {any} reblog
 * @prop {any} application
 * @prop {string} created_at
 * @prop {string} [localized_toot_url]
 * @prop {AccountJson} account
 * @prop {any[]} media_attachments
 * @prop {any[]} mentions
 * @prop {any[]} tags
 * @prop {any[]} emojis
 * @prop {any} card
 * @prop {any} poll
 */

/** @type {TootJson[]} */
export const test_toots = [
  {
    "id": "109744721228760114",
    "created_at": "2023-01-24T14:45:51.961Z",
    "in_reply_to_id": null,
    "in_reply_to_account_id": null,
    "sensitive": false,
    "spoiler_text": "",
    "visibility": "public",
    "language": "en",
    "uri": "https://techhub.social/users/cookie_mumbles/statuses/109744721228760114",
    "url": "https://techhub.social/@cookie_mumbles/109744721228760114",
    "replies_count": 0,
    "reblogs_count": 1,
    "favourites_count": 4,
    "edited_at": null,
    "content": "<p>:pacman: :verified: :verified: :ve:</p>",
    "reblog": null,
    "application": {
      "name": "Mastodon for iOS",
      "website": "https://app.joinmastodon.org/ios"
    },
    "account": {
      "id": "109349320508690443",
      "username": "georgetakei",
      "acct": "georgetakei",
      "display_name": "George Takei :verified: 🏳️‍🌈🖖🏽",
      "locked": false,
      "bot": false,
      "discoverable": true,
      "group": false,
      "created_at": "2022-11-15T00:00:00.000Z",
      "note": "<p>I boldly went to this new site. Follow for more recipes and tips.</p>",
      "url": "https://universeodon.com/@georgetakei",
      "avatar": "https://media.universeodon.com/accounts/avatars/109/349/320/508/690/443/original/45dcbcd5cc272b39.jpg",
      "avatar_static": "https://media.universeodon.com/accounts/avatars/109/349/320/508/690/443/original/45dcbcd5cc272b39.jpg",
      "header": "https://media.universeodon.com/accounts/headers/109/349/320/508/690/443/original/9ff8d8beeb27ab4f.jpg",
      "header_static": "https://media.universeodon.com/accounts/headers/109/349/320/508/690/443/original/9ff8d8beeb27ab4f.jpg",
      "followers_count": 340013,
      "following_count": 37,
      "statuses_count": 252,
      "last_status_at": "2023-01-25",
      "noindex": false,
      "emojis": [
        {
          "shortcode": "verified",
          "url": "https://media.universeodon.com/custom_emojis/images/000/013/373/original/07ac35aaad56e695.png",
          "static_url": "https://media.universeodon.com/custom_emojis/images/000/013/373/static/07ac35aaad56e695.png",
          "visible_in_picker": true
        }
      ],
      "fields": [
        {
          "name": "Instagram",
          "value": "<a href=\"https://www.instagram.com/georgehtakei/\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://www.</span><span class=\"\">instagram.com/georgehtakei/</span><span class=\"invisible\"></span></a>",
          "verified_at": null
        },
        {
          "name": "Twitter",
          "value": "<a href=\"https://twitter.com/GeorgeTakei\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">twitter.com/GeorgeTakei</span><span class=\"invisible\"></span></a>",
          "verified_at": null
        },
        {
          "name": "Facebook",
          "value": "<a href=\"https://www.facebook.com/georgehtakei/\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://www.</span><span class=\"\">facebook.com/georgehtakei/</span><span class=\"invisible\"></span></a>",
          "verified_at": null
        }
      ]
    },
    "media_attachments": [],
    "mentions": [],
    "tags": [],
    "emojis": [
      {
        "shortcode": "pacman",
        "url": "https://files.techhub.social/custom_emojis/images/000/019/501/original/d359884338e5c049.png",
        "static_url": "https://files.techhub.social/custom_emojis/images/000/019/501/static/d359884338e5c049.png",
        "visible_in_picker": true
      },
      {
        "shortcode": "verified",
        "url": "https://files.techhub.social/custom_emojis/images/000/012/019/original/f4c6710d459cb299.png",
        "static_url": "https://files.techhub.social/custom_emojis/images/000/012/019/static/f4c6710d459cb299.png",
        "visible_in_picker": true
      },
      {
        "shortcode": "ve",
        "url": "https://files.techhub.social/custom_emojis/images/000/012/037/original/213e9a277a2cb433.png",
        "static_url": "https://files.techhub.social/custom_emojis/images/000/012/037/static/213e9a277a2cb433.png",
        "visible_in_picker": true
      }
    ],
    "card": null,
    "poll": null
  }, {
    "id": "109472499431799134",
    "created_at": "2022-12-07T12:56:16.979Z",
    "in_reply_to_id": null,
    "in_reply_to_account_id": null,
    "sensitive": true,
    "spoiler_text": "Content Warning",
    "visibility": "public",
    "language": "en",
    "uri": "https://ohai.social/users/cookie_mumbles/statuses/109472499431799134",
    "url": "https://ohai.social/@cookie_mumbles/109472499431799134",
    "replies_count": 0,
    "reblogs_count": 1,
    "favourites_count": 3,
    "edited_at": null,
    "content": "<p>CONTENT</p><p>(told ya)</p>",
    "reblog": null,
    "application": null,
    "account": {
      "id": "109380999955395974",
      "username": "cookie_mumbles",
      "acct": "cookie_mumbles",
      "display_name": "Cookie Mumbles",
      "locked": false,
      "bot": false,
      "discoverable": false,
      "group": false,
      "created_at": "2022-11-21T00:00:00.000Z",
      "note": "<p>Friendly cis cookie on a quest to make you chuckle</p><p>My toots -&gt; <a href=\"https://justmytoots.com/cookie_mumbles@ohai.social\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"ellipsis\">justmytoots.com/cookie_mumbles</span><span class=\"invisible\">@ohai.social</span></a></p><p>best-of etc on twitter -&gt; <a href=\"https://linktr.ee/cookie_mumbles\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">linktr.ee/cookie_mumbles</span><span class=\"invisible\"></span></a></p><p><a href=\"https://ohai.social/tags/fedi22\" class=\"mention hashtag\" rel=\"tag\">#<span>fedi22</span></a><br /><a href=\"https://ohai.social/tags/jokes\" class=\"mention hashtag\" rel=\"tag\">#<span>jokes</span></a> <a href=\"https://ohai.social/tags/fun\" class=\"mention hashtag\" rel=\"tag\">#<span>fun</span></a> <a href=\"https://ohai.social/tags/nobot\" class=\"mention hashtag\" rel=\"tag\">#<span>nobot</span></a> <a href=\"https://ohai.social/tags/joke\" class=\"mention hashtag\" rel=\"tag\">#<span>joke</span></a> <a href=\"https://ohai.social/tags/humor\" class=\"mention hashtag\" rel=\"tag\">#<span>humor</span></a> <a href=\"https://ohai.social/tags/trending\" class=\"mention hashtag\" rel=\"tag\">#<span>trending</span></a> <a href=\"https://ohai.social/tags/funny\" class=\"mention hashtag\" rel=\"tag\">#<span>funny</span></a></p>",
      "url": "https://ohai.social/@cookie_mumbles",
      "avatar": "https://files.ohai.social/accounts/avatars/109/380/999/955/395/974/original/fcf1fa4565af0718.png",
      "avatar_static": "https://files.ohai.social/accounts/avatars/109/380/999/955/395/974/original/c814d08a32d2a639.png",
      "header": "https://files.ohai.social/accounts/headers/109/380/999/955/395/974/original/9c502235dd1c0795.jpeg",
      "header_static": "https://files.ohai.social/accounts/headers/109/380/999/955/395/974/original/9c502235dd1c0795.jpeg",
      "followers_count": 355,
      "following_count": 284,
      "statuses_count": 566,
      "last_status_at": "2022-12-07",
      "noindex": false,
      "emojis": [],
      "role": null,
      "fields": []
    },
    "media_attachments": [],
    "mentions": [],
    "tags": [],
    "emojis": [],
    "card": null,
    "poll": null
  }, {
    "id": "109683800922113496",
    "created_at": "2023-01-13T20:33:01.842Z",
    "in_reply_to_id": "109683797485314862",
    "in_reply_to_account_id": "109466064772943163",
    "sensitive": false,
    "spoiler_text": "",
    "visibility": "unlisted",
    "language": "en",
    "uri": "https://techhub.social/users/cookie_mumbles/statuses/109683800922113496",
    "url": "https://techhub.social/@cookie_mumbles/109683800922113496",
    "replies_count": 0,
    "reblogs_count": 0,
    "favourites_count": 0,
    "edited_at": null,
    "favourited": false,
    "reblogged": false,
    "muted": false,
    "bookmarked": false,
    "pinned": false,
    "content": "<p>Looks good. How about replies?</p>",
    "filtered": [],
    "reblog": null,
    "application": {
      "name": "Web",
      "website": null
    },
    "account": {
      "id": "109466064772943163",
      "username": "cookie_mumbles",
      "acct": "cookie_mumbles",
      "display_name": "Cookie Codes",
      "locked": false,
      "bot": false,
      "discoverable": true,
      "group": false,
      "created_at": "2022-12-06T00:00:00.000Z",
      "note": "<p>Software developer that makes jokes over at <span class=\"h-card\"><a href=\"https://ohai.social/@cookie_mumbles\" class=\"u-url mention\">@<span>cookie_mumbles</span></a></span> and jokes and chats about software and other stuff here.</p><p>  Creater of <a href=\"https://justmytoots.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">justmytoots.com</span><span class=\"invisible\"></span></a>   </p><p>Github: <a href=\"https://github.com/cookiemumbles\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">github.com/cookiemumbles</span><span class=\"invisible\"></span></a></p>",
      "url": "https://techhub.social/@cookie_mumbles",
      "avatar": "https://files.techhub.social/accounts/avatars/109/466/064/772/943/163/original/be9f6fc721dd03a8.png",
      "avatar_static": "https://files.techhub.social/accounts/avatars/109/466/064/772/943/163/original/be9f6fc721dd03a8.png",
      "header": "https://files.techhub.social/accounts/headers/109/466/064/772/943/163/original/a5372985ca1dd032.jpeg",
      "header_static": "https://files.techhub.social/accounts/headers/109/466/064/772/943/163/original/a5372985ca1dd032.jpeg",
      "followers_count": 26,
      "following_count": 71,
      "statuses_count": 125,
      "last_status_at": "2023-01-13",
      "noindex": false,
      "emojis": [],
      "fields": [
        {
          "name": "Main account",
          "value": "<a href=\"https://ohai.social/@cookie_mumbles\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">ohai.social/@cookie_mumbles</span><span class=\"invisible\"></span></a>",
          "verified_at": null
        },
        {
          "name": "My Toots",
          "value": "<a href=\"https://justmytoots.com/@cookie_mumbles@techhub.social\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"ellipsis\">justmytoots.com/@cookie_mumble</span><span class=\"invisible\">s@techhub.social</span></a>",
          "verified_at": null
        }
      ]
    },
    "media_attachments": [],
    "mentions": [],
    "tags": [],
    "emojis": [],
    "card": null,
    "poll": null,
    "localized_profile_url": "https://techhub.social/@cookie_mumbles@techhub.social",
    "localized_toot_url": "https://techhub.social/@cookie_mumbles@techhub.social/109683800922113496"
  },{
    "id": "109683797485314862",
    "created_at": "2023-01-13T20:32:09.405Z",
    "in_reply_to_id": null,
    "in_reply_to_account_id": null,
    "sensitive": false,
    "spoiler_text": "",
    "visibility": "unlisted",
    "language": "en",
    "uri": "https://techhub.social/users/cookie_mumbles/statuses/109683797485314862",
    "url": "https://techhub.social/@cookie_mumbles/109683797485314862",
    "replies_count": 1,
    "reblogs_count": 0,
    "favourites_count": 0,
    "edited_at": null,
    "favourited": false,
    "reblogged": false,
    "muted": false,
    "bookmarked": false,
    "pinned": false,
    "content": "<p>Let&#39;s see if we can filter out &#39;unlisted&#39; toots.</p>",
    "filtered": [],
    "reblog": null,
    "application": {
      "name": "Web",
      "website": null
    },
    "account": {
      "id": "109466064772943163",
      "username": "cookie_mumbles",
      "acct": "cookie_mumbles",
      "display_name": "Cookie Codes",
      "locked": false,
      "bot": false,
      "discoverable": true,
      "group": false,
      "created_at": "2022-12-06T00:00:00.000Z",
      "note": "",
      "url": "https://techhub.social/@cookie_mumbles",
      "avatar": "https://files.techhub.social/accounts/avatars/109/466/064/772/943/163/original/be9f6fc721dd03a8.png",
      "avatar_static": "https://files.techhub.social/accounts/avatars/109/466/064/772/943/163/original/be9f6fc721dd03a8.png",
      "header": "https://files.techhub.social/accounts/headers/109/466/064/772/943/163/original/a5372985ca1dd032.jpeg",
      "header_static": "https://files.techhub.social/accounts/headers/109/466/064/772/943/163/original/a5372985ca1dd032.jpeg",
      "followers_count": 26,
      "following_count": 71,
      "statuses_count": 125,
      "last_status_at": "2023-01-13",
      "noindex": false,
      "emojis": [],
      "fields": [
        {
          "name": "Main account",
          "value": "<a href=\"https://ohai.social/@cookie_mumbles\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">ohai.social/@cookie_mumbles</span><span class=\"invisible\"></span></a>",
          "verified_at": null
        },
        {
          "name": "My Toots",
          "value": "<a href=\"https://justmytoots.com/@cookie_mumbles@techhub.social\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"ellipsis\">justmytoots.com/@cookie_mumble</span><span class=\"invisible\">s@techhub.social</span></a>",
          "verified_at": null
        }
      ]
    },
    "media_attachments": [],
    "mentions": [],
    "tags": [],
    "emojis": [],
    "card": null,
    "poll": null,
    "localized_profile_url": "https://techhub.social/@cookie_mumbles@techhub.social",
    "localized_toot_url": "https://techhub.social/@cookie_mumbles@techhub.social/109683797485314862"
  },{
    "id": "109463245078881912",
    "created_at": "2022-12-05T21:42:46.756Z",
    "in_reply_to_id": null,
    "in_reply_to_account_id": null,
    "sensitive": false,
    "spoiler_text": "",
    "visibility": "public",
    "language": "en",
    "uri": "https://ohai.social/users/cookie_mumbles/statuses/109463245078881912",
    "url": "https://ohai.social/@cookie_mumbles/109463245078881912",
    "replies_count": 0,
    "reblogs_count": 2,
    "favourites_count": 2,
    "edited_at": null,
    "content": "<p>Shady figure: hey pssst! Wanna *opens coat revealing assortment of coke cans* Taste the Feeling?</p>",
    "reblog": null,
    "application": {
      "name": "Metatext",
      "website": "https://metabolist.org/metatext"
    },
    "account": {
      "id": "109380999955395974",
      "username": "cookie_mumbles",
      "acct": "cookie_mumbles",
      "display_name": "Cookie Mumbles",
      "locked": false,
      "bot": false,
      "discoverable": false,
      "group": false,
      "created_at": "2022-11-21T00:00:00.000Z",
      "note": "<p>Friendly cis cookie on a quest to make you chuckle</p><p>My toots -&gt; <a href=\"https://justmytoots.com/cookie_mumbles@ohai.social\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"ellipsis\">justmytoots.com/cookie_mumbles</span><span class=\"invisible\">@ohai.social</span></a></p><p>best-of etc on twitter -&gt; <a href=\"https://linktr.ee/cookie_mumbles\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">https://</span><span class=\"\">linktr.ee/cookie_mumbles</span><span class=\"invisible\"></span></a></p><p><a href=\"https://ohai.social/tags/fedi22\" class=\"mention hashtag\" rel=\"tag\">#<span>fedi22</span></a><br /><a href=\"https://ohai.social/tags/jokes\" class=\"mention hashtag\" rel=\"tag\">#<span>jokes</span></a> <a href=\"https://ohai.social/tags/fun\" class=\"mention hashtag\" rel=\"tag\">#<span>fun</span></a> <a href=\"https://ohai.social/tags/nobot\" class=\"mention hashtag\" rel=\"tag\">#<span>nobot</span></a> <a href=\"https://ohai.social/tags/joke\" class=\"mention hashtag\" rel=\"tag\">#<span>joke</span></a> <a href=\"https://ohai.social/tags/humor\" class=\"mention hashtag\" rel=\"tag\">#<span>humor</span></a> <a href=\"https://ohai.social/tags/trending\" class=\"mention hashtag\" rel=\"tag\">#<span>trending</span></a> <a href=\"https://ohai.social/tags/funny\" class=\"mention hashtag\" rel=\"tag\">#<span>funny</span></a></p>",
      "url": "https://ohai.social/@cookie_mumbles",
      "avatar": "https://files.ohai.social/accounts/avatars/109/380/999/955/395/974/original/fcf1fa4565af0718.png",
      "avatar_static": "https://files.ohai.social/accounts/avatars/109/380/999/955/395/974/original/c814d08a32d2a639.png",
      "header": "https://files.ohai.social/accounts/headers/109/380/999/955/395/974/original/9c502235dd1c0795.jpeg",
      "header_static": "https://files.ohai.social/accounts/headers/109/380/999/955/395/974/original/9c502235dd1c0795.jpeg",
      "followers_count": 355,
      "following_count": 284,
      "statuses_count": 566,
      "last_status_at": "2022-12-07",
      "noindex": false,
      "emojis": [],
      "role": null,
      "fields": []
    },
    "media_attachments": [],
    "mentions": [],
    "tags": [],
    "emojis": [],
    "card": null,
    "poll": null
  },
  {
    "id": "109447955769349950",
    "created_at": "2022-12-03T04:54:30.412Z",
    "in_reply_to_id": null,
    "in_reply_to_account_id": null,
    "sensitive": false,
    "spoiler_text": "",
    "visibility": "public",
    "language": "en",
    "uri": "https://beige.party/users/professorkiosk/statuses/109447955769349950",
    "url": "https://beige.party/@professorkiosk/109447955769349950",
    "replies_count": 0,
    "reblogs_count": 5,
    "favourites_count": 11,
    "edited_at": "2022-12-05T02:00:09.558Z",
    "content": "<p>me: tripping on acid is crazy</p><p>my therapist:</p>",
    "reblog": null,
    "application": {
      "name": "Mastodon for iOS",
      "website": "https://app.joinmastodon.org/ios"
    },
    "account": {
      "id": "109348062348732026",
      "username": "professorkiosk",
      "acct": "professorkiosk",
      "display_name": "Professor Kiosk :bc:",
      "locked": false,
      "bot": false,
      "discoverable": true,
      "group": false,
      "created_at": "2022-11-15T00:00:00.000Z",
      "note": "<p>🏳️‍🌈 He / Him 😋 Twitter refugee 💥 If you want my professional opinion, you’re crazy 👉 More random stuff: <a href=\"http://www.justmytoots.com/professorkiosk@beige.party\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"><span class=\"invisible\">http://www.</span><span class=\"ellipsis\">justmytoots.com/professorkiosk</span><span class=\"invisible\">@beige.party</span></a></p>",
      "url": "https://beige.party/@professorkiosk",
      "avatar": "https://files.ohai.social/cache/accounts/avatars/109/348/338/288/355/816/original/5f99304e9d0a1fe3.png",
      "avatar_static": "https://media.beige.party/accounts/avatars/109/348/062/348/732/026/original/d95af2bf43ad2337.png",
      "header": "https://media.beige.party/accounts/headers/109/348/062/348/732/026/original/7922b66ee77780b8.jpeg",
      "header_static": "https://media.beige.party/accounts/headers/109/348/062/348/732/026/original/7922b66ee77780b8.jpeg",
      "followers_count": 616,
      "following_count": 313,
      "statuses_count": 2300,
      "last_status_at": "2022-12-08",
      "noindex": false,
      "emojis": [
        {
          "shortcode": "bc",
          "url": "https://media.beige.party/custom_emojis/images/000/005/508/original/d624e50d6662217c.png",
          "static_url": "https://media.beige.party/custom_emojis/images/000/005/508/static/d624e50d6662217c.png",
          "visible_in_picker": false
        }
      ],
      "fields": []
    },
    "media_attachments": [
      {
        "id": "109447938633453606",
        "type": "image",
        "url": "https://media.beige.party/media_attachments/files/109/447/938/633/453/606/original/9faf3b6477cbf8b7.jpg",
        "preview_url": "https://media.beige.party/media_attachments/files/109/447/938/633/453/606/small/9faf3b6477cbf8b7.jpg",
        "remote_url": null,
        "preview_remote_url": null,
        "text_url": null,
        "meta": {
          "original": {
            "width": 1200,
            "height": 755,
            "size": "1200x755",
            "aspect": 1.5894039735099337
          },
          "small": {
            "width": 504,
            "height": 317,
            "size": "504x317",
            "aspect": 1.5899053627760253
          }
        },
        "description": "Picture of the white mare from Feherlofia, Son of the White Mare (1981), a psychedelic animated film. The white mare is frowning as the universe spreads out behind her. ",
        "blurhash": "UuFP]v%MDNV@I9M}RnV@xvn$kDoztRt7V@WE"
      }
    ],
    "mentions": [],
    "tags": [],
    "emojis": [],
    "card": null,
    "poll": null
  },
  {
    "id": "109453798767095045",
    "created_at": "2022-12-04T05:40:27.482Z",
    "in_reply_to_id": null,
    "in_reply_to_account_id": null,
    "sensitive": true,
    "spoiler_text": "Slightly lewd",
    "visibility": "public",
    "language": "en",
    "uri": "https://beige.party/users/theropologist/statuses/109453798767095045",
    "url": "https://beige.party/@theropologist/109453798767095045",
    "replies_count": 1,
    "reblogs_count": 6,
    "favourites_count": 9,
    "edited_at": null,
    "content": "<p>I was trying to come up with ideas for toots but I got a three-word erotic story instead</p>",
    "reblog": null,
    "application": {
      "name": "Tusky",
      "website": "https://tusky.app"
    },
    "account": {
      "id": "109299637985035781",
      "username": "theropologist",
      "acct": "theropologist",
      "display_name": "Velocirooster adminensis :bc:",
      "locked": false,
      "bot": false,
      "discoverable": true,
      "group": false,
      "created_at": "2022-11-07T00:00:00.000Z",
      "note": "<p>In the middle like a bird without a beak 🐓 Admin of this here instance 🦖 I have no idea what I&#39;m doing 🦣</p>",
      "url": "https://beige.party/@theropologist",
      "avatar": "https://media.beige.party/accounts/avatars/109/299/637/985/035/781/original/6548e1079520217f.jpg",
      "avatar_static": "https://media.beige.party/accounts/avatars/109/299/637/985/035/781/original/6548e1079520217f.jpg",
      "header": "https://media.beige.party/accounts/headers/109/299/637/985/035/781/original/aae601f9855a95e1.jpg",
      "header_static": "https://media.beige.party/accounts/headers/109/299/637/985/035/781/original/aae601f9855a95e1.jpg",
      "followers_count": 1012,
      "following_count": 1276,
      "statuses_count": 4059,
      "last_status_at": "2022-12-08",
      "noindex": false,
      "emojis": [
        {
          "shortcode": "bc",
          "url": "https://media.beige.party/custom_emojis/images/000/005/508/original/d624e50d6662217c.png",
          "static_url": "https://media.beige.party/custom_emojis/images/000/005/508/static/d624e50d6662217c.png",
          "visible_in_picker": false
        }
      ],
      "fields": [
        {
          "name": "Avi by",
          "value": "<a href=\"https://featherdust.com/\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">featherdust.com/</span><span class=\"invisible\"></span></a>",
          "verified_at": null
        },
        {
          "name": "Pronouns",
          "value": "he/him",
          "verified_at": null
        },
        {
          "name": "My Toots",
          "value": "<a href=\"https://justmytoots.com/theropologist@beige.party\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"ellipsis\">justmytoots.com/theropologist@</span><span class=\"invisible\">beige.party</span></a>",
          "verified_at": null
        },
        {
          "name": "Donations",
          "value": "<a href=\"https://ko-fi.com/drinky\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">ko-fi.com/drinky</span><span class=\"invisible\"></span></a>",
          "verified_at": null
        }
      ]
    },
    "media_attachments": [
      {
        "id": "109453787303087423",
        "type": "image",
        "url": "https://media.beige.party/media_attachments/files/109/453/787/303/087/423/original/b442a2ecb39dcb22.jpg",
        "preview_url": "https://media.beige.party/media_attachments/files/109/453/787/303/087/423/small/b442a2ecb39dcb22.jpg",
        "remote_url": null,
        "preview_remote_url": null,
        "text_url": null,
        "meta": {
          "original": {
            "width": 1063,
            "height": 1110,
            "size": "1063x1110",
            "aspect": 0.9576576576576576
          },
          "small": {
            "width": 391,
            "height": 408,
            "size": "391x408",
            "aspect": 0.9583333333333334
          }
        },
        "description": "Screenshot of a random word generator website. The three random words are crash, screw, and enjoy.",
        "blurhash": "U9Q,L201_3?bIU9ZIUs:%2xaR*Rk%L%2t7NH"
      }
    ],
    "mentions": [],
    "tags": [],
    "emojis": [],
    "card": null,
    "poll": null
  },
]


