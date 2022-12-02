import JRequest from '/js/utils/JRequest.js';
import TootHtmlBuilder from '/js/ui/TootHtmlBuilder.js';

var accountInfo = null
var lastTootId = null


function main() {
  const urlParams = new URLSearchParams(window.location.search);

  // TODO: implement
  // popup()

  var handle = "cookie_mumbles@ohai.social"
  if (urlParams.has('acct')) {
    var handle = urlParams.get('acct')
  }

  getAccountInfo(handle, function (resultAccountInfo) {
    accountInfo = resultAccountInfo

    document.getElementById('down_arrow').addEventListener('click', function() {
      loadPageContent(accountInfo, lastTootId)
    });

    loadPageContent(resultAccountInfo)
    window.addEventListener("scroll", checkInfiniteScroll);
  })

}

function loadPageContent(accountInfo, lastId) {
  if (!isLoading()) {
    loaderOn()

    getUserToots(accountInfo, lastId, function (toots) {
      console.log("toots:", toots)

      toots.forEach(toot => {
        document.getElementById('tweet_list')
          .appendChild( new TootHtmlBuilder().createTootDomItem(toot) );
      })
      if (toots.length > 0) {
        lastTootId = toots[toots.length - 1]['id']
      }

      loaderOff()
    })
  }

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

document.addEventListener("DOMContentLoaded", function(){
  main();
});
