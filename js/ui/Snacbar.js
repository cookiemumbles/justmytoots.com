import { createSvgRef } from './HtmlBuilder.js';

var latestSnaccbarTimeout = null
var latestReshowTimeout = null

/**
 * @param {string} text
 */
export function showSnacSuccess(text) {
  showSnac(
    text, 
    createSvgRef(
      "svg_icon_success",
      { class:"snac_icon svg_icon", width:"24", height:"24" }
    )
  )
}

/**
 * @param {string} text
 */
export function showSnacError(text) {
  showSnac(
    text, 
    createSvgRef(
      "svg_icon_error",
      { class:"snac_icon svg_icon_line", width:"24", height:"24" }
    )
  )
}

/**
 * @param {string} text
 * @param {SVGSVGElement} svgElement
 */
function showSnac(text, svgElement) {
  stopReshowTimer()

  if (latestSnaccbarTimeout != null) {
    closeAndReopenSnacbarWithNewInfo(text, svgElement)
  } else {
    var snackbar = document.getElementById("snackbar");
    snackbar.classList.toggle("show");

    var snacIco = document.getElementById("snac_icon");
    snacIco.appendChild(svgElement)

    var snacAlert = document.getElementById("snac_alert");
    snacAlert.innerHTML = text

    // After 4 seconds, remove the show class from DIV
    latestSnaccbarTimeout = setTimeout(hideSnac, 4000);
  }
}

function stopReshowTimer() {
  if (latestReshowTimeout != null) {
    // if we got here either after forcing an existing one closed and opening a
    // new one after it has closed. Or when trying to open a new one while we're
    // still waiting for the hiding to be done, clear the reshow timer either way
    clearTimeout(latestReshowTimeout)
  }
}

/**
 * @param {string} text
 * @param {SVGSVGElement} svgElement
 */
function closeAndReopenSnacbarWithNewInfo(text, svgElement) {
    clearTimeout(latestSnaccbarTimeout)
    hideSnac()
    latestReshowTimeout = setTimeout(showSnac, 500, text, svgElement)
}

function hideSnac() {
  var snackbar = document.getElementById("snackbar");
  snackbar.classList.toggle("show"); 
  latestSnaccbarTimeout = null
}
