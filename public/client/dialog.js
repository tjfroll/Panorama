window.backdrop = append(document.body, 
  new Div('#backdrop', {
    display: false,
    onclick: () => {
      dialog.hide()
    }
  })
)

class Dialog extends Div('.dialog') {
  created(props) {
    this.header = new Div('.header')
    this.body = new Div('.body')
    this.footer = new Div('.footer')

    append(this, [
      this.header,
      this.body,
      this.footer
    ])
  }

  show() {
    window.backdrop.style.display = ''
    this.style.display = ''
  }

  hide() {
    window.backdrop.style.display = 'none'
    this.style.display = 'none'
  }
}