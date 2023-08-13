import { ErrorResponse } from '../utils/JRequest.js';
import { wrapIn, createElement } from './HtmlBuilder.js';

/** @param {NoConsentError} error */
export function displayNoConsentError(error) {
  console.debug("Displaying error:", error)
  renderError(
    `ERROR: ${error.message}`,
    `
      JustMyToots only supports opt-in for this service. If you want this page
      to display your toots, you simply put your justmytoots.com url either
      into your mastodon bio or into the profile metadata. Your url will look
      something like this:</br>
      <b>https://justmytoots.com/@<em>user</em>@<em>example.social</em></b>
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

/** @param {ErrorResponse} error */
export function displayUnauthorizedErrorResponse(error) {
  console.debug("Displaying error:", error)
  renderError(
    `Authorization required`,
    `
      <p>
        This user appears to be on a server that requires authorization to view
        things. You can simply use the button at the top to login.
      </p>
      <p>
        And don't worry, your data is only stored on your device. See the about
        page for a link to the sourcecode if you like to check for yourself.
      </p>
    `
  )
}

/** @param {ErrorResponse} error */
export function displayGeneralErrorResponse(error) {
  console.debug("Displaying error:", error)
  renderError(
    `ERROR: [${error.httpCode}] ${error.statusText}`,
    `
      <p>
        <b>Requested:</b></br>
        ${error.requestUrl}
      </p>
      <p>
        <b>Response:</b></br>
        ${error.response}
      </p>
      This might mean the server is currently unavailable, or the
      identifier you've entered is not correct. Check if url with the
      user is correct (see example below) or try again later.
      </br>
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
          wrapIn('div', {class:"toot_content"},
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


export class NoConsentError extends Error {
  /** @type import('./DomController.js').UserData */
  // userData = null
  /** @param {import('./DomController.js').UserData} userData */
  constructor(userData) {
    super(`No consent for ${userData.handle}`);
    this.userData = userData
    this.name = "NoConsentError";
  }
}
