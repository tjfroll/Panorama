let articles = data.Articles
articles.sort(function(a,b){
  return new Date(a.Published) - new Date(b.Published);
})
articlesByDay = _.groupBy(articles, article => moment(article.Published).format('MMM D YYYY'))

const makeTimeline = () => {
  const table = new Table()
  const thead = append(table, new THead())
  const thr = append(thead, new TR())
  const tbody = append(table, new TBody())
  const tr = append(tbody, new TR())
  const tfoot = append(table, new TFoot())
  const tfr = append(tfoot, new TR())

  for (day in articlesByDay) {
    const dayArticles = articlesByDay[day]

    // since we have a scrolling body, have to manually assign widths
    const width = (200 + (Math.min(dayArticles.length - 1, 5) * 50)) + 'px'

    // head
    thr.append(
      new TH({
        style: {
          'min-width': width
        }
      }, [
        Span('.time', {
          textContent: day
        }),
        Span('.day', {
          textContent: moment(dayArticles[0].Published).format('ddd')
        })
      ])
    )

    // body
    const td = append(tr, new TD({
      style: {
        'min-width': width
      }
    }))
    for (const article of dayArticles) {
      td.append(makeCard(article))
    }

    const count = dayArticles.length
    // foot
    tfr.append(
      new TH({
        textContent: count + ' article' + (count > 1 ? 's' : ''),
        style: {
          'min-width': width
          }
      })
    )
  }
  body.append(table)
}