import { wrapIn, createElement } from './HtmlBuilder.js';

/** @param {Error} error */
export function displayOfflineMessage() {
  renderError(
    `Temporarily offline for privicy conserns`,
    `
      <p>
      It has come to my attention that people are freaking out about this page
      because 1) it looks like a scraper, 2) google indexes the page if it
      finds a link somewhere outside of mastodon and 3) it allows you to look
      at someone's toots from a central place outside of mastodon WITHOUT
      GIVING CONSENT.
      </p>
      <ol>
        <li>
          Arguably least important but let's get out of the way: this is not
          a scraper. The user directly requests information, connecting from the
          users broser directly to the mastodon servers that host the toots.
          Nothing ever touchs the server. See the source code <a
          href='https://github.com/cookiemumbles/justmytoots.com'>on Github</a>
          for more details on how it works.
        </li>
        <li>
          Uptill now this page has not prevented indexing and <b>it should never
          allow that!</b> I'll fix this by telling google to not index the page
          asap.
        </li>
        <li>
          This was always meant as a tool to showcase your work if you want it
          to, never for anyone to to have a peek at other people's toots. I
          will add a check to only show toots from people that explicitly put
          the link (to their own toots) into their profile.
        </li>
      </ol>
      <p>
        I'm listening to the conserns and will fix them before taking the page
        online again.
        </p>
        <p>
        If you have any questions or more conserns than I've
        outlined here, post <a
        href='https://github.com/cookiemumbles/justmytoots.com/issues'>an issue
        on Github</a> or toot at me on mastodon here: <a
        href='https://techhub.social/@cookie_mumbles'>@cookie_mumbles</a>.
      </p>
    `
  )

}

/** @param {Error} error */
export function displayMissingUserMessage(error) {
  console.debug("Displaying error:", error)
  renderError(
    `ERROR: ${error.message}`,
    `
      Please provide a user identifier in the url. For example like
      this:</br>
      <a href='https://justmytoots.com/@cookie_mumbles@ohai.social'>
        https://justmytoots.com/@cookie_mumbles@ohai.social
      </a></br>
      See help for more info.
    `
  )

}

/** @param {Error} error */
export function displayServerError(error) {
  console.debug("Displaying error:", error)
  renderError(
    `ERROR: ${error.message}`,
    `
      This might mean the server is currently unavailable, or the
      identifier you've entered is not correct. Check if url with the
      user is correct (see example below) or try again later.
      </br>
      <a href='https://justmytoots.com/@cookie_mumbles@ohai.social'>
        https://justmytoots.com/@cookie_mumbles@ohai.social
      </a>
    `
  )
}

/**
 * @param {string} title
 * @param {string} messageHtml
 */
function renderError(title, messageHtml) {
  document.getElementById("loader_wrapper").innerHTML = ''

  const container = document.getElementById("tweet_list")
  container.innerHTML = '';
  container.appendChild(
    wrapIn('li',
      { class: 'bordered single_tweet_li', tabindex: 1 },
      wrapIn('div', { class: "single_tweet_wrap" },
          wrapIn('div', {class:"tweet_text"},
            createElement("div", {}, 
              `
              <p>
                <h3>${title}</h3>
                ${messageHtml}
              </p>
              `
            )
          )
      )
    )
  );
}
