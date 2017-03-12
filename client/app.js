console.log(window.data)
let { Variable, Table, THead, TBody, TR, TH, TD, P, A, Span, Strong, TFoot, H1, H2 } = alkali
// let _ = lodash
const body = new Div('.main')

const colorMap = {
  'Breitbart': '#f7913c',
  'Washington Post': '#3398de',
  'The New York Times': '#bc6ede',
  'Politico': 'green',
  'CNN': 'green',
  'MSNBC': 'green',
  'CBS News': 'green',
  'Bloomberg': 'green',
  'Time': 'green'
}

let articles = window.data.Articles
articles = _.sortBy(articles, 'Published')
articlesByHost = _.groupBy(_.sortBy(articles, 'Host'), 'Host')
articlesByDay = _.groupBy(articles, article => moment(article.Published).format('MMM d YYYY'))

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
        P([
          Strong('Published'),
          Span({
            textContent: moment(article.Published).format('MMM d YYYY HH:hh')
          })
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
        new A({
          textContent: article.Headline,
          href: article.Link,
          target: '_blank',
          style: {
            color: colorMap[article.Host]
          },
          onmouseenter: (event) => window.tooltip.show(articleTooltip, event),
          onmouseleave: (event) => window.tooltip.hide()
        })
      )
    }
    tbody.append(tr)
  }
  body.append(table)
}


body.append(
  new H1({
    textContent: 'Panorama'
  })
)
body.append(
  new H2({
    textContent: 'An experiment in news aggregation'
  })
)
body.append(
  new Div('.intro', [
    P({
      textContent: `This a proof of concept for what I hope will be a tool that helps expose bias by contextualizing the news through aggregation.
      For this test, I focused on the scandals surrounding Michael Flynn. More outlets will be added over time.`
    })
  ])
)
makeTimeline()

body.append(
  new Div('.outro', [
    P({
      textContent: `This is all collected by hand, errors are expected.`
    })
  ])
)

document.body.appendChild(body)