class Card extends A('.card') {
  created(props) {
    const { article } = props
    props.href = article.Link
    props.target = '_blank'
    props.style = {
      'background-color': COLOR_MAP[article.Publisher || article.Host],
      'box-shadow': article.Highlight ? '#f8c616 0px 0px 7px 1px' : ''
    }
    props.onmouseenter = (event) => window.tooltip.show(cardTooltip, event)
    props.onmouseleave = (event) => window.tooltip.hide()
    const cardTooltip = new CardTooltip({ article })
    append(this, [
      new Div('.headline', {
        textContent: article.Headline,
        display: not(isCompact)
      }),
      new Div('.footer', [
        Span('.time', {
          textContent: moment(article.Published).format('H:mm'),
          display: not(isCompact)
        }),
        Span('.acronym', {
          textContent: ACRONYM_MAP[article.Host] || ACRONYM_MAP[article.Publisher]
        })
      ])
    ])
  }
}

class CardTooltip extends Div {
  created(props) {
    const { article } = props
    this.append(
      new P([
        Strong('Site'),
        Span(article.Host)
      ])
    )
    this.append(
      new P([
        Strong('Headline'),
        Span(article.Headline)
      ])
    )
    if (article.Published) {
      this.append(
        new P([
          Strong('Publisher'),
          Span(article.Publisher)
        ])
      )
    }
    if (article.Authors) {
      this.append(
         new P([
          Strong('Authors'),
          Span(article.Authors.join(', '))
        ])
      )
    }
    if (article.Contributors) {
      this.append(
        new P([
          Strong('Contributors'),
          Span(article.Contributors.join(', '))
        ])
      )
    }
  }
}