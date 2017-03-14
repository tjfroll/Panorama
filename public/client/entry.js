window.backdrop = append(body, new Div('#backdrop'))

const makeEntryButton = () => {
  const dialog = new Dialog()
  return new Button('.entry', {
    onclick: (event) => {

    }
  })
}

const fields = {
  Link: {
    required: true,
    type: 'url'
  },
  Site: {
    required: true,
    type: 'dropdown'
  },
  Source: {
    required: false,
    type: 'url'
  },
  Syndication: {
    required: false,
    type: 'dropdown'
  },
  Headline: {
    required: true,
    type: 'text'
  },
  Description: {
    required: false,
    type: 'text'
  },
  Keywords: {
    required: false,
    type: 'multiselect'
  },
  Authors: {
    required: false,
    type: 'multiselect'
  },
  Contributors: {
    required: false,
    type: 'multiselect'
  },
  Published: {
    required: true,
    type: 'date'
  },
  Updated: {
    required: false,
    type: 'date'
  }
}

class EntryDialog extends Dialog('.form') {
  ready() {
    for (const field in fields) {
      const { required, type } = fields[field]
    }
  }
}

class Dialog extends Div('.dialog') {
  created(props) {
    this.header = new Div('.header')
    this.body = new Div('.body')
    this.footer = new Div('.body')

    append(this, [
      this.header,
      this.body,
      this.footer
    ])
  }
}