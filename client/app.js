let { Variable, Button, not, Table, THead, TBody, TR, TH, TD, P, A, Span, Strong, TFoot, H1, H2 } = alkali
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

append(body, makeCompactToggle())

append(body, new Div('.timeline', [makeTimeline()]))

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