import { performLogin } from '../login.js';
import { wrapIn, createElement } from './HtmlBuilder.js';

export function showModal() {
  let modal = document.getElementById("modal_background");
  modal.style.display = "block";
  addHideListeners()
}

export function addHideListeners() {
  let span = document.getElementById("model_close");

  span.onclick = function () {
    hideModal()
  }

  document.addEventListener('touchstart', hideIfBackground); // for mobile
  window.onclick = hideIfBackground
}

/** @param {MouseEvent} event */
function hideIfBackground(event) {
    if (event.target == document.getElementById("modal_background")) {
      hideModal()
    }
}

export function hideModal() {
  const modal = document.getElementById("modal_background");
  modal.style.display = "none";

  const parentContainer = document.getElementById("modal_container");
  parentContainer.classList.remove("image")
}


export function showLoginModal() {
  showModal()
  let container = document.getElementById("modal_content");
  container.innerHTML = ""
  container.appendChild(createElement('h1', {}, "Login to your server"))
  container.appendChild(createElement('p', {}, "Login to favorite and boost directly on the page."))
  container.appendChild(createElement('p', {}, `
    Don't worry, your login data is <b>only saved locally</b> and uses <b>a
    cookie</b> to save it on your device. The permissions are:`))
  container.appendChild(createElement('ul', {}, `
      <li><code>read:statuses</code> - to read the useres toots</li>
      <li><code>write:favourites</code> - favorite</li>
      <li><code>write:statuses</code> - boost</li>
      <li><code>read:accounts</code> - verify the credentials and show the current logged-in user</li>
    `))
  container.appendChild(createElement('p', {}, `You are welcome to look into the <b>
    <a href='https://github.com/cookiemumbles/justmytoots.com/blob/main/js/utils/MastodonApi.js#L183'>sourcecode on github</a>
    </b> to see for yourself.
    `))

  container.appendChild(
    wrapIn('form', { id: "login_form_submit" }, [
      createElement('input', { id: "input_server", type: "text"} ),
      createElement('button', {id: "btn_action_login"}, "submit")
    ])
  )


  document.getElementById("login_form_submit").onsubmit = function() {
    /** @type {HTMLInputElement} */
    // @ts-ignore
    const inputElement = document.getElementById("input_server")
    const value = inputElement.value.trim().toLowerCase()
    performLogin(value)
    return false // prevent default behavior
  }
}

export function showAboutModal() {
  showModal()
  let container = document.getElementById("modal_content");
  container.innerHTML = ""
  container.appendChild(createElement('h1', {}, "About"))
  container.appendChild(createElement('p', {}, `
    This little page displays the toots but not the boosts for a user. It helps
    people that want to showcase their toots, for example when doing jokes,
    drawings, photos or any other form of content people might want to look
    back through. You can login to this page (data only saved locally) so you
    can interact with the toots if you'd like.
    `))

  container.appendChild(createElement('p', {}, `
    To create your own, simply add the user identifier in the url. For example
    like this:</br>
        <b>https://justmytoots.com/@<em>user</em>@<em>example.social</em></b>
    `))


  container.appendChild(createElement('p', {}, `
    <h4>Created by</h4>
    <a href='https://techhub.social/@cookie_mumbles'>@cookie_mumbles</a>
    <h4>Code and Issues</h4>
    <a href='https://github.com/cookiemumbles/justmytoots.com'>justmytoots.com@github.com</a>
    `))
}

/** @param {string} src */
export function showImageModal(src) {
  const parentContainer = document.getElementById("modal_container");
  parentContainer.classList.add("image")
  const container = document.getElementById("modal_content");
  container.innerHTML = ""
  container.appendChild( createElement('img', {
    src: src
  }))
  showModal()
}
