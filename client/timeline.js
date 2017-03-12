let articles = data.Articles
articles.sort(function(a,b){
  return new Date(a.Published) - new Date(b.Published);
})
articlesByHost = _.groupBy(_.sortBy(articles, 'Host'), 'Host')
articlesByDay = _.groupBy(articles, article => moment(article.Published).format('MMM D YYYY (ddd)'))

const makeTimeline = () => {
  const table = new Table()
  const thead = new THead()
  const thr = new TR()
  table.append(thead)
  thead.append(thr)
  const tbody = new TBody()
  table.append(tbody)
  const tr = new TR()
  const tfoot = new TFoot()
  table.append(tfoot)
  const tfr = new TR()
  tfoot.append(tfr)

  for (day in articlesByDay) {
    const dayArticles = articlesByDay[day]
    const width = (200 + (Math.min(dayArticles.length - 1, 5) * 50)) + 'px'
    thr.append(
      new TH({
        textContent: day,
        style: {
          'min-width': width
        }
      })
    )
    const td = new TD({
      style: {
        'min-width': width
      }
    })
    tfr.append(
      new TH({
        textContent: dayArticles.length + ' article(s)',
        style: {
          'min-width': width
          }
      })
    )
    tr.append(td)
    for (const article of dayArticles) {
      const articleTooltip = new Div([
        P([
          Strong('Site'),
          Span(article.Host)
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

      td.append(
        new P([
          Span('.time', {
            textContent: moment(article.Published).format('H:mm') + ': '
          }),
          A({
            textContent: article.Headline,
            href: article.Link,
            target: '_blank',
            style: {
              color: COLOR_MAP[article.Host]
            },
            onmouseenter: (event) => window.tooltip.show(articleTooltip, event),
            onmouseleave: (event) => window.tooltip.hide()
          })
        ])
      )
    }
    tbody.append(tr)
  }
  body.append(table)
}