const makeCard = (article) => {
  const cardTooltip = new Div([
    P([
      Strong('Site'),
      Span(article.Host)
    ]),
    P([
      Strong('Headline'),
      Span(article.Headline)
    ]),
    article.Publisher ? P([
      Strong('Publisher'),
      Span(article.Publisher)
    ]) : undefined,
    article.Authors ? P([
      Strong('Authors'),
      Span(article.Authors.join(', '))
    ]) : undefined,
    article.Contributors ? P([
      Strong('Contributors'),
      Span(article.Contributors.join(', '))
    ]) : undefined
  ])

  return new A('.card', {
    href: article.Link,
    target: '_blank',
    style: {
      'background-color': COLOR_MAP[article.Publisher || article.Host],
      'box-shadow': article.Highlight ? '#f8c616 0px 0px 7px 1px' : ''
    },
    onmouseenter: (event) => window.tooltip.show(cardTooltip, event),
    onmouseleave: (event) => window.tooltip.hide()
  }, [
    Div('.headline', {
      textContent: article.Headline,
      display: not(isCompact)
    }),
    Div('.footer', [
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