const parseValues = (html, target) => {
  let values = extractValues(html)
  if (!values.length) return
  valuesByField = _.groupBy(values, 'field')
  for (const field in valuesByField) {
    valuesByField[field] = _.sortBy(valuesByField[field], 'priority')
    if (['Authors', 'Keywords'].indexOf(field) > -1) {
      for (const value of valuesByField[field][0].value) {
        if (target.get(field).indexOf(value) === -1)
          target.property(field).push(value)
      }
    } else {
      target.set(field, valuesByField[field][0].value)
    }
  }
}

const extractValues = (html) => {
  if (html.indexOf('<head') === -1) return false
  if (html.indexOf('</head>') === -1) return false
  if (html.indexOf('<body') === -1) return false
  if (html.indexOf('</body>') === -1) return false
  metas = html.split('<meta')
  let values = []
  for (metaString of metas) {
    let parsed = parseMetadata(metaString)
    if (parsed.field && parsed.value) {
      values.push(parsed)
    } else {
      // console.log('UNKNOWN', parsed)
    }
  }
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
  return values
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

const getMetaType = (strings) => {
  let label = _.find(strings, prop => prop.endsWith('itemprop'))
  if (!label) label = _.find(strings, prop => prop.endsWith('name'))
  if (!label) label = _.find(strings, prop => prop.endsWith('property'))
  if (!label) return ''
  let value = strings[strings.indexOf(label) + 1]
  return trimValue(value)
}

const getMetaValue = (strings) => {
  let label = _.find(strings, prop => prop.endsWith('content'))
  if (!label) return ''
  let value = strings[strings.indexOf(label) + 1]
  return trimValue(value)
}

const trimValue = (value) => {
  let split1 = value.split('">')[0]
  let split2 = value.split('"/>')[0]
  let split3 = value.split('" ')[0]
  if (split1.length < split2.length && split1.length < split3.length)
    return split1
  if (split2.length < split3.length)
    return split2
  return split3
}