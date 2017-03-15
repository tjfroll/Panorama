const body = new Div('.main')
const isCompact = new Variable(false)

append(body, [
  new H1({
    textContent: 'Panorama'
  }),
  new H2({
    textContent: 'An experiment in news aggregation'
  }),
  new Div('.intro', [
    P({
      textContent: `This a proof of concept for a tool that, hopefully, reveals bias by contextualizing the news through aggregation.
      For this demo, I focused on collecting news about the appointment and resignation of National Security Adviser Michael Flynn, post-election.`
    })
  ])
])

append(body, new Button('.compact', {
  content: isCompact.to( compact => compact ? 'Detailed View' : 'Compact View'),
  onclick: (event) => isCompact.put(!isCompact.valueOf())
}))

window.dialog = append(document.body, new Dialog({ display: false }))
append(body, new Button('.entry', {
  textContent: 'Entry',
  onclick: (event) => {
    append(dialog.body, new ArticleForm())
    dialog.show()
  }
}))

const timeline = append(body, new Div('.timeline'))

$.get('https://panorama-2fb31.firebaseio.com/Articles.json')
  .then( (articles) => {
    articles.sort(function(a,b){
      return new Date(a.Published) - new Date(b.Published);
    })
    STORIES.put(_.uniq(_.compact(_.map(articles, 'Story'))).sort())
    SITES.put(_.uniq(_.compact(_.map(articles, 'Site'))).sort())
    SYNDICATIONS.put(_.uniq(_.compact(_.map(articles, 'Syndication'))).sort())
    AUTHORS.put(_.uniq(_.compact(_.flatMap(articles, 'Authors'))).sort())
    KEYWORDS.put(_.uniq(_.compact(_.flatMap(articles, 'Keywords'))).sort())
    CONTRIBUTORS.put(_.uniq(_.compact(_.flatMap(articles, 'Contributors'))).sort())
    append(dialog.body, new ArticleForm())
    dialog.show()
    timeline.append(new Timeline({ articles}))
  })
  .fail( (error) => {
    console.error('Failed to fetch articles.', error)
  })

body.append(
  new Div('.outro', [
    P({
      innerHTML: `
        <a href="http://thelackthereof.com/2017/03/13/panorama/">Methods and reasoning explained here</a>. Feedback appreciated 
        <a href="https://twitter.com/thunderfunking">@thunderfunking</a>.`
    })
  ])
)

document.body.appendChild(body)