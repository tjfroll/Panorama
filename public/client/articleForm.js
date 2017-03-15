class ArticleForm extends Div('.form') {
  created(props) {
    const data = new Variable(ARTICLE_TEMPLATE)
    this.isComplete = data.to( data => isValid(data) )
    for (const field in ARTICLE_FIELDS) {
      const { required, type } = ARTICLE_FIELDS[field]
      if (INPUT_FIELDS.indexOf(type) > -1) {
        this.append(
          new Input('.field', {
            type: type,
            placeholder: field,
            content: data.property[field]
          })
        )
      } else if (type === 'dropdown' || 'multiselect') {
        const input = new Div('.field')
        $(input).selectivity({
          allowClear: true,
          items: ITEMS[field].valueOf(),
          multiple: type === 'multiselect',
          placeholder: field,
        })
        this.append(input)
      }
    }
  }
}

const isValid = (data) => {
  if (!data) return false
  const { Url, Site, Updated, Published } = data
  if (!Url || !Site || !Published) return false
  if (!Url.startsWith('http') || Url.indexOf('://') === -1)
    return false
  if (Updated && !moment(Updated).isValid())
    return false
  if (!moment(Published).isValid())
    return false
  return true
}