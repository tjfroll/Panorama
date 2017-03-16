const parseValues = (html, target) => {
  let values = extractValues(html)
  if (!values.length) return
  valuesByField = _.groupBy(values, 'field')
  for (const field in valuesByField) {
    valuesByField[field] = _.sortBy(valuesByField[field], 'priority')

    // these can be split across multiple values, so bring them together
    if (['Authors', 'Keywords'].indexOf(field) > -1) {
      const currentValue = target.get(field)
      for (const { value } of valuesByField[field]) {
        let cleanValue = value.trim()
        // sometimes these are just facebook or twitter urls
        if (cleanValue.includes('/')) continue
        if (currentValue.indexOf(cleanValue) === -1)
          currentValue.push(cleanValue)
      }
      target.set(field, currentValue)
    } else {
      target.set(field, valuesByField[field][0].value)
    }
  }
}

const extractValues = (html) => {
  // just some basic validation
  if (!html.includes('<head')) return false
  if (!html.includes('</head>')) return false
  if (!html.includes('<body')) return false
  if (!html.includes('</body>')) return false

  // first, find the <meta> tags
  metas = html.split('<meta')
  let values = []
  for (metaString of metas) {
    let parsed = parseMetadata(metaString)
    if (parsed.field && parsed.value) {
      values.push(parsed)
    } else {
      console.log('UNKNOWN', parsed)
    }
  }

  // for now, this is just to find the article link
  links = html.split('<link')
  for (linkString of links) {
    let parsed = getSiteUrl(linkString)
    if (parsed) {
      values.push({
        value: parsed,
        field: 'Url',
        priority: 1
      })
    }
  }
  return _.uniqBy(values, 'value')
}

const getSiteUrl = (str) => {
  const canonical = str.split('rel="canonical" ')[1]
  if (canonical) {
    const href = canonical.split('href="')[1]
    if (href) {
      return trimValue(href)
    }
  }
}

const parseMetadata = (str) => {
  const props = str.split('="')
  let type = getMetaType(props)
  let field = META_FIELD_MAP[type]
  return {
    type: type,
    value: getMetaValue(props),
    field: field && field.field,
    priority: field && field.priority
  }
}

// Three possible meta tag identifiers to check for
const getMetaType = (strings) => {
  let label = _.find(strings, prop => prop.endsWith('itemprop'))
  if (!label) label = _.find(strings, prop => prop.endsWith('name'))
  if (!label) label = _.find(strings, prop => prop.endsWith('property'))
  if (!label) return ''
  let value = strings[strings.indexOf(label) + 1]
  return trimValue(value)
}

// The actual value of the tag
const getMetaValue = (strings) => {
  let label = _.find(strings, prop => prop.endsWith('content'))
  if (!label) return ''
  let value = strings[strings.indexOf(label) + 1]
  return trimValue(value)
}

// Account for all possible locations of the identifier and value
const trimValue = (value) => {
  let split1 = value.split('">')[0].trim()
  let split2 = value.split('"/>')[0].trim()
  let split3 = value.split('" ')[0].trim()
  if (split1.length < split2.length && split1.length < split3.length)
    return split1
  if (split2.length < split3.length)
    return split2
  return split3
}