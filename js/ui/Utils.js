
export function addClickListenerForEachOfClass(classname, eventListener) {
  Array
    .from(document.getElementsByClassName(classname))
    .forEach(currentElement => {
      currentElement.addEventListener('click', eventListener);
    })
}

export function addClickListenerForId(id, eventListener) {
  document.getElementById(id).addEventListener('click', eventListener)
}

export function toggleHiddenElement(hiddenElement) {
  if (hiddenElement.nodeName == "IMG") {
    hiddenElement.classList.toggle("blur");
  } else {
    if (hiddenElement.style.visibility == 'hidden') {
      hiddenElement.style.visibility = 'visible'
    } else {
      hiddenElement.style.visibility = 'hidden'
    }
  }
}
