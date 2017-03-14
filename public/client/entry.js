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
  }
  Host: {
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