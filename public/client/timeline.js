class Timeline extends Table() {
  created(props) {
    const { articles } = props
    articles.subscribe( (a) => {
      this.renderArticles(a)
    })
  }

  renderArticles(articles) {
    empty(this)
    const thead = append(this, new THead())
    const thr = append(thead, new TR())
    const tbody = append(this, new TBody())
    const tr = append(tbody, new TR())
    const tfoot = append(this, new TFoot())
    const tfr = append(tfoot, new TR())

    const articlesByDay = _.groupBy(articles, article => moment(article.Published).format('MMM D YYYY'))

    for (const day in articlesByDay) {
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
        td.append(
          new Card({
            article: article
          })
        )
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
}