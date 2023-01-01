
/**
 * @param {string} listenerId
 * @param {string} classname
 * @param {EventListenerOrEventListenerObject} eventListener
 */
export function addUniqueClickListenerForEachOfClass(listenerId, classname, eventListener) {
    Array
        .from(document.getElementsByClassName(classname))
        .forEach(currentElement => {
            addUniqueEventListener(currentElement, listenerId, 'click', eventListener)
        })
}

/**
 * @param {string} id
 * @param {{(event: MouseEvent): void;(): void;(): void;(this: HTMLElement, ev: MouseEvent): any;}} eventListener
 * @param {string} listenerId
 */
export function addClickListenerForId(listenerId, id, eventListener) {
    addUniqueEventListener(document.getElementById(id), listenerId, 'click', eventListener)
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

/**
 * Adds an event listener, but does not re-add a listener with the same id
 * @param {Element} targetElement
 * @param {string} listenerId
 * @param {string} eventType
 * @param {EventListenerOrEventListenerObject} eventListener
 */
export function addUniqueEventListener(targetElement, listenerId, eventType, eventListener) {
    let listenerList = []
    if (targetElement.dataset.listeners) {
        listenerList = targetElement.dataset.listeners.split(" ")
    }
    if (!listenerList.includes(listenerId)) {
        targetElement.addEventListener('click', eventListener);
        listenerList.push(listenerId)
        targetElement.dataset.listeners = listenerList.join(" ")
    }
}

