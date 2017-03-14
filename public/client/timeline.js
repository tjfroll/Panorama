const makeTimeline = () => {
  const table = new Table()

  $.get('https://panorama-2fb31.firebaseio.com/Articles.json')
    .then( (articles) => {
      articles.sort(function(a,b){
        return new Date(a.Published) - new Date(b.Published);
      })
      loadArticles(articles, table)
    })
    .fail( (error) => {
      console.error('Failed to fetch articles.', error)
    })

  return table
}

const loadArticles = (articles, table) => {
  const thead = append(table, new THead())
  const thr = append(thead, new TR())
  const tbody = append(table, new TBody())
  const tr = append(tbody, new TR())
  const tfoot = append(table, new TFoot())
  const tfr = append(tfoot, new TR())
  articlesByDay = _.groupBy(articles, article => moment(article.Published).format('MMM D YYYY'))
  for (day in articlesByDay) {
    const dayArticles = articlesByDay[day]

    // since we have a scrolling body, have to manually assign widths
    const width = (200 + (Math.min(dayArticles.length - 1, 5) * 50))

    // head
    thr.append(
      new TH({
        style: {
          'min-width': isCompact.to( compact => compact ? '5rem' : width + 'px')
        }
      }, [
        Span('.time', {
          content: isCompact.to( compact => compact ? moment(dayArticles[0].Published).format('M/D/YY') : moment(dayArticles[0].Published).format('MMM D YYYY'))
        }),
        Span('.day', {
          display: not(isCompact),
          textContent: moment(dayArticles[0].Published).format('ddd')
        })
      ])
    )

    // body
    const td = append(tr, new TD({
      style: {
        'min-width': isCompact.to( compact => compact ? '5rem' : width + 'px')
      }
    }))
    for (const article of dayArticles) {
      td.append(makeCard(article))
    }

    const count = dayArticles.length
    // foot
    tfr.append(
      new TH({
        style: {
          'min-width': isCompact.to( compact => compact ? '5rem' : width + 'px'),
          'background-color': `rgba(68, 68, 68, ${Math.max(Math.min(count / 10, 1), 0.3)})`
        }
      }, [
        Span({
          textContent: count
        }),
        Span({
          textContent: ' article' + (count > 1 ? 's' : ''),
          display: not(isCompact)
        })
      ])
    )
  }
}