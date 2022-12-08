import { wrapIn, createElement } from '/js/ui/HtmlBuilder.js';

export function displayMissingUserMessage(error) {
  console.debug("Displaying error:", error)
  renderError(
    `ERROR: ${error.message}`,
    `
      Please provide a user identifier in the url. For example like
      this:</br>
      <a href='https://justmytoots.com/@cookie_mumbles@ohai.social'>
        https://justmytoots.com/@cookie_mumbles@ohai.social
      </a>
    `
  )

}

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
