const makeCompactToggle = () => {
  return new Button('.compact', {
    content: isCompact.to( compact => compact ? 'Detailed View' : 'Compact View'),
    onclick: (event) => isCompact.put(!isCompact.valueOf())
  })
}