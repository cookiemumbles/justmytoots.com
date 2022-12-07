import { createElement, createSvgRef } from '/js/ui/HtmlBuilder.js';

export function showSnacbar(text, type) {
  if (type == 'success') {
    showSnac(
      text, 
      createSvgRef(
        "svg_icon_success",
        { class:"snac_icon svg_icon", width:"24", height:"24" }
      )
    )
  } else {
    showSnac(
      text, 
      createSvgRef(
        "svg_icon_error",
        { class:"snac_icon svg_icon_line", width:"24", height:"24" }
      )
    )
  }
}

function showSnac(text, svgElement) {
  var snackbar = document.getElementById("snackbar");

  snackbar.classList.toggle("show");
  snackbar.innerHTML = ""
  snackbar.appendChild(svgElement)

  snackbar.appendChild(
    createElement('div', { class:'tweet_header'}, text),
  )

  // After 4 seconds, remove the show class from DIV
  setTimeout(
    function(){ snackbar.classList.toggle("show"); },
    4000
  );
}
