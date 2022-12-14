
/**
 * Creates a single wrapped element of the specified type
 * @param {string} type
 * @param {{ class?: string; id?: string; }} attributes
 * @param {string} [innerHTML]
 */
export function createElement(type, attributes, innerHTML) {
  const element = document.createElement(type);
  if (attributes) {
    for (let key in attributes) {
      element.setAttribute(key, attributes[key])
    }
  }
  if (innerHTML) {
    element.innerHTML = innerHTML
  }
  return element
}

/**
 * Creates an element, and adds the provided element as children
 * @param {string} type
 * @param {{ class?: string; tabindex?: number; id?: string; href?: string }} attributes
 * @param {any[] | HTMLElement} childOrChildren
 */
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

/**
 * Creates an ul containing an li around each provided listItem
 * Attributes are only for the 'ul' wrapper.
 *
 * @param {{ class?: string; tabindex?: number; id?: string; }} attributes
 * @param {any[] | HTMLElement} listItems
 */
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

/**
 * Creates an <a ></a> with the provided content and attributes. href defaults to doing nothing.
 * @param {string} content
 * @param {{ class?: string; id?: string; }} attributes
 */
export function createLink(content, attributes) {
  const a = createElement('a', attributes, content)
  if (a.getAttribute("href") == null) {
    a.setAttribute("href", "javascript:void(0)")
  }
  return a
}

/**
 * Creates a svg that only references an svg defined before
 * @param {string} refId id of the svg, as defined at the beginning of the html file
 * @param {{ [x: string]: any; class?: string; width?: string; height?: string; }} attributes
 */
export function createSvgRef(refId, attributes) {
  // create element as explicit svg
  var element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  if (!attributes) { throw new Error("attributes required for svg type"); }

  for (let key in attributes) {
    element.setAttribute(key, attributes[key])
  }
  // use setAttributeNS because otherwise the capitalisation breaks the svgs
  element.setAttributeNS(null, "viewBox", `0 0 ${attributes["width"]} ${attributes["height"]}`)
  element.innerHTML = `<use href='#${refId}'/>`
  return element
}
