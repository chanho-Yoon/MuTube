import '../scss/styles.scss'

document.getElementsByTagName('BODY')[0].onresize = function() {
  loadWindowWidth()
}

function loadWindowWidth() {
  let width = innerWidth

  if (width < 1024) {
    console.log(width)
  }
}

addEventListener('onresize', loadWindowWidth)
