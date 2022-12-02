
/** Creates a single wrapped element of the specified type */
export function createElement(type, attributes, innerHTML) {
  const element = document.createElement(type);
  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value)
    }
  }
  if (innerHTML) {
    element.innerHTML = innerHTML
  }
  return element
}

/** Creates an element, and adds the provided element as children */
export function wrapIn(type, attributes, childOrChildren) {
  const element = createElement(type, attributes)
  if (Array.isArray(childOrChildren)) {
    childOrChildren.forEach(child =>
      element.appendChild(child)
    )
  } else {
    element.appendChild(childOrChildren);
  }
  return element
}

/** Creates an ul containing an li around each provided listItem
 * Attributes are only for the 'ul' wrapper. */
export function wrapInList(attributes, listItems) {
  const items = []
  if (Array.isArray(listItems)) {
    listItems.forEach(child =>
      items.push(wrapIn('li', {}, child))
    )
  } else {
    items.push(wrapIn('li', {}, listItems))
  }
  return wrapIn('ul', attributes, items)
}

/** Creates an <a ></a> with the provided content and attributes. href defaults to doing nothing.  */
export function createLink(content, attributes) {
  const a = createElement('a', attributes, content)
  if (a.getAttribute("href") == null) {
    a.setAttribute("href", "javascript:void(0)")
  }
  return a
}

/** Creates a svg that only references an svg defined before */
export function createSvgRef(refId, attributes) {
  // create element as explicit svg
  var element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  if (!attributes) { throw new Error("attributes required for svg type"); }
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value)
  }
  // use setAttributeNS because otherwise the capitalisation breaks the svgs
  element.setAttributeNS(null, "viewBox", `0 0 ${attributes["width"]} ${attributes["height"]}`)
  element.innerHTML = `<use href='#${refId}'/>`
  return element
}
