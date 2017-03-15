class ArticleForm extends Div('.form') {
  created(props) {
    const data = new Variable(ARTICLE_TEMPLATE)
    this.isComplete = new Variable(false)
    data.to( data => this.isComplete.put(isValid(data)) )
    for (const field in ARTICLE_FIELDS) {
      const { required, type } = ARTICLE_FIELDS[field]
      if (INPUT_FIELDS.indexOf(type) > -1) {
        const target = data.property(field)
        this.append(
          new Input('.field', {
            type: type,
            placeholder: field,
            content: target,
            oninput: e => target.put(e.value)
          })
        )
      } else if (type === 'dropdown' || 'multiselect') {
        const input = new Div('.field')
        const input$ = $(input)
        input$.selectivity({
          allowClear: true,
          items: ITEMS[field].valueOf(),
          multiple: type === 'multiselect',
          placeholder: field,
        })
        input$.on('change', e => data.property[field].put(e.value))
        this.append(input)
      }
    }
  }
}

const isValid = (data) => {
  console.log(data)
  if (!data) return false
  const { Url, Site, Headline, Updated, Published } = data
  if (!Url || !Headline || !Site || !Published) return false
  if (!Url.startsWith('http') || Url.indexOf('://') === -1)
    return false
  if (Updated && !moment(Updated).isValid())
    return false
  if (!moment(Published).isValid())
    return false
  return true
}