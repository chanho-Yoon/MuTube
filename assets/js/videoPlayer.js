const videoContainer = document.getElementById('jsVideoPlayer')
const videoPlayer = document.querySelector('#jsVideoPlayer #videoId')
const playBtn = document.getElementById('jsPlayButton')
const volumeBtn = document.getElementById('jsVolumeButton')
const screenBtn = document.getElementById('jsScreenButton')
const currentTime = document.getElementById('currentTime')
const totalTime = document.getElementById('totalTime')
const videoId = document.getElementById('videoId')

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
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

function fullScreenClick() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen()
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen()
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen()
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen()
  }
  screenBtn.innerHTML = '<i class="fas fa-compress"></i>'
  screenBtn.removeEventListener('click', fullScreenClick)
  screenBtn.addEventListener('click', exitScreenClick)
}

function formatDate(seconds) {
  const secondsNumber = parseInt(seconds, 10)
  let hours = Math.floor(secondsNumber / 3600)
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60)
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60

  if (hours < 10) {
    hours = `0${hours}`
  }
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`
  }
  return `${hours}:${minutes}:${totalSeconds}`
}

//잘 작동할때가 있고 안될때가 있고 고민을 해봐야곘네,.,
function setTotalTime() {
  console.log('실행됨')
  setInterval(getCurrentTime, 1000)
  totalTime.innerHTML = formatDate(videoPlayer.duration)
}

function getCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime)
}

function init() {
  //비디오가 로드 되기 전에 시간을 호출하면 Nan 호출되는걸 방지
  playBtn.addEventListener('click', handlePlayClick)
  volumeBtn.addEventListener('click', handleVolumeClick)
  screenBtn.addEventListener('click', fullScreenClick)
  videoId.addEventListener('loadedmetadata', setTotalTime)
}

// eslint-disable-next-line no-constant-condition

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
