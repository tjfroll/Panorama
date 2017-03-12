console.log(window.data)
let { Variable, Table, THead, TBody, TR, TH, TD, P, A, Span, Strong, TFoot, H1, H2 } = alkali
// let _ = lodash
const body = new Div('.main')

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
      textContent: `This a proof of concept for a tool that, hopefully, reveals bias by contextualizing the news through aggregation.
      For this demo, I focused on the scandals surrounding Michael Flynn. More outlets will be added over time.`
    })
  ])
)
makeTimeline()

body.append(
  new Div('.outro', [
    P({
      innerHTML: `
        This is all collected by hand, some errors are expected. Feedback appreciated 
        <a href="https://twitter.com/thunderfunking">@thunderfunking</a>.`
    })
  ])
)

document.body.appendChild(body)