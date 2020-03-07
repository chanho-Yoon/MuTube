const videoContainer = document.getElementById('jsVideoPlayer')
const videoPlayer = document.querySelector('#jsVideoPlayer video')
const playBtn = document.getElementById('jsPlayButton')

function handlePlayClick() {
  if (videoPlayer.paused) {
    console.log(playBtn)
    videoPlayer.play()
  } else {
    console.log(playBtn)

    videoPlayer.pause()
  }
}
function init() {
  playBtn.addEventListener('click', handlePlayClick)
}

if (videoContainer) {
  init()
}
