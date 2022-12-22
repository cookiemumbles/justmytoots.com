
/**
 * @param {string} classname
 * @param {EventListenerOrEventListenerObject} eventListener
 */
export function replaceClickListenerForEachOfClass(classname, eventListener) {
  Array
    .from(document.getElementsByClassName(classname))
    .forEach(currentElement => {
      const clone = currentElement.cloneNode(true);
      clone.addEventListener('click', eventListener);
      currentElement.parentNode.replaceChild(clone, currentElement);
    })
}

/**
 * @param {string} id
 * @param {{ (event: MouseEvent): void; (): void; (): void; (this: HTMLElement, ev: MouseEvent): any; }} eventListener
 */
export function addClickListenerForId(id, eventListener) {
  document.getElementById(id).addEventListener('click', eventListener)
}

/**
 * @param {HTMLElement} hiddenElement
 */
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
