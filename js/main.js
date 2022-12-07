import JRequest from '/js/utils/JRequest.js';
import { copyToClipboard } from '/js/utils/System.js';
import TootHtmlBuilder from '/js/ui/TootHtmlBuilder.js';
import { wrapIn, createElement, createSvgRef } from '/js/ui/HtmlBuilder.js';
import { showSnacbar } from '/js/ui/Snacbar.js';

var accountInfo = null
var lastTootId = null

// NOTE:
// Disable pagespeed: url/?PageSpeed=off
// https://stackoverflow.com/a/49243560/3968618

function main() {
  const urlParams = new URLSearchParams(window.location.search);

  // TODO: implement
  // popup()

  if (urlParams.has('acct')) {
    var handle = urlParams.get('acct')
  } else if (window.location.pathname != "/") {
    var handle = window.location.pathname.slice(1)
  } else {
    displayMissingUserMessage()
    return
  }

  getAccountInfo(handle, function (resultAccountInfo) {
    accountInfo = resultAccountInfo

    document.getElementById('down_arrow').addEventListener('click', function() {
      loadPageContent(accountInfo, lastTootId)
    });

    loadPageContent(resultAccountInfo)
    // authorize(resultAccountInfo)

  })

}

function getAccountInfo(handle, userDataCallback) {
  const splitAccount = handle.split("@")
  const userData = {
    handle: handle,
    serverName: splitAccount[1],
    userName: splitAccount[0],
  }

  JRequest
        .get(`https://${userData.serverName}/api/v1/accounts/lookup?acct=${userData.handle}`)
        .then(function (result) {
          const resultUserData = JSON.parse(result)
          // console.log('%j', resultUserData)
          userData['id'] = resultUserData['id']
          userData['avatar'] = resultUserData['avatar']
          userData['display_name'] = resultUserData['display_name']
          userData['url'] = resultUserData['url']
          userDataCallback(userData)
        })
  return userData
}

function loadPageContent(accountInfo, lastId) {
  if (!isLoading()) {
    loaderOn()

    getUserToots(accountInfo, lastId, function (toots) {
      // console.log("toots:", toots)

      toots.forEach(toot => {
        document.getElementById('tweet_list')
          .appendChild( new TootHtmlBuilder().createTootDomItem(toot) );
      })
      if (toots.length > 0) {
        lastTootId = toots[toots.length - 1]['id']
      }

      loaderOff()
      addCopyListeners()
      window.addEventListener("scroll", checkInfiniteScroll);
    })
  }
}

function authorize(userData) {
  const args = [
    "response_type=code",
    // "redirect_uri=urn:ietf:wg:oauth:2.0:oob",
    // "redirect_uri=http%3A%2F%2Fstaging.justmytoots.com",

    "redirect_uri=http://staging.justmytoots.com",
    "scope=read+write+follow+push",
  ]

  JRequest
        .get(
          `https://techhub.social/oauth/authorize?${args.join("&")}`
          // `https://techhub.social/api/v1/apps/verify_credentials`
          )
        .then(function (result) {
          const resultUserData = JSON.parse(result)
          console.log('RESULT:', resultUserData)
        })
// https://mastodon.example/oauth/authorize
}

function addCopyListeners() {
  Array
    .from(document.getElementsByClassName("btn_action_copy"))
    .forEach(currentButton => {
      currentButton.addEventListener('click', event => {
        const prentDiv = event.target.closest('.single_tweet_wrap');
        // console.log("Clicked copy:" + prentDiv.dataset.tootUrl)
        copyToClipboard(prentDiv.dataset.tootUrl)

        showSnacbar("Copied toot url. Now paste it in your mastodon search.", "success")
      });
    })
  Array
    .from(document.getElementsByClassName("btn_action_boost"))
    .forEach(currentButton => {
      currentButton.addEventListener('click', event => {
        showSnacbar("Not (yet) supported. Copy link to toot instead.")
      });
    })
  Array
    .from(document.getElementsByClassName("btn_action_favorite"))
    .forEach(currentButton => {
      currentButton.addEventListener('click', event => {
        showSnacbar("Not (yet) supported. Copy link to toot instead.")
      });
    })
}

function getUserToots(userData, lastId, callback) {
  const args = [
    'exclude_reblogs=true',
    'limit=500',
  ]
  if (lastId) {
    args.push(`max_id=${lastId}`)
  }

  JRequest
    .get(`https://${userData.serverName}/api/v1/accounts/${userData.id}/statuses?${args.join("&")}`)
    .then(function (result) {
      const resultToots = JSON.parse(result)
      // console.log("resultToots:", resultToots)

      //TODO: maybe map with ID of last toot in case someone boosts a lot for infiniscroll
      callback(
        resultToots
        .filter(toot => !toot['reblog'] && !toot['in_reply_to_id'] && !toot['in_reply_to_account_id'])
      )
    })
}

function checkInfiniteScroll() {
  const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
 
  if (endOfPage) {
    loadPageContent(accountInfo, lastTootId)
  }
};

function isLoading() {
  return document.getElementById("down_arrow").style.display == 'none'
}

function loaderOff() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("down_arrow").style.display = "inline-block";
}

function loaderOn() {
  document.getElementById("loader").style.display = "block";
  document.getElementById("down_arrow").style.display = "none";
}

function popup() {
  // Get the modal
  var modal = document.getElementById("modal_container");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
          modal.style.display = "none";
    }
  } 
}

function displayMissingUserMessage() {
  document.getElementById("loader_wrapper").innerHTML = ''

  const container = document.getElementById("tweet_list")
  container.innerHTML = '';
  container.appendChild(
    wrapIn('li',
      { class: 'bordered single_tweet_li', tabindex: 1 },
      wrapIn('div', { class: "single_tweet_wrap" },
          wrapIn('div', {class:"tweet_text"},
            createElement("div", {}, 
              "<p>"
              + "Please provide a user identifier in the url. For example like this:</br>"
              + "<a href='https://justmytoots.com/cookie_mumbles@ohai.social'>https://justmytoots.com/cookie_mumbles@ohai.social</a>"
              + "</p>"
            )
          )
      )
    )

  );
}

document.addEventListener("DOMContentLoaded", function(){
  main();
});
