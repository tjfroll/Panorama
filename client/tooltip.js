let { Div } = alkali

const tooltip = new Div('#tooltip', {
  display: false
})
document.body.append(tooltip)

tooltip.show = (content, event) => {
  if (!content) return
  if (typeof content === 'object') {
    tooltip.innerHTML = ''
    tooltip.append(content)
  } else if (typeof content === 'string') {
    tooltip.innerHTML = content
  } else
    return
  tooltip.$ = tooltip.$ || (tooltip.$ = $(tooltip))
  tooltip.$.velocity('fadeIn', {
    duration: 80,
    queue: false
  })
  // tooltip$.css('top', '20px').css('left', ttleft + 'px')
  // updatePosition(tooltip.$, event)
}

tooltip.hide = () => {
  tooltip.$.hide()
}

tooltip.onmouseleave = (event) => { tooltip.hide() }

window.tooltip = tooltip


const windw$ = $(window)
const updatePosition = (tooltip$, event) => {
  const xOffset = 20
  const yOffset = 10
  const ttw = tooltip$.width()
  const tth = tooltip$.height()
  const wscrY = windw$.scrollTop()
  const wscrX = windw$.scrollLeft()
  const curX = document.all ? event.clientX + wscrX : event.pageX
  const curY = document.all ? event.clientY + wscrY : event.pageY
  let ttleft = (curX - wscrX + xOffset * 2 + ttw) > windw$.width() ? curX - ttw - xOffset * 2 : curX + xOffset
  if (ttleft < wscrX + xOffset) ttleft = wscrX + xOffset
  let tttop = (curY - wscrY + yOffset * 2 + tth) > windw$.height() ? curY - tth - yOffset * 2 : curY + yOffset
  if (tttop < wscrY + yOffset) tttop = curY + yOffset

  tooltip$.css('top', tttop + 'px').css('left', ttleft + 'px')
}