let INPUT_FIELDS = [
  'datetime',
  'text',
  'url'
]

class ArticleForm extends Div('.form') {
  created(props) {
    const data = new Variable(ARTICLE_TEMPLATE)
    props.data = data
    const htmlParser = new Textarea('.field.parser', {
      placeholder: 'HTML',
      onblur: e => parseValues(e.target.value, data)
    })
    this.append(htmlParser)
    const fields = {}
    for (const field in ARTICLE_FIELDS) {
      const { required, type } = ARTICLE_FIELDS[field]
      const target = data.property(field)
      if (INPUT_FIELDS.indexOf(type) > -1) {
        this.append(
          new Div('.field-group', [
            new Div('.label', {
              textContent: field
            }),
            new Input('.field', {
              type: type,
              placeholder: 'enter ' + _.startCase(field).toLowerCase(),
              content: target,
              onblur: e => data.set(field, e.target.value)
            })
          ])
        )
      } else if (type === 'dropdown' || 'multiselect') {
        const onblur = type === 'multiselect' ?
          e => {
            for (const value of e.target.value.split(',')) {
              data.push(field, value.trim())
            }
          } : e => data.set(field, e.target.value)
        const input = new Input('.field', {
          type: 'text',
          placeholder: 'add new ' + field.toLowerCase(),
          content: target,
          onblur: onblur
        })
        const dropdown = new Div('.field.dropdown')
        const row = new Div('.field-group', [
          new Div('.label', {
            textContent: field
          }),
          input,
          dropdown
        ])
        const dropdown$ = $(dropdown)
        dropdown$.selectivity({
          allowClear: true,
          items: ITEMS[field].valueOf(),
          multiple: type === 'multiselect',
          placeholder: 'select existing',
        })
        dropdown$.on('change', e => data.set(field, e.value))
        this.append(row)
      }
    }
  }
}

class Submit extends Button('.submit') {
  created(props) {
    const { form } = props
    props.display = form.data.to( data => isValid(data)),
    props.textContent = 'Submit',
    props.onclick = e => $.post('https://panorama-2fb31.firebaseio.com/Articles.json', { data: form.data.valueOf() })
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