const append = (target, elements) => {
  if (target == null || elements == null)
    return
  if (_.isArray(elements)) {
    for (const element of elements) {
      target.append(element)
    }
  } else {
    target.append(elements)
  }
  return elements
}

const empty = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}