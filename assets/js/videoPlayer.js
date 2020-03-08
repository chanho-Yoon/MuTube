const videoContainer = document.getElementById('jsVideoPlayer')
const videoPlayer = document.querySelector('#jsVideoPlayer video')
const playBtn = document.getElementById('jsPlayButton')
const volumeBtn = document.getElementById('jsVolumeButton')
const screenBtn = document.getElementById('jsScreenButton')

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play()
    playBtn.innerHTML = '<i class="fas fa-pause"></i>'
  } else {
    videoPlayer.pause()
    playBtn.innerHTML = '<i class="fas fa-play"></i>'
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
  } else {
    videoPlayer.muted = true
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'
  }
}

function exitScreenClick() {
  screenBtn.innerHTML = '<i class="fas fa-expand"></i>'
  screenBtn.addEventListener('click', fullScreenClick)
  document.webkitExitFullscreen()
}

function fullScreenClick() {
  videoContainer.webkitRequestFullscreen()
  screenBtn.innerHTML = '<i class="fas fa-compress"></i>'
  screenBtn.removeEventListener('click', fullScreenClick)
  screenBtn.addEventListener('click', exitScreenClick)
}

function init() {
  playBtn.addEventListener('click', handlePlayClick)
  volumeBtn.addEventListener('click', handleVolumeClick)
  screenBtn.addEventListener('click', fullScreenClick)
}

if (videoContainer) {
  init()
}

// function key 는 받는게 없는데 어떻게 키보드에서 펑션키로 재생 눌렀을때의 값을 받지..
window.onkeydown = event => {
  if (event.keyCode == 119) {
    if (videoPlayer.paused) {
      videoPlayer.play()
      playBtn.innerHTML = '<i class="fas fa-pause"></i>'
    } else {
      videoPlayer.pause()
      playBtn.innerHTML = '<i class="fas fa-play"></i>'
    }
  }
}
